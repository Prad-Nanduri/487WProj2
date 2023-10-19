// Define your api here
var productListApiUrl = 'http://127.0.0.1:5000/getProducts';
var productSaveApiUrl = 'http://127.0.0.1:5000/insertProduct';
var productDeleteApiUrl = 'http://127.0.0.1:5000/deleteProduct';
var productUpdateApiUrl = 'http://127.0.0.1:5000/updateProduct';
var productSearchApiUrl = 'http://127.0.0.1:5000/searchProduct';


function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function( msg ) {
        window.location.reload();
    });
}

fetch(productListApiUrl)
  .then(response => response.json())
  .then(data => {
    // Process and display the data on the frontend
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


fetch(productListApiUrl)
  .then(response => response.json())
  .then(data => {
    // Find the table body in your HTML
    const tableBody = document.querySelector('tbody');

    // Clear the existing table rows, if any
    tableBody.innerHTML = '';

    // Loop through the data and create table rows
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>
          <a href="/updateProduct/${item.id}">Edit</a>
          <a href="/deleteProduct/${item.id}">Delete</a>
        </td>
      `;

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

function updateItemList(data) {
    const itemList = document.querySelector('.item-list');
    const tableBody = itemList.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear the current content

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product_id}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td>
                <a href="/updateProduct/${item.product_id}">Edit</a>
                <a href="/deleteProduct/${item.product_id}">Delete</a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

