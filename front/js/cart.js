const cart = {...localStorage}


const getCartProducts = () => {
    console.log(cart)

    for(let a in cart) {
        cart[a] = JSON.parse(cart[a])
        let product = cart[a]
        cart__items.innerHTML += `
            <article class="cart__item" data-id="${product._id}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altText}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.orders[0].color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${product.orders[0].qty}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.orders[0].qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>
        `
    }
    // console.log(cart);
    
}

getCartProducts()
