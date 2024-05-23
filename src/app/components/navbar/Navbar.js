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
import { useRouter } from "next/navigation";
import ArticleCmp from "../article/ArticleCmp";

export default function Navbar(props) {

  const router = useRouter();

    let articles = [];
     props.allArticles.map((categorie)=>{
        categorie.articles.map((article)=>{
            articles.push({gender: categorie.gender , colors: article.colors, categorie: categorie.name, name: article. name,image: article.colors[0].images[0], price: article.price, id: article._id});
        })
     })
    
    

  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const [articlesCart, setArticlesCart] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setArticlesCart(storedCart);
  }, [showCart]);

  const handleDeleteFromCart = (index)=> {
    let currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the article at the specified index
    currentCart.splice(index, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];


    setArticlesCart(storedCart);

  }

  
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);


  const handleClickBuyNow = () => {
     let prc = 0;
     articlesCart.map((article)=>{
      prc = prc + article.priceTotal;
     })

     const articleToBuy = {price: prc, articles:articlesCart};

     localStorage.setItem("article",JSON.stringify(articleToBuy));
     
     localStorage.removeItem("cart");

     setShowCart(false);

     router.push("/check");
  }

  const handleMobileSearch = () => {
    const sections = document.getElementsByTagName('section');
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.toggle("srchNotActive");
    }
    document.getElementById("searchMobileDiv").classList.toggle("srchNotActive");
    document.getElementById("row1").classList.toggle("srchNotActive");
    document.getElementById("row2").classList.toggle("srchNotActive");
  }

  const [searchMobile,setSearchMobile] = useState("");

  function checkLetters(srch, name) {
    let nm = 0;
    for (let i = 0; i < srch.length; i++) {
        if (name.includes(srch[i])) {
            nm = nm + 1;
        }
    }
    if(nm > 3 && ((srch.length)/2) < name.length ){
      return true;
    }
    else{
    return false;
    }
}

const filterAndSortArticles = (articles, searchMobile) => {
  const condition1 = articles.filter(article =>
      article.name[0].toLowerCase() === searchMobile[0].toLowerCase()
  );

  const condition2 = articles.filter(article =>
      article.name.toLowerCase().includes(searchMobile.toLowerCase())
  );

  const condition3 = articles.filter(article =>
      checkLetters(searchMobile.toLowerCase(), article.name.toLowerCase())
  );

  // Concatenate the unique articles from each condition
  const allArticles = [
      ...condition1,
      ...condition2.filter(article => !condition1.includes(article)),
      ...condition3.filter(article => !condition1.includes(article) && !condition2.includes(article)),
  ];

  console.log(allArticles);

  // Map the concatenated result to the components
  return allArticles.map((article, index) => (
      <ArticleCmp key={index} id={article.id} name={article.name} colors={article.colors} price={article.price} />
  ));
};

  return (
    <>
    <div className="stickyNav">
      <header className="headerNav">
        <div className="headerInnerNav">
          <Container className="container">
            <Row id="row1" className="align-items-center">
              <Col className="col-3 header-col__left">
                <div className="new-header__area -left">
                  <HiMenuAlt2 onClick={()=>handleShowMenu()} className="new-header__button -menu mlNav--trigger" />
                  <CiSearch onClick={()=>handleMobileSearch()} className="new-header__button -search js-search-trigger"></CiSearch>
                  <form onSubmit={(e)=>e.preventDefault()} className="new-header__search">
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
                  <a className="new-header__link -favorite" href="/favourites">
                  <MdFavoriteBorder className="icn" />
                  </a>
                  <PiHandbag id="crt" className="icn" onClick={()=>handleShow()}/>
                </div>
              </Col>
            </Row>
            <Row id="row2" className="srchNotActive">
            <Col className="d-flex justify-content-between align-items-center">
            <div className="formMbl">
      <button>
          <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
              <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
      </button>
      <input className="inputMbl" value={searchMobile} onChange={(e)=>setSearchMobile(e.target.value)} placeholder="Search" required="" type="text" />
      <button className="reset" type="reset" onClick={(e)=>setSearchMobile("")}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
      </button>
  </div>

  <button className="cancelMbl" onClick={()=>handleMobileSearch()}>
    Cancel
  </button>
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



      <Offcanvas placement="end" show={showCart} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><PiHandbag className="icn" /> My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="summary__body">
                         <div className="summary__products">
                           {articlesCart === null ? "" : 
                           articlesCart.length === 0 ? "Cart is empty" :
                            <div>
                            {articlesCart.map((article,index)=>{
                                return(
                                    <div key={index} className="product">
                               <a className="product__area -image" href={"/articles/" + article.name + "/" + article.id}>
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
                            })}
                            <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                           <button onClick={()=>handleClickBuyNow()} className="btn btn-dark">Buy now</button>
                            </div>
                            </div>
                           }
                         </div>
                      </div>
        </Offcanvas.Body>
      </Offcanvas>




      <Offcanvas show={showMenu} onHide={handleCloseMenu}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><PiHandbag className="icn me-2" /> PELUCHE</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="menu">
            <li className="menu__item">
            <a className="menu__link with-arrow" href="/newArrivals">
                            New Arrivals
                        </a>
            </li>
            <li>
            <a className="menu__link with-arrow" href="/Men">
                            Men
                        </a>
            </li>
            <li>
            <a className="menu__link with-arrow" href="/Women">
                            Women
                        </a>
            </li>
            <li>
            <a className="menu__link with-arrow" href="/Kids">
                            Kids
                        </a>
            </li>
          </ul>
        </Offcanvas.Body>
        </Offcanvas>
    </div>
    <div id="searchMobileDiv" className="srchMblDv srchNotActive">
         {articles.length === 0 ? "" 
         :
         searchMobile === "" ? "" :
         searchMobile.length === 1 ?
         articles.map((article,index)=>{
          if(article.name[0].toLowerCase() === searchMobile[0].toLowerCase()){
          return(
            <ArticleCmp key={index} id={article._id} name={article.name} colors={article.colors} price={article.price} />
          )
          }
         })
         : 
         filterAndSortArticles(articles,searchMobile)
         }
    </div>
    </>
  );
}
