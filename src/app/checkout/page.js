'use client'
import "../styles/checkout.css"
import { PiHandbag } from "react-icons/pi";
import { IoCubeOutline } from "react-icons/io5";
import { CiCreditCard2 } from "react-icons/ci";


export default function Checkout(){ 

    const lcl = localStorage.getItem("article");
    const article = JSON.parse(lcl);

    return(
        <div className="layout__content">
          <div className="layout__main">
             <div className="checkout">
               <div className="steps">
                  <div className="step">
                       <div className="step__wrapper">
                         <div className="step__icon">
                             <PiHandbag />
                         </div>
                         <div className="step__title">
                         <span className="order">1.</span>
                          Shop
                         </div>
                       </div>
                  </div>
                  <div className="step -current">
                       <div className="step__wrapper">
                          <div className="step__icon">
                             <IoCubeOutline />
                          </div>
                          <div className="step__title">
                          <span className="order">2.</span>
                            Delivery
                          </div>
                       </div>
                  </div>
                  <div className="step">
                       <div className="step__wrapper">
                         <div className="step__icon">
                           <CiCreditCard2 />
                         </div>
                         <div className="step__title">
                         <span className="order">3.</span>
                          Payment
                         </div>
                       </div>
                  </div>
               </div>
             </div>
          </div>



          <div className="layout__sidebar -checkout">

          </div>
        </div>
    )
}