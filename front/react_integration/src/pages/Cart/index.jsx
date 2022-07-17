import Header from '../../components/Header'
import Footer from '../../components/Footer'
import "../../assets/css/cart.css"


function Cart() {
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

export default Cart