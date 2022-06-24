const cart = {...localStorage}



const inputChange = (e) => {
  // console.log(e.target.value);
  // console.log(article);
  // console.log(article.dataset.id);
  // console.log(article.dataset.color);
  // console.log(cart);
  const article = e.target.closest('article')
  , variants = cart[article.dataset.id].orders
  , variant = variants.filter((variant) => {
    // console.log(variant.color);
    // console.log(article.dataset.color);
    // console.log(variant.color === article.dataset.color);
    return variant.color === article.dataset.color
  })[0]
  // console.log(variants);
  // console.log(variant);
  if(e.target.value == 0){
    let bool = confirm(`Vous êtes sur le point de supprimer le produit suivant du panier, êtes vous sûr ?\n"${e.target.closest('article').querySelector('h2').innerHTML}"`)
    if(bool)article.querySelector('.deleteItem').click()
    else article.querySelector('.itemQuantity').value = 1
  }else variant.qty = e.target.value
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
}
, inputErase = (e) => {
  const productID = e.target.closest('article').dataset.id
  , variants = cart[productID].orders
  , variantIndex = variants.findIndex((variant) => {
    // console.log(variant.color);
    // console.log(e.target.closest('article').dataset.color);
    // console.log(variant.color === e.target.closest('article').dataset.color);
    return variant.color === e.target.closest('article').dataset.color
  })
  , doErase = confirm(`Souhaitez-vous vraiment supprimer de votre panier le produit suivant ?:\n"${ e.target.closest('article').querySelector('h2').innerHTML }"`)
  // console.log(variantIndex);
  // alert('ok')
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
}
, checkForm = (e) => {
  // console.log(e.target);
  e.preventDefault()

  const form = document.querySelector('.cart__order__form')
  , formData = new FormData(form)
  , formEntries = formData.entries()
  // , isValidNameOrSurnameOrCity = value => /^[a-zA-Z]{3,}$/.test(value)
  , isValidNameOrSurnameOrCity = value => /^[^\s\d\.,-\/#!$%\^&\*;:{}=\-`~()@\+\?><\[\]\+]+$/.test(value)
  , isValidAddress = value => /regax/.test(value)
  , isValidEmail = value => /[a-z0-9]+@[a-z]+/.test(value)
  , errorsMessages = []
  , valids = Array.from(formEntries).filter((element) => {
    let [k,v] = element
    , bool
    console.log(bool);
    console.log(errorsMessages);
    if(k == "firstName" || k == "lastName" || k == "city"){
      bool = isValidNameOrSurnameOrCity(v)
      // console.log(k,bool);
      if(!v)errorsMessages.push(`<p>La valeur "${k}" ne peut pas être vide.</p>`)
      else if(!bool)errorsMessages.push(`<p>la valeur de "${k}" est incorrecte:\nElle ne devrait pas contenir, ni espace, ni de caractères ponctuations ou spéciaux</p>`)
    }else if(k == "address"){
      bool = isValidAddress(v)
      console.log(k,bool);
      if(!v)errorsMessages.push(`<p>La valeur "${k}" ne peut pas être vide.</p>`)
      else if(!bool)errorsMessages.push(`<p>la valeur de "${k}" est incorrecte:\nElle ne devrait pas contenir, ....</p>`)
    }else if(k == "email"){
      bool = isValidEmail(v)
      // console.log(k,bool);
      if(!v)errorsMessages.push(`<p>La valeur "${k}" ne peut pas être vide.</p>`)
      else if(!bool)errorsMessages.push(`<p>la valeur de "${k}" est incorrecte:\nElle ne devrait pas contenir, ni accents ni espace, ni de caractères ponctuations ou spéciaux.</p>`)
    }else if(typeof bool == "undefined"){
      errorsMessages.push(`<p>Il semble que vous soyez entrain d'essayer de frauder....veuillez retourner à la légalité s'il vous plaît\nNotre monde fonctionne mieux si tout le monde suit les règle.\nVous pouvez alle rau japon afin de comprendre cette vérité implaqueble xP</p>`)
      return false
    }
    return bool
  })
  console.log(valids);
  if(errorsMessages.length)firstNameErrorMsg.innerHTML = errorsMessages
  console.log(valids.length);
  if(valids.length<5)alert("Des informations sont invalides, veiullez remplir correctement le formulaire svp afin de pouvoir passer commande !")
  else{
    console.log(formEntries);
    const toSend = {}
    valids.forEach((elt) => {
      toSend[elt[0]] = elt[1]
    })
    console.log(toSend);
    // fetch("/order","post",)
  }
  /*
  console.log(formData);
  console.log(Array.from(formData).filter((elt) => {
    console.log(elt);
    return elt[1]!=""
  }));
  console.log(formData.values());
  formEntries.prototype = Array.prototype
  console.log(formEntries)
  */
}
, getCartProducts = () => {
  console.log(cart)
  let totalQty = 0
  , totalAmount = 0

  if(!localStorage.length){
    document.querySelector('h1').innerHTML += ` <span>est vide</span>. Veuillez rajouter <a href="./index.html">des produits</a> pour passer commande.`
    totalQuantity.style.color="red"
    totalPrice.style.color="red"
  }
  for(let a in cart) {
    cart[a] = JSON.parse(cart[a])
    let product = cart[a]
    , variants = product.orders

    variants.forEach((variant) => {
      totalAmount += product.price * variant.qty
      totalQty += variant.qty
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
    input.addEventListener('click', inputErase)
  })
  document.querySelectorAll('#cart__items .itemQuantity').forEach((input) => {
    input.addEventListener('change', inputChange)
  })
  document.querySelectorAll('.itemQuantity').forEach((elt) => {
    console.log(elt);
    elt.min = 0
  })
}

order.addEventListener('click', checkForm)



getCartProducts()
