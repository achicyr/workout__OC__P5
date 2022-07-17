import {_obj2localStorage,_localStorage2obj} from "./localstorageTools.js"

export default class Template{
    constructor(){
        // this.confirmationPage = ""
    }



    /**
     * * CRÉE UN NOEUD HTML CONTENANT LES INFOS À AFFICHER D'UN PRODUIT
     * @param {object} obj contient les données d'un produit
     * @param {object} order contient les données de commande d'un produit
     * @returns le noeud html contenant le produit à afficher sur la page panier
     */
    cartProduct = (obj, order = false) => {
        let div = document.createElement('div')
        , { _id,imageUrl,altTxt,name,orders,orders_,price,color } = obj
        div.innerHTML = `
            <article class="cart__item" data-id="${_id}" data-color="${color}" data-match="${_id+color}">
                <div class="cart__item__img">
                    <img src="${imageUrl}" alt="${altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${name}</h2>
                        <p>${color}</p>
                        <p>${price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${order?order["qty"]:orders[color]}">
                        </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
        `
        return div.querySelector('article')
    }

    /**
     * * PERMET DE SUPPRIMER UNE VARIANTE D'UN PRODUIT DANS LE PANIER (LES COMMANDES DANS LE PANIER SONT EXPRIMÉS SOUS 2 VERSION: ARRAY & OBJET)
     * @param {EventObject} e l'objet event de l'évènement déclenché par l'utilisateur
     * @param {object} ls le localstorage récupéré au chargement de la page
     * @param {*} id l'identifiant du produit
     * @param {*} orderIndex le numéro d'index dans lequel apparaît la variante du produit dans ls, afin de pouvoir accéder aux données de sa commade pour retirer la variante du panier ou de le retirer le produit du panier si aucune autre variante n'y existe 
     */
    cutCartProduct = (e,ls,id,orderIndex) => {
        let color = e.target.closest('article').dataset.color
        , doDelete = confirm(`Êtes-vous sûr de vouloir supprimer l'article suivant:
            ${ls[id].name} - ${color} ?
        `)
        // console.log(Object.keys(ls[id].orders).length);
        // console.log(id);
        if(doDelete){
            // * SI AUCUNE AUTRE VARIANTE N'EXISTE DANS LE PANIER, ON SUPPRIME CARRÉMENT LE PRODUIT
            // * SINON JUSTE SA VARIANTE
            if(Object.keys(ls[id].orders).length == 1){ 
                delete ls[id]
            }else{
                delete ls[id].orders[color]
                ls[id].orders_.splice(orderIndex,1)
            }
            // * PUIS ON ACTUALISE LE LOCALSTORAGE DE CETTE DERNIÈRE MODIFICATION
            // * ENSUITE ON LE RETIRE DU DOM, ET ON RECALCULE LES TOTAUX
            _obj2localStorage(ls)
            cart__items.removeChild(e.target.closest('article'))
            this.resetCartTotal()
        }
    }
    /**
     * * PERMET DE MODIFIER LA QUANTITÉ D'UNE VARIANTE D'UN PRODUIT
     * @param {EventObject} e l'objet event de l'évènement déclenché par l'utilisateur
     * @param {object} ls le localstorage récupéré au chargement de la page
     * @param {*} id l'identifiant du produit
     * @param {*} orderIndex le numéro d'index dans lequel apparaît la variante du produit dans ls, afin de pouvoir accéder aux données de sa commade pour modifier sa quantité
     */
    updateCartProduct = (e,ls,id,orderIndex) => {
        const delta = parseInt(e.target.value) - parseInt(e.target.getAttribute('value'))
        , deltaPrice = delta * ls[id].price

        // * JE FAIS LA MODIFICATION POUR LES 2 VERSIONS DE LA COMMANDE (ARRAY & OBJET)
        ls[id].orders_[orderIndex].qty = parseInt(e.target.value)
        ls[id].orders[e.target.closest('article').dataset.color] = parseInt(e.target.value)
        
        // * ENSUITE ON LE RETIRE DU DOM, ET ON RECALCULE LES TOTAUX
        _obj2localStorage(ls)
        this.resetCartTotal()
    }
    /**
     * * PERMET DE REFAIRE LES TOTAUX (NOMBRE D'ARTICLES, ET PRIX TOTAL)
     */
    resetCartTotal = () => {
        const ls = _localStorage2obj()
        let cptProduct = 0, cptTotal = 0, totalAmount = 0, k,kk

        // * JE BOUCLE SUR LE LOCALSTORAGE POUR A VOIR SA DERNIÈRE VERSION ET CALCULÉ LES NOUVEAUX TOTAUX
        for(k in ls){
            cptProduct = 0
            for(kk in ls[k].orders)
                cptProduct += ls[k].orders[kk]
            totalAmount += ls[k].price * cptProduct
            cptTotal += cptProduct
        }
        // * PUIS JE LES AFFICHES DANS LE DOM
        totalQuantity.innerHTML = cptTotal
        totalPrice.innerHTML = totalAmount
        // * ENFIN SI LE PANIER EST VIDE, JE LE FAIS SAVOIR À L'UTILISATEUR
        if(cptTotal==0)
            document.querySelector('#cartAndFormContainer>h1').innerHTML += " <span id='cartIsVoid' style='color:red'>est vide</span>"
    }
    /**
     * * PERMET DE BLOQUER LE FLUX NORMAL DU FORMULAIRE AFIN DE:
     * * 1°) TESTER LA CONFORMITÉ DES VALEUR ENTRÉES PAR L'UTILISATEUR
     * * 2°) D'ENVOYER LES DONNÉES DE LA COMMANDE À L'API 
     * * 3°) RÉCUPÉRER L'ID DE LA CONFIRMATION DE LA COMMANDE PAR L'API
     * * 4°) ET ENFIN REDIRIGER L'UTILISATEUR VERS LA PAGE DE CONFIRMATION
     * @param {EventObject} e l'objet event de l'évènement submit déclenché par le formulaire
     * @param {*} endpoint l'URI de l'API pour passer commande (en POST)
     */
    sendForm = (e,endpoint) => {
        e.preventDefault()
        console.log(e.target);
        let contact = {}
        , products = []
        , obj = _localStorage2obj()

        // 1°) IL FAUDRA CRÉER UN CLASS POUR TRAITER LES DONNÉES AVEC LES REGEX QUI SONT POUR L'INSTANT SUR LE FRONT
        // ET L'APPELER ICI xD
        //ICI
        for(let a in obj)
            products.push(a)
        Array.from(new FormData(e.target)).forEach(([name,value]) => {
            contact[name] = value
        })
        console.log(contact, products);
        // 2°)
        fetch(endpoint, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({contact, products})
        })
        .then(res => res.json())
        .then(confirmationOrder => {
            // 3°) ET 4°)
            console.log(confirmationOrder);
            location = 'confirmation.html?orderId=' + confirmationOrder.orderId
        })
    }
}