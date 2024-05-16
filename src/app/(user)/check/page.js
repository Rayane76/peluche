"use client";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { useEffect, useState } from "react";
import "../../styles/check.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Check() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const lcl = localStorage.getItem("article");
    setArticles(JSON.parse(lcl));
  }, []);

  const options = articles
    ? {
        mode: "payment",
        currency: "eur",
        amount: articles.price,
      }
    : null;

  return (
    <>
      <div className="checkoutDiv">
        <div className="infosDiv">
          <div className="personnalInfos">
            <div className="container">
              <h1>Shipping</h1>
              <p>Please enter your shipping details.</p>
              <hr />
              <div className="form">
                <div className="fields fields--2">
                  <label className="field">
                    <span className="field__label" for="firstname">
                      First name
                    </span>
                    <input
                      className="field__input"
                      type="text"
                      id="firstname"
                    />
                  </label>
                  <label className="field">
                    <span className="field__label" for="lastname">
                      Last name
                    </span>
                    <input className="field__input" type="text" id="lastname" />
                  </label>
                </div>
                <label className="field">
                  <span className="field__label" for="address">
                    Address
                  </span>
                  <input className="field__input" type="text" id="address" />
                </label>
                <label className="field">
                  <span className="field__label" for="country">
                    Country
                  </span>
                  <select className="field__input" id="country">
                    <option value=""></option>
                    <option value="unitedstates">United States</option>
                  </select>
                </label>
                <div className="fields fields--3">
                  <label className="field">
                    <span className="field__label" for="zipcode">
                      Zip code
                    </span>
                    <input className="field__input" type="text" id="zipcode" />
                  </label>
                  <label className="field">
                    <span className="field__label" for="city">
                      City
                    </span>
                    <input className="field__input" type="text" id="city" />
                  </label>
                  <label className="field">
                    <span className="field__label" for="state">
                      State
                    </span>
                    <select className="field__input" id="state">
                      <option value=""></option>
                    </select>
                  </label>
                </div>
              </div>
              <hr></hr>
            </div>
          </div>

          <div className="container">
            {articles && options && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm
                  price={articles.price}
                  articles={articles.articles}
                />
              </Elements>
            )}
          </div>
        </div>

        {/* <div className="itemsDiv"> */}
            <div className="layout__sidebar -checkout">
              <div className="sidebar__content">
                   <div className="summary">
                      <div className="summary__header">
                       <h5 className="summary__title">Order Summary</h5>
                      </div>

                      <div className="summary__body">
                         <div className="summary__products">
                           {articles === null ? "" : 
                            articles.articles.map((article,index)=>{
                                return(
                                    <div key={index} className="product">
                               <a className="product__area -image" href={"/articles/" + article.id}>
                                <img className="articleImg" src={article.image} alt={article.name}></img>
                               </a>
                               <div className="product__area -content">
                                   <h4 className="product__title">{article.name}</h4>
                                   <div className="product__attributes">
                                     <div style={{display:"flex",flexDirection:"row"}}>
                                      <span className="product__attrKey">
                                      Size:
                                      </span>
                                      <span className="product__attrValue">
                                      {article.size}
                                      </span>
                                      </div>
                                      <div style={{display:"flex",flexDirection:"row"}}>
                                      <span className="product__attrKey">
                                      Color:
                                      </span>
                                      <span className="product__attrValue">
                                      {article.color}
                                      </span>
                                      </div>
                                      <div style={{display:"flex",flexDirection:"row"}}>
                                      <span className="product__attrKey">
                                      Piece:
                                      </span>
                                      <span className="product__attrValue">
                                      {article.quantity}
                                      </span>
                                      </div>
                                   </div>
                               </div>
                               <div  className="product__area -prices">
                               <span className="product__price">
                               {article.price} TL
                               </span>
                               </div>
                            </div>
                                )
                            })
                           }
                         </div>
                      </div>
                      <div className="summary__footer">
                         <div className="summaryItem -total">
                           <div className="summaryItem__title">
                             TOTAL
                           </div>
                           <div className="summaryItem__value" data-qa="totalAmountToBePaid">
                             {articles && articles.price} TL
                           </div>
                         </div>
                      </div>
                   </div>
              </div>

            {/* </div> */}
        </div>
      </div>
    </>
  );
}
