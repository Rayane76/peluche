'use client'
import Image from "next/image";
import "../../styles/article.css"
import { Col } from "react-bootstrap";
import { MdFavoriteBorder } from "react-icons/md";



export default function ArticleCmp(props){

    return(

        <Col className="products__item col-6 col-md-4">
        <div className="product">

        <div className="product__header">
          <a href={"/articles/" + props.name + "/" + props.id} className="product__imageWrapper">
            <Image src={props.colors[0].images[0]} width={0} height={0} sizes="100vw" className="product__image lazy -loaded" />
        </a>
        </div>


        <div className="product__content1">
            <div className="product__contentHeader">
              <h3 className="product__title h5">{props.name}</h3>
            </div>


            <div className="product__bottom">
            <div className="product__prices">
            <div className="product__priceContent h6">
            <div className="product__item">
            <span className="product__price -actual h4"> {props.price} </span>
            </div>
            </div>
            </div>

            </div>
        </div>

       

        </div>
        </Col>
    )
}