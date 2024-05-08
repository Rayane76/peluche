'use client'

import { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function SpecCategorie({ params }){

    const router = useRouter();

    const gender = params.gender;
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
          <Link  href={"/admin/" + gender + "/categorie/" + id + "/edit"}>Edit Categorie Informations</Link>
         <button onClick={()=>router.push("/admin/" + gender + "/categorie/" + id + "/new")}>Add Article</button>
          </div>
          : 
          <div>
          {categorie.articles.map((article)=>{
            return(
                <div>
                  <a href={"/admin/" + gender + "/categorie/" + id + "/article/" + article._id}>{article.name}</a>
                </div>
            )
          })
          }
          <Link  href={"/admin/" + gender + "/categorie/" + id + "/edit"}>Edit Categorie Informations</Link>
         <button onClick={()=>router.push("/admin/" + gender + "/categorie/" + id + "/new")}>Add Article</button>
          </div>
         }
       </div>
    )
}