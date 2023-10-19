document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector("form");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const itemID = form.getAttribute("data-item-id");
            const url = itemID ? `/edit_item/${itemID}` : "/add_item";
            saveItem(url, formData);
        });
    });

    function saveItem(productListApiUrl, data) {
        /* url -> productListApiUrl */
        fetch(productListApiUrl, {
            method: "POST",
            body: data,
        })
            .then(response => response.text())
            .then(data => {
                // Redirect to the updated browse page
                window.location.href = "/";
            });
    }