
/**
 * * LE LOCALSTORAGE EST UN OBJET DE CHAÎNE DE CARACTÈRES,
 * * IL FAUT LE TRANSFORMER EN OBJET D'OBJETS POUR POUVOIR LE TRANSFORMER
 * @returns le localstorage transformer un objet d'objet
 */
export function _localStorage2obj(){
    const obj = {}
    for(let key in localStorage)if(localStorage.hasOwnProperty(key))
        obj[key] = JSON.parse(localStorage[key])
    // console.log(obj);
    return obj
}


/**
 * * LE LOCALSTORAGE EST UN OBJET DE CHAÎNE DE CARACTÈRES,
 * * IL FAUT LE TRANSFORMER EN OBJET D'OBJETS POUR POUVOIR LE TRANSFORMER
 * @param {object} obj le localstorage transformer un objet d'objet
 * @returns le @param(obj) transformé pour le localstorage
 */
export function _obj2localStorage(obj){
    // console.log(localStorage )
    localStorage.clear()
    for(let key in obj)
        localStorage[key] = JSON.stringify(obj[key])
    // console.log(localStorage )
}