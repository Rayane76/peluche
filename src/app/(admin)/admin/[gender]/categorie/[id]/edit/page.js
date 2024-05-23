'use client'

import { useState,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CldUploadButton } from 'next-cloudinary';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../../../../../styles/admin/gender.css"


export default function Edit({ params }){

    const router = useRouter();
    const gender = params.gender;
    const id = params.id;

    
    const [categorie,setCategorie] = useState(null);

    const [initialCategorie,setInitialCategorie] = useState(null);

    useEffect(()=>{
        getCategoriee();
     },[]);
 
     const getCategoriee = async () => {
         const result = await axios.get(`${process.env.WEBSITE_URL}/api/categorie/getCategorieName?id=${id}`);
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
        <div style={{width:"100%", padding: "40px",marginTop:"20px" }}>
         {categorie === null ? "" :
         <>
         <div className="dv">
         <Breadcrumbs className="linkSize" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href={"/admin/" + gender}>
          {gender}
        </Link>
        <Link underline="hover" color="inherit" href={"/admin/" + gender + "/categorie/" + id}>
          {categorie.name}
        </Link>
        <Typography color="text.primary">Edit</Typography>
      </Breadcrumbs>
      <Button onClick={(e)=>handleDelete(e)} variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      </div>
         <form style={{marginTop:"40px",minHeight:"80vh",height:"auto",position:"relative"}} onSubmit={(e)=>handleSumbit(e)}>
         <label style={{marginBottom:"15px"}}>Categorie Name : </label>
         <br></br>
         <input style={{width:"100%",height:"30px",marginBottom:"40px"}} onChange={(e)=>setCategorie((prev)=>({...prev,name:e.target.value}))} value={categorie.name} id="categorieName"></input>
         <br></br>
         <label style={{marginBottom:"10px"}}>Categorie Image : </label>
         <br></br>
         <img src={categorie.image} style={{height:"200px",width:"auto",maxWidth:"200px"}}></img>
         <br></br>
         <label style={{marginTop:"20px",marginRight:"10px"}}>Change Image : </label>
         <CldUploadButton className="btn btn-secondary" onSuccess={(e)=>handleAddImage(e)} uploadPreset="jcejqihu" />   
         <br></br>
         <div style={{position:"absolute",bottom:"10px",display:"flex",justifyContent:"center",width:"100%"}}>
         <Button variant="contained" id="submitNewBtn" type="submit">Update</Button>
         </div>
         </form>
         {/* <button onClick={(e)=>handleDelete(e)}>Delete Categorie</button> */}
         </>
         }
        </div>
     )

}