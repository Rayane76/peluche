"use client";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/oneArticle.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Button from 'react-bootstrap/Button';
import { IoIosHeartEmpty } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from "next/navigation";

export default function OneArticle(props) {
  const article = props.article;

  const router = useRouter();

  const [color, setColor] = useState(article.colors[0]);
  const [size,setSize] = useState("Size");
  const [quantity, setQuantity] = useState(1);

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
       const articleToBuy = {price: article.price * quantity , articles: [{id: props.id, quantity : quantity , price: article.price, name: article.name , image: color.images[0], color: color.name, size: size}]}
       localStorage.setItem("article",JSON.stringify(articleToBuy));
       router.push("/check");
    }
  }

  const handleAddCart = ()=>{
    if(size === "Size"){
      const sizesOpen = document.getElementsByClassName("product__sizes");
      sizesOpen[0].classList.toggle("-mobileShow");
      setError("Choose your size !");
    }
      else{
         const articleToBuy = {priceTotal: article.price * quantity , id: props.id, quantity : quantity , price: article.price, name: article.name , image: color.images[0], color: color.name, size: size}
         let currentCart = JSON.parse(localStorage.getItem('cart')) || [];

         // Add the new article to the cart
         currentCart.push(articleToBuy);
     
         // Save the updated cart back to localStorage
         localStorage.setItem('cart', JSON.stringify(currentCart));

         const svgElement = document.getElementById('crt');
const event = new MouseEvent('click', {
  view: window,
  bubbles: true,
  cancelable: true
});
svgElement.dispatchEvent(event);
      }


    }

  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = (e) => {
    const selectedSize = color.sizes.find((s) => s.name === size);
    if(selectedSize && quantity < selectedSize.stock){
    e.preventDefault();
    setQuantity(quantity + 1);
    }
  };

  const handleColor = (color) => {
    setColor(color);
    setSize("Size");
    const selected = document.getElementsByClassName("checked");
    if(selected[0] != undefined){        
    selected[0].classList.remove("checked")
    }
  }

  const [isActive, setIsActive] = useState(false);

  useEffect(()=>{
    const storedFav = JSON.parse(localStorage.getItem('fav')) || [];
      const exists = storedFav.some((item)=> item.id === props.id);
      if(exists){
        setIsActive(true)
      }
      else{
        setIsActive(false);
      }

  },[])

  const toggleHeart = () => {
    const storedFav = JSON.parse(localStorage.getItem('fav')) || [];
    if(isActive){
      const filteredData = storedFav.filter(item => item.id !== props.id);
      localStorage.setItem('fav', JSON.stringify(filteredData));
    }

    else{ 
       storedFav.push({name: article.name,id: props.id,price: article.price,image: color.images[0]})
       localStorage.setItem('fav', JSON.stringify(storedFav));
    }

    setIsActive(!isActive);
  };


  return (
    <Container style={{marginBottom:"150px"}}>
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
         <div onClick={toggleHeart} style={{ cursor: 'pointer', fontSize: '2em' }}>
      {isActive ? <FaHeart color="black" /> : <FaRegHeart color="black" />}
    </div>
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
                <div onClick={()=>handleColor(color)} key={j} className="product__color">
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
          {size != "Size" && 
          <div className="quantity-input mb-4">
          <span className="product__label -sizes">Select quantity : </span>
      <button className="quantity-btn" onClick={handleDecrement}>-</button>
      <span className="quantity">{quantity}</span>
      <button className="quantity-btn" onClick={handleIncrement}>+</button>
    </div>
          }


          <div className="product__shopTheLook">
          <Button onClick={()=>handleAddCart()} className="lg block" variant="outline-light">
          <span className="button__text">Add to Cart</span>
          </Button>
          </div>


          <div className="product__buttons -shopTheLook">
           <button onClick={()=>handleOpen()} className="product__button -selectSize">
            {size}
           </button>
           <div className="product__button -addToCart">
           <Button onClick={()=>handleBuy()} className="block2 lg" variant="dark">Buy now</Button>
           </div>
           <button className="product__button -addToFavorite">
           <div onClick={toggleHeart} style={{ cursor: 'pointer', fontSize: '2em' }}>
      {isActive ? <FaHeart color="black" /> : <FaRegHeart color="black" />}
    </div>
          </button>
          </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
