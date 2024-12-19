const productContainer = document.getElementById("products");
    const loader = document.getElementById("loader");

    let page = 1;
    const limit = 10; 
    let isLoading = false; 

    async function fetchProducts() {
      if (isLoading) return;
      isLoading = true;
      loader.style.display = "block";

      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
        const data = await response.json();

        
        data.products.forEach(product => {
          const productEl = document.createElement("div");
          productEl.classList.add("product");
          productEl.innerHTML = `
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p><strong>Prix :</strong> ${product.price} €</p>
          `;
          productContainer.appendChild(productEl);
        });

        
        if (data.products.length < limit) {
          window.removeEventListener("scroll", handleScroll);
          loader.innerText = "Aucun produit supplémentaire";
        }

        page++;
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        isLoading = false;
        loader.style.display = "none";
      }
    }

    
    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
        fetchProducts();
      }
    }

    fetchProducts();
    window.addEventListener("scroll", handleScroll);