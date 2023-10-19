    document.addEventListener("DOMContentLoaded", function () {
        const searchForm = document.querySelector("form");
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const keyword = document.querySelector("input[name='keyword']").value;
            searchItems(keyword);
        });
    });

    function searchItems(keyword) {
        /*productListApiUrl <- "/search"   */
        function searchItems(keyword) {
    fetch('/searchProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Update content type to JSON
        },
        body: JSON.stringify({ keyword }), // Send keyword as JSON
    })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            updateItemList(data); // Call a function to update the item list
        });
}}
    document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("editForm");
    editForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(editForm);
        updateProduct(formData);
    });
});

    function updateProduct(formData) {
    fetch(`/updateProduct`, {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response, e.g., show a success message or redirect to the product list.
            console.log(data);
        });
}

