import {_obj2localStorage,_localStorage2obj} from "./localstorageTools.js"

// const productID = location.href.substring(location.href.indexOf('id=')+3)
const params = new URL(location).searchParams
, productID = params.get('id')
, endpoint = "http://localhost:3000/api/products/"




console.log(productID);
getProduct(endpoint, productID)




/**
 * * CHARGE LES DONNÉES DE L'API À L'ENDPOINT DONNÉ EN PARAMÈTRE @param(url)+'/'+@param(id)
 * * POUR RECEVOIR LE PRODUIT À AFFICHER SUR CETTE PAGE PRODUIT 
 * @param {string} url L'uri à requêter, le "endpoint"
 * @param {string} id L'identifiant du produit à afficher
 */
function getProduct(url = endpoint, id = productID){
    fetch(url+id)
        .then(response => response.json())
        .then((product) => {
            // console.log(product);
            // JE CHARGE MAINTENANT LE DOM AVEC LES DONNÉE REÇUS DE L'API CONCERNANT LE PRODUIT
            // IMAGE/TITRE/DESCRIPTION/PRIX/COURLEURS
            document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
            title.innerHTML = product.name
            price.innerHTML = product.price
            description.innerHTML = product.description
            product.colors.forEach(color=>{colors.innerHTML += `<option value="${color}">${color}</option>`})

            //MAINTENANT QUE J'AI LES DONNÉES DU PRODUIT, 
            //J'AJOUTE L'ÉVÈNEMENT AU PANIER
            addToLocalStorage(product)
        })
}



/**
 * * PERMET D'AJOUTER UN PRODUIT AU PANIER SELON 3 CONDITIONS
 * ? SI LE PRODUIT N'EXISTE PAS DANS LE PANIER(EN VÉRIFIANT SON ID)
 * ? SI LE PRODUIT Y EXITSTE DÉJÀ, MAIS PAS LA COULEUR CHOISIE (ACTUALISATION DE LA COMMANDE DU PRODUIT)
 * ? SI LA COULEUR À DÉJÀ ÉTÉ CHOISI (ACTUALISATION DE LA QUANTITÉ DE LA COMMANDE DU PRODUIT)
 * ! AU DÉBUT DE L'ÉVÈNEMENT, L'INSTANCE @instance(ls) EST AFFECTÉ DE LA VALEUR DU LOCALSTORAGE GRÂCE À LA FONCTION _localStorage2obj
 * ! À LA FIN DE L'ÉVÈNEMENT, LE LOCALSTORAGE EST RÉAFFECTÉ DE L'INSTANCE @instance(ls) GRÂCE À LA FONCTION _obj2localStorage
 * @param {object} product contient les données de l'objet affiché sur la page
 */
