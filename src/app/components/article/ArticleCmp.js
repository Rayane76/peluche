'use client'
import Image from "next/image";
import "../../styles/article.css"
import { Col } from "react-bootstrap";
import { MdFavoriteBorder } from "react-icons/md";



export default function ArticleCmp(props){

    let images = []

    props.colors.map((color)=>{
        color.images.map((image)=>{
          images.push(image);
        })
    })

    return(

        <Col className="products__item col-6 col-md-4">
        <div className="product">

        <div className="product__header">
          <div className="product__quickOperations">
           <div className="products__colorOptions -twoColor">
           <span className="products__itemColor" style={{backgroundColor: "red"}}></span>
           <span className="products__itemColor" style={{backgroundColor: "blue"}}></span>
           </div>
          </div>
          <a href={"/articles/" + props._id} className="product__imageWrapper">
            <div className="product__imageList">

              {images.length > 4 ? 
               <>
               <div className="product__imageItem"></div>
              <Image src={images[0]} width={0} height={0} sizes="100vw" className="product__previewImage -first -loaded"/>

              <div className="product__imageItem"></div>
              <Image src={images[1]} width={0} height={0} sizes="100vw"  className="product__previewImage -first -loaded"/>

              <div className="product__imageItem"></div>
              <Image src={images[2]} width={0} height={0} sizes="100vw"  className="product__previewImage -first -loaded"/>

              <div className="product__imageItem"></div>
              <Image src={images[3]} width={0} height={0} sizes="100vw"  className="product__previewImage -first -loaded"/>
               </>
              :
              <>
              <div className="product__imageItem"></div>
              <Image src={images[0]} width={0} height={0} sizes="100vw"  className="product__previewImage -first -loaded"/>



              <div className="product__imageItem"></div>
              <Image src={images[1]} width={0} height={0} sizes="100vw"  className="product__previewImage  -loaded"/>



              <div className="product__imageItem"></div>
              <Image src={images[0]} width={0} height={0} sizes="100vw"  className="product__previewImage -loaded"/>



              <div className="product__imageItem"></div>
              <Image src={images[1]} width={0} height={0} sizes="100vw"  className="product__previewImage -loaded"/>
              </>
              }


            </div>
            <Image src={images[0]} width={0} height={0} sizes="100vw" className="product__image lazy -loaded" />
        </a>

        <div className="product__sizeContent">
             <div className="product__sizeList">
               {props.colors[0].sizes.map((size,index)=>{
                return(
                  <div className="product__sizeItem">
                   <button disabled className="product__sizeButton">{size.name.toUpperCase()}</button>
                  </div>
                )
               })}
             </div>
        </div>
        </div>


        <div className="product__content">
            <div className="product__contentHeader">
              <h3 className="product__title h5">{props.name}</h3>
            </div>

            <button className="product__action -addFavorite">
            <span className="-spinner" style={{display: "none"}}></span>
            <MdFavoriteBorder style={{height:"16px",width:"16px"}} />
            </button>


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