document.addEventListener("DOMContentLoaded", function () {
    const headers = document.querySelectorAll("th a");
    headers.forEach(header => {
        header.addEventListener("click", function (e) {
            e.preventDefault();
            const sortBy = header.getAttribute("data-sort");
            // Toggle the sorting order
            const currentSortOrder = header.innerText.includes("▲") ? "desc" : "asc";
            sortItems(sortBy, currentSortOrder);
        });
    });
});

function sortItems(sortBy, sortOrder) {
    fetch(`/browse/sort/${sortBy}?order=${sortOrder}`)
        .then(response => response.text())
        .then(data => {
            document.querySelector(".item-list").innerHTML = data;
        });
}