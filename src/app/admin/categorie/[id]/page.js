'use client'

import { useState,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function SpecCategorie({ params }){

    const router = useRouter();

    const id = params.id;

    const [categorie,setCategorie] = useState(null);

    useEffect(()=>{
        getCategoriee();
     },[]);
 
     const getCategoriee = async () => {
         const result = await axios.get(`/api/categorie/getCategorie?id=${id}`);
         setCategorie(result.data.data);
     }

    return(
       <div>
         {categorie === null ? "" :
          categorie.articles.length === 0 ? 
          <div>
          <h1>{categorie.name}</h1>
          <h2>No Articles yet !</h2>
          <Link  href={{
            pathname: "/admin/categorie/" + id + "/edit",
            query: { name: categorie.name },
          }}>Edit Categorie Informations</Link>
         <button onClick={()=>handleAdd}>Add Article</button>
          </div>
          : 
          <div>
          {categorie.articles.map((article)=>{
            return(
                <div>
                  <a href={"/admin/categorie/" + id + "/article/" + article._id}>{article.name}</a>
                </div>
            )
          })
          }
          <Link  href={{
            pathname: "/admin/categorie/" + id + "/edit",
            query: { name:  categorie.name},
          }}>Edit Categorie Informations</Link>
         <button onClick={()=>handleAdd}>Add Article</button>
          </div>
         }
       </div>
    )
}