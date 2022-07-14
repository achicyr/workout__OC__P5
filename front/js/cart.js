showCart()




/**
 * * L'OBJECTIF DE CETTE FONCTION EST 
 * * DANS UN 1ER TEMPS, DE PARCOURIR LES PRODUITS PRÉSENTS DANS LE LOCASTORAGE,
 * * PUIS DANS UN SECOND, DE PARCOURIR LES DIFFÉRENTES COMMANDES CONCERNANT LE PRODUIT CONCERNÉ PAR L'ITÉRATION
 * * DANS LA SECONDE BOUCLE, ON INCRÉMENTE LES VARIABLES D'INSTANCE @instance{totalQty} et @instance{totalAmount}
 * * ET ENFIN TOUJOURS DANS LA SECONDE BOUCLE, ON AJOUTE AU DOM LES DIFFÉRENTES VARIANTES DE PRODUIT, PUIS LES TOTAUX(QUANTITÉS TOTALE, PRIX FINAL)
 */
function showCart(){
    const ls = Object.keys(localStorage).length == 0 ? {} : _localStorage2obj() //STOCKER TEMPORAIREMENT LE LOCALSTORAGE DANS UNE VARIABLE AFIN DE LA RE-RESTITUER AU LOCALSTORAGE À LA FIN SOUS FORME DE STRING
    let totalQty = 0
    , totalAmount = 0
    for(let id in ls){
        const { _id,imageUrl,altTxt,name,orders,price } = ls[id]
        console.log(ls[id]);
        for(let color in orders){
            totalQty += orders[color]
            totalAmount += price * orders[color]
            cart__items.innerHTML += `
                <article class="cart__item" data-id="${_id}" data-color="{product-color}">
                    <div class="cart__item__img">
                        <img src="${imageUrl}" alt="${altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${name}</h2>
                            <p>${color}</p>
                            <p>${price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${orders[color]}">
                            </div>
                                <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
            `
        }
    }
    totalQuantity.innerHTML = totalQty
    totalPrice.innerHTML = totalAmount
}




/**
 * * LE LOCALSTORAGE EST UN OBJET DE CHAÎNE DE CARACTÈRES,
 * * IL FAUT LE TRANSFORMER EN OBJET D'OBJETS POUR POUVOIR LE TRANSFORMER
 * @returns le localstorage transformer un objet d'objet
 */
function _localStorage2obj(){
    const obj = {}
    for(let key in localStorage)if(localStorage.hasOwnProperty(key))
        obj[key] = JSON.parse(localStorage[key])
    console.log(obj);
    return obj
}


/**
 * * LE LOCALSTORAGE EST UN OBJET DE CHAÎNE DE CARACTÈRES,
 * * IL FAUT LE TRANSFORMER EN OBJET D'OBJETS POUR POUVOIR LE TRANSFORMER
 * @param {object} obj le localstorage transformer un objet d'objet
 * @returns le @param(obj) transformé pour le localstorage
 */
function _obj2localStorage(obj){
    for(let key in obj)
        localStorage[key] = JSON.stringify(obj[key])
}