"use client";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/oneArticle.css";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Button from 'react-bootstrap/Button';
import { IoIosHeartEmpty } from "react-icons/io";


import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from "next/navigation";

export default function OneArticle(props) {
  const article = props.article;

  const router = useRouter();

  const [color, setColor] = useState(article.colors[0]);
  const [size,setSize] = useState("Size");

  const handleSize = (e,size) => {
    const selected = document.getElementsByClassName("checked");
    if(selected[0] != e.target){
    if(selected[0] != undefined){        
    selected[0].classList.remove("checked")
    }
    e.target.classList.add("checked");
    }
    setSize(size);
    setError("");
    const sizesOpen = document.getElementsByClassName("product__sizes");
    sizesOpen[0].classList.toggle("-mobileShow");
  }

  const handleOpen = ()=>{
    const sizesOpen = document.getElementsByClassName("product__sizes");
    sizesOpen[0].classList.toggle("-mobileShow");
  }

  const [error,setError] = useState("");

  const handleBuy = ()=>{
    if(size === "Size"){
      const sizesOpen = document.getElementsByClassName("product__sizes");
      sizesOpen[0].classList.toggle("-mobileShow");
      setError("Choose your size !");
    }
    else{
       const articleToBuy = {price: article.price , articles: [{id: props.id, price: article.price, name: article.name , image: color.images[0], color: color.name, size: size}]}
       localStorage.setItem("article",JSON.stringify(articleToBuy));
       router.push("/check");
    }
  }

  return (
    <Container>
      <Row>
        <Col className="col-lg-8 col-12 product-images-area">
          <div className="product-images -desktop">
            <div className="productGallery o-gallery -passive -passive">
              <div className="swiper-container">
                <ul className="swiper-wrapper">
                  {color.images.map((image, index) => {
                    return (
                      <li key={index} className="swiper-slide">
                        <div className="o-gallery__imgContainer productGallery__container">
                          <img
                            id="product-image"
                            className="o-gallery__img lazy -loaded"
                            src={image}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="product-images -mobile">
          <Swiper 
         pagination={{
          clickable: true,
           }} 
        modules={[Pagination]} 
         style={{height:"100%"}}
        >
            {color.images.map((image,index)=>{
          return(
            <SwiperSlide key={index} style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
        <img src={image} style={{height:"100%",maxWidth:"100%",objectFit:"contain"}} alt='product'></img>
        </SwiperSlide>
          )
        })}

        </Swiper>
 
          </div>
        </Col>

        <Col className="col-12 col-lg-4">
        <div className="product">
         <div className="product__tools">
         <button className="product__button -addToFavorite -mobile">
         <IoIosHeartEmpty />
         </button>
         </div>
          <h1 className="product__name h2">{article.name}</h1>
          <div className="product__prices">
            <div className="product__priceContent">
              <div className="product__item">
                <span className="product__price -actual"> {article.price} </span>
              </div>
            </div>
          </div>
          <div className="product__colors">
          {article.colors.map((color,j)=>{
            return(
                <div onClick={()=>setColor(color)} key={j} className="product__color">
              <span style={{display:"block",width:"100%",height:"100%",borderRadius:"50%",backgroundColor:color.name.toLowerCase()}}></span>
            </div>
            )
          })}
            <span className="product__colorName">{color.name}</span>
          </div>
          <div className="product__sizes">
            <div className="overlay"></div>
            <div className="product__header -sizes">
            <span className="product__label -sizes">Select your size : <span style={{color:"red"}}>{error}</span></span>
            </div>
            <div className="product__content -sizes">
            {color.sizes.map((size,i)=>{
                 if(size.stock > 0){ 
                  return(
                    <div key={i} onClick={(e)=>handleSize(e,size.name)} className="product__size radio-box">
                 <label className="radio-box__label">{size.name.replace("size","")}</label>
               </div>
                  )
                 }
            })}
        
          </div>
          </div>


          <div className="product__shopTheLook">
          <Button className="lg block" variant="outline-light">
          <span className="button__text">Add to Cart</span>
          </Button>
          </div>


          <div className="product__buttons -shopTheLook">
           <button onClick={()=>handleOpen()} className="product__button -selectSize">
            {size}
           </button>
           <div className="product__button -addToCart">
           <Button onClick={()=>handleBuy()} className="lg block" variant="dark">Buy now</Button>
           </div>
           <button className="product__button -addToFavorite">
           <IoIosHeartEmpty />
          </button>
          </div>
          </div>
        </Col>
        <div style={{height:"50vh"}}>

        </div>
      </Row>
    </Container>
  );
}
