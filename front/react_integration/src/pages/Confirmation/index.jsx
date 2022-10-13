import React, {useState, useEffect} from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import "../../assets/css/confirmation.css"

function Confirmation() {

    const orderID = document.location.href.split('=')[1]
    , bool = true

    useEffect(() => {
        if(bool){
            document.getElementById('orderId').innerHTML = orderID
            // localStorage.clear()
        }
    }, [])
    
    return (<>
        <Header />
            <main className='limitedWidthBlockContainer'>
                <div className="limitedWidthBlock" id="limitedWidthBlock">
                    <div className="confirmation">
                        <p>
                            Commande validée ! <br/>
                            Votre numéro de commande est : 
                             <span id="orderId">
                                {/* <!-- 65431343444684674 --> */}
                            </span>
                        </p>
                    </div>
                </div>
            </main>
        <Footer />
    </>
    )
}

export default Confirmation