function addToLocalStorage(product){
    /* INSTRUCTIONS À RÉALISER PAR ÉTAPES
    //AJOUTER UN ÉVÈNEMENT AU BOUTON SUBMIT, EN UTILISANT LE LOCALSTORAGE DU NAVIGATEUR
    //CETTE ÉVÈNEMENT PERMET DE RÉCUPÉRER L'ÉTAT ACTUELLE DU LOCALSTORAGE
    //PUIS À L'AIDE D'UNE CONDITION À 3 SORTIES, DE DÉFINIR COMMENT AJOUTER LE PRODUIT AUX LOCALSTORAGE
    //PUISQUE LE LOCALSTORAGE TRANSFORME SES DONNÉES EN CHAÎNE DE CARACTÈE, IL FAUT CRÉER 2 FONCITON POUR FACILEMENT CHANGER LEUR ÉTAT, D'OBJET À STRING, ET DE STRING À OBJET
    //VÉRIFIER QUE LA SÉLECTION DE L'UTILISATEUR EST SUFFISANTE POUR RAJOUTER UN ARTICLE AU PANIER(COULEUR & QUANTITÉ)
    */


   addToCart.addEventListener("click", () => {
        const ls = Object.keys(localStorage).length == 0 ? {} : _localStorage2obj() //STOCKER TEMPORAIREMENT LE LOCALSTORAGE DANS UNE VARIABLE AFIN DE LA RE-RESTITUER AU LOCALSTORAGE À LA FIN SOUS FORME DE STRING
        let tmp_, tmp //UNE  VARIABLE TEMPORAIRE QUI SERA UTILISER COMME VARIABLE TAMPON UNE OU PLUSIEUR FOIS AU COURS DU SCRIPT DE CETTE FONCTION
        console.log(ls);
        console.log(localStorage);
        if(colors.value=="" || quantity.value==0){
            alert("Erreur: Vous devez choisir une couleur de canapé, ainsi qu'une quantité svp")
            return false
        }
        //IL Y A 3 CAS:
        //  1°)LE PRODUIT N'EXISTE PAS DANS LE PANIER
        //  2°)LE PRODUIT EXISTE DÉJÀ DANS LE PANIER
        //      A°)MAIS LA COULEUR CHOISI N'EXISTE PAS ENCORE DANS LE PANIER, ET ON RAJOUTER UN OBJET À L'ARRAY DE L'ORDRE
        //      B°)ET LA COULEUR EXISTE DÉJÀ DANS LE PANIER, ET ON MODIFIE L'ARRAY CORRESPONDANT POUR MODIFIER SA QUANTITY
        if(!ls[productID]){

            //CAS 1°) J'AJOUTE:
            // UN OBJET CORRESPONDANT AUX DONNÉES AU PRODUIT (...product), 
            // ET UN OBJET CORRESPONDANT À L'ORDRE DU PRODUIT (orders)

            ls[productID] = {...product
                , orders_:[{color:colors.value,qty:parseInt(quantity.value)}]/*CAS AVEC UN ARRAY EN ORDER*/
                , orders:{[colors.value]:parseInt(quantity.value)}/*CAS AVEC UN OBJET EN ORDER*/
            }
            console.log("1°) ls: ",ls);

        }else{

            //CAS 2°)
            /*CAS AVEC UN ARRAY EN ORDER*/ if(!(tmp_ = ls[productID].orders_.find( order => order.color == colors.value )) &&/*){*/
            /*CAS AVEC UN OBJET EN ORDER*/ /*if(*/!(tmp = ls[productID].orders)[colors.value]){

                console.log(tmp);
                console.log(tmp_);
                //ICI LA COULEUR CHOISIE N'EXISTE PAS ENCORE DANS LE PANIER
                // ON RAJOUTER UN OBJET À L'ARRAY DE L'ORDRE

                /*CAS AVEC UN ARRAY EN ORDER*/ ls[productID].orders_.push({color:colors.value,qty:parseInt(quantity.value)})
                /*CAS AVEC UN OBJET EN ORDER*/ ls[productID].orders[[colors.value]] = parseInt(quantity.value)
                console.log("2a°) ls: ",ls);
                
            }else{

                //ICI LA COULEUR CHOISIE !!!EXISTE DÉJÀ!!! DANS LE PANIER
                // ON MODIFIE LA QUANTITÉ DE L'ARRAY DE LORDRE CORRESPONDANT 
                // DANS CETTE CONDITION, LA VARIABLE tmp DEVRAIT CONTENIR L'ORDRE CONCERNANT CETTE COULEUR DE CE PRODUIT
                tmp = ls[productID].orders //je ne sais pas vraiment pourquoi, mais tmp (ligne93) dans la condition n'est pas assigné de valeur, donc je le fait là
                // console.log(tmp_);
                // console.log(tmp);
                
                /*CAS AVEC UN ARRAY EN ORDER*/ tmp_.qty += parseInt(quantity.value)
                /*CAS AVEC UN OBJET EN ORDER*/ tmp[[colors.value]] += parseInt(quantity.value)
                console.log("2b°) ls: ",ls);
            }
        }

        _obj2localStorage(ls)
        console.log(localStorage);
        
    })

}

export default [getProduct, addToLocalStorage]

