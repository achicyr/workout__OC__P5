// const productID = location.href.substring(location.href.indexOf('id=')+3)
const params = new URL(location).searchParams
, productID = params.get('id')
, endpoint = "http://localhost:3000/api/products/"

console.log(productID);
getProduct(endpoint, productID)

/**
 * * CHARGE LES DONNÉES DE L'API À L'ENDPOINT DONNÉ EN PARAMÈTRE @param(url)+'/'+@param(id)
 * * POUR RECEVOIR LE PRODUIT À AFFICHER SUR CETTE PAGE PRODUIT 
 * @param {string} url L'uri à requêter, le "endpoint"
 * @param {string} id L'identifiant du produit à afficher
 */
function getProduct(url = endpoint, id = productID){
    fetch(url+id)
        .then(response => response.json())
        .then((product) => {
            // console.log(product);
            // JE CHARGE MAINTENANT LE DOM AVEC LES DONNÉE REÇUS DE L'API CONCERNANT LE PRODUIT
            // IMAGE/TITRE/DESCRIPTION/PRIX/COURLEURS
            document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
            title.innerHTML = product.name
            price.innerHTML = product.price
            description.innerHTML = product.description
            product.colors.forEach(color=>{colors.innerHTML += `<option value="${color}">${color}</option>`})
        })
}