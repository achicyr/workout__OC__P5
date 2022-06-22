const api = "http://localhost:3000/api/products/"
const url = new URL(location)
// console.log(new URLSearchParams(url.search).get('id'));

// console.log(new URL(location).searchParams.get('id'))

localStorage.clear()

const id = url.searchParams.get('id')
, theOrder = {}
, cart = {...localStorage}
// cart[id] = JSON.parse(cart[id])
// console.log(id);
console.log("cart", cart);


fillProductPage()
addToCart.addEventListener("click", (e) => {

    if(!parseInt(quantity.value))alert("Vous devez entrer une quantité !")
    else if(!colors.value)alert("Vous devez choisir une couleur !")
    else {
        const orders = [{
            qty: parseInt(quantity.value),
            color: colors.value
        }]
        Object.assign(theOrder, {orders})
        // console.log(theOrder);
        fillCart(theOrder)
    }
    // console.log(choice);

})


function fillProductPage (productID) {
    fetch(api + (productID || id))
        .then((result)=>{return result.json()})
        .then((product) => {
            product
            Object.assign(theOrder, product)
            console.log("theOrder: ", theOrder)

            document.querySelector('.item__img').innerHTML = `<img src="${theOrder.imageUrl}" alt="${theOrder.altTxt}" />`
            title.innerHTML = theOrder.name
            price.innerHTML = theOrder.price
            description.innerHTML = theOrder.description
            theOrder.colors.forEach((color) => { colors.innerHTML += `<option value="${color}">${color}</option>` })
        })
}

function fillCart (order) {
    const id = order._id
    , orderColor = order.orders[0].color

    if(!cart[id]){
        cart[id] = JSON.stringify(order)
        console.log("adding product to cart", cart);
    }else{
        cart[id] = JSON.parse(cart[id])

        if((sameColorOrderIndex = cart[id].orders.findIndex(element=>element.color==orderColor)) == -1){
            console.log("color does not already existe in cart");
            cart[id].orders.push(order.orders[0])
            cart[id] = JSON.stringify(cart[id])
        }else{
            console.log("order quantity: " + order.orders[sameColorOrderIndex].qty+"\nsameColorOrderIndex", sameColorOrderIndex);
            cart[id].orders[sameColorOrderIndex].qty += order.orders[sameColorOrderIndex].qty
            cart[id] = JSON.stringify(cart[id])
        }
    }

    localStorage[id] = cart[id]
    
}