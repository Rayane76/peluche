'use client'
import { useState, useEffect } from "react"
import { Container } from "react-bootstrap";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import "../../styles/catPage.css"
import Image from "next/image";
import "../../styles/article.css"
import { Col } from "react-bootstrap";



export default function Favourites(){


    const [articles,setArticles] = useState(null);

    useEffect(() => {
        const storedFav = JSON.parse(localStorage.getItem('fav')) || [];
        setArticles(storedFav);
      }, []);


      const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
          Home
        </Link>,
        <Typography key="3" color="text.primary">
          Favourites
        </Typography>,
      ];


    return(
        <>
        <div className="newNav">
        <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      </Stack>
      </div>
      <Container style={{minHeight:"50vh"}}>
        <div>
        <div className="row heroGrid">
        {articles === null ? "" : 
        articles.length === 0 ?
        "No Articles"
        :
        articles.map((article,index)=>{
            return(
                <Col className="products__item col-6 col-md-4">
        <div className="product">

        <div className="product__header">
          <a href={"/articles/" + article.name + "/" + article.id} className="product__imageWrapper">
            <Image src={article.image} width={0} height={0} sizes="100vw" className="product__image lazy -loaded" />
        </a>
        </div>


        <div className="product__content">
            <div className="product__contentHeader">
              <h3 className="product__title h5">{article.name}</h3>
            </div>


            <div className="product__bottom">
            <div className="product__prices">
            <div className="product__priceContent h6">
            <div className="product__item">
            <span className="product__price -actual h4"> {article.price} </span>
            </div>
            </div>
            </div>

            </div>
        </div>

       

        </div>
        </Col>
            )
        })
        }
       
 
        </div>
         </div>

         </Container>



        </>
    )
}