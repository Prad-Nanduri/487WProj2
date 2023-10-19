from flask import Flask, request, jsonify
import products_dao
from sql_connection import get_sql_connection

app = Flask(__name__)

connection = get_sql_connection()

@app.route('/getProducts', methods=['GET'])
def get_products():
    products = products_dao.get_all_products(connection)
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    return_id = products_dao.delete_product(connection, request.form['product_id'])
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow_Origin', '*')
    return response

@app.route('/insertProduct', methods=['POST'])
def insert_product():
    request_payload = request.form['data']
    product_id = products_dao.insert_new_product(connection, request_payload)
    response = jsonify({
        'products_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#BB
@app.route('/updateProduct', methods=['POST'])
def update_product():
    request_payload = request.form['data']
    products_dao.update_product(connection, request_payload)
    response = jsonify({
       # 'product_id': product_id,
        'message': 'Product updated successfully'
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
#
@app.route('/searchProduct', methods=['POST'])
def search_product():
    request_data = request.get_json()  # Get JSON data from the request
    keyword = request_data.get('keyword', '')  # Extract the keyword

    products = products_dao.search_product(connection, keyword)
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server for Prad's Online Store")
    app.run(port=5000)