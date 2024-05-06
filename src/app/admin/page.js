'use client'

import { useState,useEffect } from "react"
import axios from "axios";






export default function Admin(){

    const [categories,setCategories] = useState(null);

    useEffect(()=>{
        getCategories();
     },[]);
 
     const getCategories = async () => {
         const result = await axios.get("/api/categorie/getAllCategories");
         console.log(result.data.data);
         setCategories(result.data.data);
     }

    const [categorieNew,setCategorieNew] = useState("");

    const handleChangeCategorie = (e)=>{
        setCategorieNew(e.target.value);
    }

    const handleSubmitCategorie = async (e)=> {
        e.preventDefault();
        const res = await axios.post("/api/categorie/createCategorie",{categorie: categorieNew})
        .then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    }


    return(
        <div>
            <h1>Admin</h1>
             <form onSubmit={(e)=>handleSubmitCategorie(e)}>
            <label>Enter New Categorie : </label>
            <input required onChange={(e)=>handleChangeCategorie(e)}></input>
            <button type="submit">Submit</button>
            </form>

            {categories === null ? "" : 
            <div>
            <h3>Categories : </h3>
            {categories.map((categorie,index)=>{
                return(
                    <a key={index} href={"/admin/categorie/" + categorie._id}>{categorie.name}</a>
                )
            })}
            </div>
            }
        </div>
    )
}