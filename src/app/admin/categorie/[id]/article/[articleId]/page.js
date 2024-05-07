'use client'
import { useState,useEffect } from "react";
import axios from "axios";



export default function SpecArticle({ params }){
    
    const categorie = params.id;
    const art = params.articleId;

    const [article,setArticle] = useState(null);

    useEffect(()=>{
        getArticle();
     },[]);
 
     const getArticle = async () => {
         const result = await axios.get(`/api/product/getProduct?categorie=${categorie}&article=${art}`);
         setArticle(result.data.data);
         console.log(result.data.data);
     }

    return(
        <div>

        </div>
    )
}