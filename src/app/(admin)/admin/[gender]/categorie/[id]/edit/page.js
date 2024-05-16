'use client'

import { useState,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CldUploadButton } from 'next-cloudinary';


export default function Edit({ params }){

    const router = useRouter();

    const id = params.id;

    
    const [categorie,setCategorie] = useState(null);

    const [initialCategorie,setInitialCategorie] = useState(null);

    useEffect(()=>{
        getCategoriee();
     },[]);
 
     const getCategoriee = async () => {
         const result = await axios.get(`/api/categorie/getCategorieName?id=${id}`);
         setCategorie(result.data.data);
         setInitialCategorie(result.data.data);
     }

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

     const [newName,setNewName] = useState("");



   //   const handleSubmitNewName = async (e)=>{
   //      e.preventDefault();
   //      if(newName != name && newName != ""){
   //          const res = await axios.patch(`/api/categorie/updateCategorie?id=${id}&newName=${newName}`)
   //          .then((response)=>{
   //             if(response.data.success === true){
   //             router.push("/admin/categorie/" + id);
   //             }
   //             else{
   //              console.log("error")
   //             }
   //          }).catch((err)=>{
   //              console.log(err);
   //          })
   //      }
   //   }

     const handleAddImage = (e)=>{
      if(e.event === 'success'){
          setCategorie((prev)=>({...prev,image:e.info.secure_url}));
      }
  }

  const handleSumbit = async (e)=>{
    e.preventDefault();
    if(categorie.name != initialCategorie.name || categorie.image != initialCategorie.image){
                  const res = await axios.patch(`/api/categorie/updateCategorie?id=${id}&newName=${categorie.name}&newImage=${categorie.image}`)
            .then((response)=>{
               if(response.data.success === true){
               router.back();
               }
               else{
                console.log("error")
               }
            }).catch((err)=>{
                console.log(err);
            })
    }
  }




     return(
        <div>
         {categorie === null ? "" :
         <>
         
         <form onSubmit={(e)=>handleSumbit(e)}>
         <label>Categorie Name : </label>
         <input onChange={(e)=>setCategorie((prev)=>({...prev,name:e.target.value}))} value={categorie.name} id="categorieName"></input>
         <br></br>
         <label>Categorie Image : </label>
         <img src={categorie.image} style={{width:"100px",width:"100px"}}></img>
         <br></br>
         <label>Change Image : </label>
         <CldUploadButton onSuccess={(e)=>handleAddImage(e)} uploadPreset="jcejqihu" />   
         <br></br>
         <button id="submitNewBtn" type="submit">Update</button>
         </form>
         <button onClick={(e)=>handleDelete(e)}>Delete Categorie</button>
         </>
         }
        </div>
     )

}