// const productID = location.href.substring(location.href.indexOf('id=')+3)
const params = new URL(location).searchParams
, productID = params.get('id')
, endpoint = "http://localhost:3000/api/products/"

console.log(productID);
getProduct(endpoint, productID)

/**
 * * CHARGE LES DONNÉES DE L'API AUX ENDPOINT DONNÉ EN PARAMÈTRE @param(url)
 * * POUR RECEVOIR LE PRODUIT À AFFICHER SUR CETTE PAGE PRODUIT
 * @param {string} url L'uri à requêter, le "endpoint"
 * @param {string} id L'identifiant du produit à afficher
 */
function getProduct(url = endpoint, id = productID){
    fetch(url+id)
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            
        })
}