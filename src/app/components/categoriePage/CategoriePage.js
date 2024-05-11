'use client'
import "../../styles/catPage.css"
import ArticleCmp from "@/app/components/article/ArticleCmp";
import { Container } from "react-bootstrap";



export default function CategoriePage(props){

    return(
        <Container>
        <div>
        <div className="row heroGrid">
         {props.articles.map((article)=>{
             return(
                 <ArticleCmp id={article._id} name={article.name} colors={article.colors} price={article.price} />
             )
         })}
         </div>
         </div>
         
     </Container>
    )
}