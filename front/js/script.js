//KEEP IN A SEPERATE VARAIBLE THE URL TO FETCH ALL PRODUCTS
const url = 'http://localhost:3000/api/products'
//FETCH ALL PRODUCTS
const getProducts = () => {
    fetch(url)
        .then((response) => response.json())
        .then((products) => { 
            // console.log(products);
            products.map((product,index) => {
                items.innerHTML += `
                    <a href="product.html?id=${product._id}">
                        <article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                    </a>
                `
            })
        })
}



getProducts()
