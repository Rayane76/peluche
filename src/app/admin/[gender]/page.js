'use client'
import { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";



export default function Gender({ params }){



   const gender = params.gender;
   console.log(gender);


   const [categories,setCategories] = useState(null);

   useEffect(()=>{
       getCategories();
    },[]);

    const getCategories = async () => {
        const result = await axios.get(`/api/categorie/getAllCategoriesName?gender=${gender}`);
        console.log(result.data.data);
        setCategories(result.data.data);
    }


   return(
    <div>
    <h1>{gender}</h1>
    {categories === null ? "" : 
      categories.length === 0 ? <h1>No Categories Yet ! </h1> :
            <div>
            <h3>Categories : </h3>
            {categories.map((categorie,index)=>{
                return(
                    <a key={index} href={"/admin/" + gender + "/categorie/" + categorie._id}>{categorie.name}</a>
                )
            })}
            </div>
            }

            <Link href={"/admin/" + gender + "/new"}>Add new categorie</Link>
    </div>
   )

}