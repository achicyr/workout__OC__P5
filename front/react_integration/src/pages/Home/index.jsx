import React, {useState, useEffect} from 'react'
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Aside from '../../components/Aside'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import "../../assets/css/style.css"


function Home() {
    let endpoint = "http://localhost:3000/api/products"
    , bool = true
    , [listProducts, setListProducts] = useState([])
    console.log("kk");
    useEffect(() => {
    },[listProducts])
    useEffect(() => {
        if(bool){
            loadProducts(endpoint, setListProducts)
            bool = !bool
        }
    }, [])
	return (
    <>
        <Header />
        <main className='limitedWidthBlockContainer'>
                <div className="limitedWidthBlock">
                    <div className="titles">
                        <h1>Nos produits</h1>
                        <h2>Une gamme d'articles exclusifs</h2>
                    </div>
                    <section className="items" id="items">
                        {/* <a href="./product.html?id=42">
                                <article>
                                <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                                <h3 className="productName">Kanap name1</h3>
                                <p className="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                                </article>
                            </a> */}
                        {listProducts}
                    </section>
                </div>
        </main>
        <Footer />
    </>
  );
}


/**
 * * AFFICHER LA LISTE DES PRODUITS DANS LE DOM #items EN UTILISANT LA METHOD Array:forEach
 * @param {array} arr Contient la liste des produits de l'API (appelé par @function(loadProducts))
 */
function addProductsInHome(arr, setListProducts){
    setListProducts(
        arr.map((product,i) => {
            return <Link to={"product/id="+product._id} key={i}>
                        <article>
                            <img src={product.imageUrl} alt={product.altTxt} />
                            <h3 className="productName">{product.name}</h3>
                            <p className="productDescription">{product.description}</p>
                        </article>
                </Link>
        })
    )
}
/**
 * * CHARGE LES DONNÉES DE L'API AUX ENDPOINT"http://localhost:3000/api/products"
 * * POUR RECEVOIR TOUS LES PRODUITS DE L'API À AFFICHER SUR CETTE PAGE (accueil)
 * @param {string} url L'uri à requêter, le "endpoint"
 */
function loadProducts(url, setListProducts){
    console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            addProductsInHome(json, setListProducts)
        })
}


export default Home
