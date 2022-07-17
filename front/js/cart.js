import Template from './Template.js'
import {_localStorage2obj, _obj2localStorage} from "./localstorageTools.js"

const template = new Template()
, endpoint = "http://localhost:3000/api/products/order"

showCartObject()




/**
 * * L'OBJECTIF DE CETTE FONCTION EST 
 * * DANS UN 1ER TEMPS, DE PARCOURIR LES PRODUITS PRÉSENTS DANS LE LOCASTORAGE,
 * * PUIS DANS UN SECOND, DE PARCOURIR LES DIFFÉRENTES COMMANDES CONCERNANT LE PRODUIT CONCERNÉ PAR L'ITÉRATION
 * * DANS LA SECONDE BOUCLE, ON INCRÉMENTE LES VARIABLES D'INSTANCE @instance{totalQty} et @instance{totalAmount}
 * * ET ENFIN TOUJOURS DANS LA SECONDE BOUCLE, ON AJOUTE AU DOM LES DIFFÉRENTES VARIANTES DE PRODUIT, PUIS LES TOTAUX(QUANTITÉS TOTALE, PRIX FINAL)
 */
function showCartObject(){
    const ls = Object.keys(localStorage).length == 0 ? {} : _localStorage2obj() //STOCKER TEMPORAIREMENT LE LOCALSTORAGE DANS UNE VARIABLE AFIN DE LA RE-RESTITUER AU LOCALSTORAGE À LA FIN SOUS FORME DE STRING
    let totalQty = 0
    , totalAmount = 0
    , rand = Math.round((Math.random()))
    , color
    , id

    
    //JE BOUCLE ICI LE LOCALSTORAGE VIRTUEL POUR INTÉGRER SES DONNÉES VIA LE DOM
    for(id in ls){
        console.log(ls[id]);
        let { orders,orders_,price } = ls[id]
        , i = 0
        if(rand)//POUR CHOISIR ENTRE LA VERSION ARRAY ET LA VERSION OBJECT DU PANIER
            for(color in orders){
                console.log("AFFICHÉ EN OBJET");
                const id_ = id
                , ii = i++
                , article = template.cartProduct({...ls[id],color})
                cart__items.append(article)
                article.querySelector(`input.itemQuantity`).addEventListener("change", e=>template.updateCartProduct(e,{...ls},id_,ii))
                article.querySelector(`p.deleteItem`).addEventListener("click", e=>template.cutCartProduct(e,{...ls},id_,ii))
            }
        else
            orders_.forEach((order,i) => {
                console.log("AFFICHÉ EN ARRAY",i);
                const {color, qty} = order
                , id_ = id
                , article = template.cartProduct({...ls[id_],color},order)
                cart__items.append(article)
                article.querySelector(`input.itemQuantity`).addEventListener("change", e=>template.updateCartProduct(e,{...ls},id_,i))
                article.querySelector(`p.deleteItem`).addEventListener("click", e=>template.cutCartProduct(e,{...ls},id_,i))
                
            })
    }
    template.resetCartTotal()
}

order.closest('.cart__order__form').addEventListener('submit', e => template.sendForm(e,endpoint))



