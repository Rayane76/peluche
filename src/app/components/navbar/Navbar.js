'use client'
import "../../styles/navbar/navbar.css";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiMenuAlt2 } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { PiHandbag } from "react-icons/pi";
import Autocomplete from '@mui/material/Autocomplete';
import Image from "next/image";

export default function Navbar(props) {

    let articles = [];
     props.allArticles.map((categorie)=>{
        categorie.articles.map((article)=>{
            articles.push({gender: categorie.gender , categorie: categorie.name, name: article. name,image: article.colors[0].images[0], price: article.price, id: article._id});
        })
     })
    


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
                  <MdFavoriteBorder />
                  </a>
                  <a href="/cart" className="new-header__link -cart">
                  <PiHandbag />
                  </a>
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
    </div>
  );
}
