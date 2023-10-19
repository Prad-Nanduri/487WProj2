from sql_connection import get_sql_connection


def get_all_products(connection):
    cursor = connection.cursor()

    query = "SELECT * FROM onlinestore.products"
    cursor.execute(query)

    response = []

    for (product_id, name, description, price) in cursor:
        response.append(
            {
                'product_id' : product_id,
                'name' : name,
                'description' : description,
                'price' : price
            }
        )


    return response

def insert_new_product(connection, product):
    cursor = connection.cursor()
    query = ("INSERT INTO products (name, description, price) VALUES (%s, %s, %s)")
    data = (product['product_name'], product['description'], product['price'])
    cursor.execute(query, data)
    connection.commit()

    return cursor.lastrowid

def delete_product(connection, product_id):
    cursor = connection.cursor()
    query = ("DELETE FROM products where product_id=" + str(product_id))
    cursor.execute(query)
    connection.commit()

#BB
def update_product(connection, product):
    cursor = connection.cursor()
    query = ("UPDATE products SET name=%s, description=%s, price=%s WHERE product_id=%s")
    data = (product['product_name'], product['description'], product['price'], product['product_id'])
    cursor.execute(query, data)
    connection.commit()
#
def search_product(connection, keyword):
    cursor = connection.cursor()
    query = ("SELECT * FROM products WHERE name LIKE %s OR description LIKE %s")
    cursor.execute(query, ('%' + keyword + '%', '%' + keyword + '%'))

    response = []

    for (product_id, name, description, price) in cursor:
        response.append(
            {
                'product_id': product_id,
                'name': name,
                'description': description,
                'price': price
            }
        )

    return response

def get_sorted_products(connection, sort_by, sort_order):
    cursor = connection.cursor()

    # Define the allowed columns for sorting
    allowed_sort_columns = {
        'id': 'product_id',
        'name': 'name',
        'description': 'description',
        'price': 'price'
    }

    # Check if the provided sort_by parameter is valid; if not, default to 'product_id'
    sort_column = allowed_sort_columns.get(sort_by, 'product_id')

    # Define the allowed sort orders
    allowed_sort_orders = {
        'asc': 'ASC',
        'desc': 'DESC'
    }

    # Check if the provided sort_order parameter is valid; if not, default to 'asc'
    sort_order = allowed_sort_orders.get(sort_order, 'asc')

    query = f"SELECT * FROM onlinestore.products ORDER BY {sort_column} {sort_order}"
    cursor.execute(query)

    response = []

    for (product_id, name, description, price) in cursor:
        response.append(
            {
                'product_id': product_id,
                'name': name,
                'description': description,
                'price': price
            }
        )

    return response


if __name__=='__main__':
    connection = get_sql_connection()
    print(insert_new_product(connection, {
        'product_name' : 'Table Fan',
        'description' : 'Brand: Pelonis',
        'price' : '49.99'
    }))