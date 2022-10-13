import "../front/js/script.js"
import "../front/js/product.js"
// import "../front/js/cart.js"
// import "../front/js/confirmation.js"





const endpoint = "http://localhost:3000/api/products"
, params = new URL(location).searchParams
, productID = params.get('id')



loadProducts()

// console.log(productID);
getProduct(endpoint, productID)

order.closest('.cart__order__form').addEventListener('submit', e => template.sendForm(e,endpoint))
showCartObject()
