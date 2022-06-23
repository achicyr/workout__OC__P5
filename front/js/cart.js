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

    // console.log(document.querySelectorAll('#cart__items .itemQuantity'))
    document.querySelectorAll('#cart__items .deleteItem').forEach((input) => {
      input.addEventListener('click', (e) => {
        const productID = e.target.closest('article').dataset.id
        , variants = cart[productID].orders
        , variantIndex = variants.findIndex((variant) => {
          // console.log(variant.color);
          // console.log(e.target.closest('article').dataset.color);
          // console.log(variant.color === e.target.closest('article').dataset.color);
          return variant.color === e.target.closest('article').dataset.color
        })
        , doErase = confirm(`Souhaitez-vous vraiment supprimer de votre panier le produit suivant ?:\n"${ e.target.closest('article').querySelector('h2').innerHTML }"`)
        console.log(variantIndex);
        alert('ok')
        if(doErase){
          if(variants.length == 1){
            console.log(localStorage);
            delete localStorage[productID]
            console.log(localStorage);
          }
          else{
            console.log(localStorage);
            console.log(variantIndex);
            cart[productID].orders.splice(variantIndex, 1)
            localStorage[productID] = JSON.stringify(cart[productID])
            console.log(localStorage);
          }
          location.reload()
        }
      })
    })
    document.querySelectorAll('#cart__items .itemQuantity').forEach((input) => {
      input.addEventListener('change', (e) => {
        // console.log(e.target.value);
        // console.log(e.target.closest('article'));
        // console.log(e.target.closest('article').dataset.id);
        // console.log(e.target.closest('article').dataset.color);
        // console.log(cart);
        const variants = cart[e.target.closest('article').dataset.id].orders
        , variant = variants.filter((variant) => {
          // console.log(variant.color);
          // console.log(e.target.closest('article').dataset.color);
          // console.log(variant.color === e.target.closest('article').dataset.color);
          return variant.color === e.target.closest('article').dataset.color
        })[0]
        // console.log(variants);
        // console.log(variant);
        variant.qty++
        // console.log(variant);
        // console.log(variants);
        // console.log(cart);
        // console.log(localStorage);
        for (const productID in localStorage) {
          if (Object.hasOwnProperty.call(localStorage, productID)) {
            localStorage[productID] = JSON.stringify(cart[productID])
          }
        }
        // console.log(localStorage);
      })
    })
}

getCartProducts()
