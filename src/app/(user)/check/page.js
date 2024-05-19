"use client";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { useEffect, useState } from "react";
import "../../styles/check.css";
import { getCities , getDistrictsByCityCode , getNeighbourhoodsByCityCodeAndDistrict } from "turkey-neighbourhoods";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Check() {
  const [articles, setArticles] = useState(null);
  const [citySelected,setCitySelected] = useState(null);
  const [districts,setDistricts] = useState(null);
  const [neighborhood,setNeighborhood] = useState(null);
  const [order,setOrder] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    address: "",
    articles: [],
    total: "",
    status: "Waiting"
  })

  const router = useRouter();

  useEffect(() => {
    const lcl = localStorage.getItem("article");
    setArticles(JSON.parse(lcl));
    setOrder((prev)=>({...prev,articles:JSON.parse(lcl).articles,total:JSON.parse(lcl).price}));
  }, []);

  const options = articles
    ? {
        mode: "payment",
        currency: "eur",
        amount: articles.price,
      }
    : null;

    const cities = getCities();

    const handleCity = (e)=>{
      setOrder((prev)=>({...prev,[e.target.name]:e.target.value,district:"",neighborhood:""}))
      const dst = getDistrictsByCityCode(e.target.value);
      setDistricts(dst);
    }

    const handleDistrict = (e)=>{
      setOrder((prev)=>({...prev,[e.target.name]:e.target.value,neighborhood:""}))
      const nbgh = getNeighbourhoodsByCityCodeAndDistrict(order.city,e.target.value)
      setNeighborhood(nbgh);
    }

    const handleSumbit = async (e)=>{
      e.preventDefault();
      const res = await axios.post("/api/order/createOrder",{order: order})
      .then((response)=>{
        if(response.data.success === true){
          console.log("success !")
           router.push("/thankYou");
        }
        else{
          console.log("Smthn went wrong")
        }
      }).catch((error)=>{
        console.log(error)
      })
    }

  return (
    <>
      <div className="checkoutDiv">
        <div className="infosDiv">
          <div className="personnalInfos">
            <div className="container">
              <h1>Shipping</h1>
              <p>Please enter your shipping details.</p>
              <hr />
              <form onSubmit={(e)=>handleSumbit(e)} className="form">
                <div className="fields fields--2">
                  <label className="field">
                    <span className="field__label" htmlFor="firstname">
                      Full name
                    </span>
                    <input
                      className="field__input"
                      type="text"
                      required
                      id="firstname"
                      name="fullName"
                      onChange={(e)=>setOrder((prev)=>({...prev,[e.target.name]:e.target.value}))}
                    />
                  </label>
                  <label className="field">
                    <span className="field__label" htmlFor="lastname">
                      email
                    </span>
                    <input required name="email" className="field__input" type="email" id="lastname"
                     onChange={(e)=>setOrder((prev)=>({...prev,[e.target.name]:e.target.value}))}
                     />
                  </label>
                </div>
                <label className="field">
                  <span className="field__label" htmlFor="address">
                    Phone number
                  </span>
                  <input required name="phone" className="field__input" type="text" id="address" 
                    onChange={(e)=>setOrder((prev)=>({...prev,[e.target.name]:e.target.value}))}

                  />
                </label>
                <div className="fields fields--3">
                  <label className="field">
                    <span className="field__label" htmlFor="zipcode">
                      City
                    </span>
                    <select required name="city" onChange={(e)=>handleCity(e)} className="field__input" id="state">
                      <option hidden value=""></option>
                      {cities === undefined ? "" : cities.map((city,key)=>{
                        return(
                          <option key={key} value={city.code}>{city.name}</option>
                        )
                      })}
                      
                    </select>
                  </label>
                  <label className="field">
                    <span className="field__label" htmlFor="city">
                      District
                    </span>
                    <select required name="district" onChange={(e)=>handleDistrict(e)} value={order.district} className="field__input" id="state">
                    <option hidden value=""></option>
                     {districts === null ? "" :
                      districts.map((district,index)=>{
                        return(
                          <option key={index} value={district}>{district}</option>
                        )
                      })
                      
                     }
                    </select>
                  </label>
                  <label className="field">
                    <span className="field__label" htmlFor="state">
                      Neighborhood
                    </span>
                    <select required value={order.neighborhood} name="neighborhood" className="field__input" id="state"
                     onChange={(e)=>setOrder((prev)=>({...prev,[e.target.name]:e.target.value}))}
                    >
                    <option hidden value=""></option>
                     {neighborhood === null ? "" 
                     :
                     neighborhood.map((neighborhood,index)=>{
                      return(
                        <option key={index} value={neighborhood}>{neighborhood}</option>
                      )
                     })
                     }
      
                    </select>
                  </label>
                </div>
                <label className="field">
                  <span className="field__label" htmlFor="country">
                    Address
                  </span>
                  <input required name="address" className="field__input" type="text" id="lastname"
                    onChange={(e)=>setOrder((prev)=>({...prev,[e.target.name]:e.target.value}))}
                   />
                </label>
                <button type="submit" className="btn btn-dark">Submit</button>
              </form>
              <hr></hr>
            </div>
          </div>

          {/* <div className="container">
            {articles && options && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm
                  price={articles.price}
                  articles={articles.articles}
                />
              </Elements>
            )}
          </div> */}
        </div>

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

        </div>
      </div>
    </>
  );
}
