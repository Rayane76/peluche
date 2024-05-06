'use client'

import { useState,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Edit({ params,searchParams }){

    const router = useRouter();

    const id = params.id;

    const name = searchParams.name;

    const handleDelete = async (e)=> {
        const res = await axios.delete(`/api/categorie/deleteCategorie?id=${id}`)
        .then((response)=>{
           if(response.data.success === true){
           router.push("/admin");
           }
           else{
            console.log("error")
           }
        }).catch((err)=>{
            console.log(err);
        })
     }

     const [newName,setNewName] = useState(name);



     const handleSubmitNewName = async (e)=>{
        e.preventDefault();
        if(newName != name && newName != ""){
            const res = await axios.patch(`/api/categorie/updateCategorie?id=${id}&newName=${newName}`)
            .then((response)=>{
               if(response.data.success === true){
               router.push("/admin/categorie/" + id);
               }
               else{
                console.log("error")
               }
            }).catch((err)=>{
                console.log(err);
            })
        }
     }

     const handleModify = (e)=>{
        const input = document.getElementById("categorieName");
        const button = document.getElementById("submitNewBtn")
        input.disabled = false;
        button.disabled = false;
     }


     return(
        <div>
         <label>Categorie Name : </label>
         <form onSubmit={(e)=>handleSubmitNewName(e)}>
         <input onChange={(e)=>setNewName(e.target.value)} id="categorieName" value={newName} disabled></input>
         <button id="submitNewBtn" disabled type="submit">Update</button>
         </form>
         <button onClick={(e)=>handleModify(e)}>Modify Categorie Name</button>
         <button onClick={(e)=>handleDelete(e)}>Delete Categorie</button>
        </div>
     )

}