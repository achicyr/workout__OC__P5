const endpoint = "http://localhost:3000/api/products"
loadProducts()

/**
 * * AFFICHER LA LISTE DES PRODUITS DANS LE DOM #items EN UTILISANT LA METHOD Array:forEach
 * @param {array} arr Contient la liste des produits de l'API (appelé par @function(loadProducts))
 */
function addProductsInHome(arr){
    arr.forEach((product) => {
        items.innerHTML += `
            <a href="./product.html?id=${product._id}">
                <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
                </article>
            </a>
        `
    })
}
/**
 * * CHARGE LES DONNÉES DE L'API AUX ENDPOINT"http://localhost:3000/api/products"
 * * POUR RECEVOIR TOUS LES PRODUITS DE L'API À AFFICHER SUR CETTE PAGE (accueil)
 * @param {string} url L'uri à requêter, le "endpoint"
 */
function loadProducts(url){
    console.log(endpoint);
    fetch(endpoint)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            addProductsInHome(json)
        })
}

export default [addProductsInHome, loadProducts]