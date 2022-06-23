const cart = {...localStorage}


const getCartProducts = () => {
    console.log(cart)
    let totalQty = 0
    , totalAmount = 0

    for(let a in cart) {
        cart[a] = JSON.parse(cart[a])
        let product = cart[a]
        , variants = product.orders
        totalQty += variants.length
        totalAmount += product.price * variants.length

        variants.forEach((variant) => {
          cart__items.innerHTML += `
              <article class="cart__item" data-id="${product._id}" data-color="${variant.color}">
                  <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altText}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${product.name}</h2>
                      <p>${variant.color}</p>
                      <p>${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${variant.qty}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${variant.qty}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
              </article>
          `
        })
    }
    totalQuantity.innerHTML = totalQty
    totalPrice.innerHTML = totalAmount
    // console.log(cart);
    
}

getCartProducts()
