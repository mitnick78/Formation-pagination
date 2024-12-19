let currentPage = 1;
const itemsPerPage = 10;

const fetchProduct = async (page = 1, limit = 10) => {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
    return response.json();
}

function renderProducts(datas) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    datas.products.forEach(product => {
        productElement.className = "product";
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <img src="${product.thumbnail}" alt="${product.title}" style="width: 100px; height: auto;">
            <p>Prix : ${product.price} €</p>
        `;
        container.appendChild(productElement);
    });
}

function calculateTotalPages(totalItems, itemsPerPage) {
    return Math.ceil(totalItems / itemsPerPage);
}

function pagination(pages) {
    const paginationElement = document.getElementById("paginations");
    paginationElement.innerHTML = ""; 

    const containerPagination = document.createElement("div");

    for (let index = 1; index <= pages; index++) {
        const buttonPagination = document.createElement("button");
        buttonPagination.textContent = index;
        buttonPagination.addEventListener('click', async () => {
            currentPage = index;
            await display();
            window.scroll({
              top: 100,
              left: 100,
              behavior: "smooth",
            });
        });
        containerPagination.appendChild(buttonPagination);
    }
    paginationElement.appendChild(containerPagination);
}

async function display() {
    const products = await fetchProduct(currentPage, itemsPerPage);
    const totalPages = calculateTotalPages(products.total, itemsPerPage);
    pagination(totalPages);
    renderProducts(products);
}

display();