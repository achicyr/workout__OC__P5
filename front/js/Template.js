import {_obj2localStorage,_localStorage2obj} from "./localstorageTools.js"

export default class Template{
    constructor(){
        
    }



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

    cutCartProduct = (e,ls,id,orderIndex) => {
        let color = e.target.closest('article').dataset.color
        , doDelete = confirm(`Êtes-vous sûr de vouloir supprimer l'article suivant:
            ${ls[id].name} - ${color} ?
        `)
        console.log(Object.keys(ls[id].orders).length);
        console.log(id);
        if(doDelete){
            if(Object.keys(ls[id].orders).length == 1){ 
                console.log( JSON.stringify(ls) );
                delete ls[id]
                console.log( JSON.stringify(ls) );
            }else{
                delete ls[id].orders[color]
                ls[id].orders_.splice(orderIndex,1)
            }
            _obj2localStorage(ls)
            cart__items.removeChild(e.target.closest('article'))
            this.resetCartTotal()
        }
    }
    updateCartProduct = (e,ls,id,orderIndex) => {
        const delta = parseInt(e.target.value) - parseInt(e.target.getAttribute('value'))
        , deltaPrice = delta * ls[id].price

        console.log(ls);
        console.log(id);
        console.log(ls[id]);
        console.log(orderIndex);
        console.log(orderIndex);

        
        ls[id].orders_[orderIndex].qty = parseInt(e.target.value)
        ls[id].orders[e.target.closest('article').dataset.color] = parseInt(e.target.value)
        _obj2localStorage(ls)

        this.resetCartTotal()
    }
    resetCartTotal = () => {
        const ls = _localStorage2obj()
        let cptProduct = 0, cptTotal = 0, totalAmount = 0, k,kk
        for(k in ls){
            cptProduct = 0
            for(kk in ls[k].orders)
                cptProduct += ls[k].orders[kk]
            totalAmount += ls[k].price * cptProduct
            cptTotal += cptProduct
        }
        totalQuantity.innerHTML = cptTotal
        totalPrice.innerHTML = totalAmount
        if(cptTotal==0)
            document.querySelector('#cartAndFormContainer>h1').innerHTML += " <span id='cartIsVoid' style='color:red'>est vide</span>"
    }
}