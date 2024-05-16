'use client'
import "../../styles/navbar/navbar.css";
import "../../styles/check.css"
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiMenuAlt2 } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { PiHandbag } from "react-icons/pi";
import Autocomplete from '@mui/material/Autocomplete';
import Image from "next/image";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState , useEffect } from 'react';
import { MdDelete } from "react-icons/md";

export default function Navbar(props) {

    let articles = [];
     props.allArticles.map((categorie)=>{
        categorie.articles.map((article)=>{
            articles.push({gender: categorie.gender , categorie: categorie.name, name: article. name,image: article.colors[0].images[0], price: article.price, id: article._id});
        })
     })
    
    

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [articlesCart, setArticlesCart] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setArticlesCart(storedCart);
  }, [show]);

  const handleDeleteFromCart = (index)=> {
    let currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the article at the specified index
    currentCart.splice(index, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];


    setArticlesCart(storedCart);

  }



  return (
    <div className="stickyNav">
      <header className="headerNav">
        <div className="headerInnerNav">
          <Container className="container">
            <Row className="align-items-center">
              <Col className="col-3 header-col__left">
                <div className="new-header__area -left">
                  <HiMenuAlt2 className="new-header__button -menu mlNav--trigger" />
                  <CiSearch className="new-header__button -search js-search-trigger"></CiSearch>
                  <form className="new-header__search">
                    <CiSearch className="new-header__icon -search"></CiSearch>
                    <Autocomplete
                      id="search"
                      className="new-header__searchBox"
                      options={articles}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                       <div className="searchDiv">
                       <h6 className="searchDivArtName">{option.name}</h6>
                       <h6 className="searchDivArtName">{option.price} TL</h6>
                       <Image src={option.image} height={50} width={50} />
                       </div>
      )}
                      renderInput={(params) =>  <div ref={params.InputProps.ref}>
           <input
                      type="text"
                      name="searchKey"
                      style={{all:"unset",marginTop:"8px"}}
                      placeholder="Search for Article, Color..."
                      {...params.inputProps}
                    ></input>
          </div>}
                     />
                  </form>
                </div>
              </Col>
              <Col className="col-6 header-col__center">
                <div className="new-header__area -center">
                  <a className="new-header__link -logo" href="/">
                    <h1 style={{margin: 0}}>PELUCHE</h1>
                  </a>
                </div>
              </Col>
              <Col className="col-3 header-col__right">
                <div className="new-header__area -right">
                  <a className="new-header__link -favorite" href="/favorites">
                  <MdFavoriteBorder className="icn" />
                  </a>
                  <PiHandbag id="crt" className="icn" onClick={()=>handleShow()}/>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      <div className="navbar">
        <ul className="navbar__content">
          <li className="navbar__item">
            <a className="navbar__link h5" href="/newArrivals">New Arrivals</a>
          </li>
          <li className="navbar__item">
          <a className="navbar__link h5" href="/Men">Men</a>
          </li>
          <li className="navbar__item">
          <a className="navbar__link h5" href="/Women">Women</a>
          </li>
          <li className="navbar__item">
          <a className="navbar__link h5" href="/Kids">Kids</a>
          </li>
        </ul>
      </div>



      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><PiHandbag className="icn" /> My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="summary__body">
                         <div className="summary__products">
                           {articlesCart === null ? "" : 
                           articlesCart.length === 0 ? "Cart is empty" :
                            articlesCart.map((article,index)=>{
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
                               {article.priceTotal} TL
                               </span>
                               <MdDelete className="icn mt-4" onClick={()=>handleDeleteFromCart(index)} />
                               </div>
                            </div>
                                )
                            })
                           }
                         </div>
                      </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
