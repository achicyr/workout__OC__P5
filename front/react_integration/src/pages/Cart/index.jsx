import React, {useState, useEffect} from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import "../../assets/css/cart.css"
import Template from './../Template.js'
import {_localStorage2obj, _obj2localStorage} from "./../localstorageTools.js"

const template = new Template()
, endpoint = "http://localhost:3000/api/products/order"



function Cart() {
    let bool = true
    useEffect(() => { 
        if(bool){
            console.log("okok");
            showCartObject()
            document.getElementById('order').closest('.cart__order__form').addEventListener('submit', e => template.sendForm(e,endpoint))
            bool = !bool
        }
    }, [])
    return (
    <>
        <Header />
        <main className='limitedWidthBlockContainer'>
            <div className="limitedWidthBlock" id="limitedWidthBlock">
                <div className="cartAndFormContainer" id="cartAndFormContainer">
                <h1>Votre panier</h1>
                <section className="cart">
                    <section id="cart__items">
                    {/* <article className="cart__item" data-id="{product-ID}" data-color="{product-color}">
                        <div className="cart__item__img">
                        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                        </div>
                        <div className="cart__item__content">
                        <div className="cart__item__content__description">
                            <h2>Nom du produit</h2>
                            <p>Vert</p>
                            <p>42,00 €</p>
                        </div>
                        <div className="cart__item__content__settings">
                            <div className="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" className="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                            </div>
                            <div className="cart__item__content__settings__delete">
                            <p className="deleteItem">Supprimer</p>
                            </div>
                        </div>
                        </div>
                    </article> */}
                    </section>
                    <div className="cart__price">
                    <p>Total (<span id="totalQuantity">{/* 2 */}</span> articles) : <span id="totalPrice">{/* 84,00 */}</span> €</p>
                    </div>
                    <div className="cart__order">
                    <form method="get" className="cart__order__form">
                        <div className="cart__order__form__question">
                            <label htmlFor="firstName">Prénom: </label>
                            <input type="text" name="firstName" id="firstName" 
                                placeholder="Dubosque-de-la-joie (Nom sans espace)" 
                                pattern="\b[^\s\d]+\b" required />
                            <p id="firstNameErrorMsg">{/* ci est un message d'erreur */}    </p>
                        </div>
                        <div className="cart__order__form__question">
                            <label htmlFor="lastName">Nom: </label>
                            <input type="text" name="lastName" id="lastName" 
                                placeholder="Jean-François (Prénom sans espace)" 
                                pattern="\b[^\s\d]+\b" required />
                            <p id="lastNameErrorMsg"></p>
                        </div>
                        <div className="cart__order__form__question">
                            <label htmlFor="address">Adresse: </label>
                            <input type="text" name="address" id="address" 
                                placeholder="23677 rue|boulevard|chemin|... nom de la rue ou du boulevard" 
                                pattern="^\d{1,5}\s+(rue|boulevard|avenue|bld|bd|av|impasse|imp|chemin)\s+[a-zA-Z\s]*[^\s]$" required />
                            <p id="addressErrorMsg"></p>
                        </div>
                        <div className="cart__order__form__question">
                            <label htmlFor="city">Ville: </label>
                            <input type="text" name="city" id="city" 
                                placeholder="Mont-le-précipice (Nom de ville sans espace)" 
                                pattern="([^\d\s]+\s?){1,3}" required />
                            <p id="cityErrorMsg"></p>
                        </div>
                        <div className="cart__order__form__question">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email" 
                                placeholder="exemple@email.com" 
                                pattern="[^\d\s]+@[^\d\s]+\.[^\d\s]{1,5}" required />
                            <p id="emailErrorMsg"></p>
                        </div>
                        <div className="cart__order__form__submit">
                            <input type="submit" value="Commander !" id="order" />
                        </div>
                    </form>
                    </div>
                </section>
                </div>
            </div>
        </main>
        <Footer />
    </>
    )
}


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
                document.getElementById('cart__items').append(article)
                article.querySelector(`input.itemQuantity`).addEventListener("change", e=>template.updateCartProduct(e,{...ls},id_,ii))
                article.querySelector(`p.deleteItem`).addEventListener("click", e=>template.cutCartProduct(e,{...ls},id_,ii))
            }
        else
            orders_.forEach((order,i) => {
                console.log("AFFICHÉ EN ARRAY",i);
                const {color, qty} = order
                , id_ = id
                , article = template.cartProduct({...ls[id_],color},order)
                document.getElementById('cart__items').append(article)
                article.querySelector(`input.itemQuantity`).addEventListener("change", e=>template.updateCartProduct(e,{...ls},id_,i))
                article.querySelector(`p.deleteItem`).addEventListener("click", e=>template.cutCartProduct(e,{...ls},id_,i))
                
            })
    }
    template.resetCartTotal()
}



export default Cart