'use client'
import { useState } from "react";
import axios from "axios";
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from "next/navigation";




export default function New({ params }){


    const router = useRouter();
    const gender = params.gender;
    const [categorieNew,setCategorieNew] = useState({
        name: "",
        gender: gender,
        image: "",
    });

    const handleChangeCategorie = (e)=>{
        setCategorieNew((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleSubmitCategorie = async (e)=> {
        e.preventDefault();
        if(categorieNew.name != "" && categorieNew.image != ""){
        const res = await axios.post("/api/categorie/createCategorie",{categorie: categorieNew})
        .then((response)=>{
            if(response.data.success === true){
                router.back();
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    }

    const handleAddImage = (e)=>{
        if(e.event === 'success'){
            setCategorieNew((prev)=>({...prev,image:e.info.secure_url}));
        }
    }



    return(
        <form onSubmit={(e)=>handleSubmitCategorie(e)}>
        <h1>{gender}</h1>
        <label>Enter New Categorie : </label>
        <br></br>
        <label>Name : </label>
        <input name="name" required onChange={(e)=>handleChangeCategorie(e)}></input>
        <br></br>
        <label>Image : </label>
        <CldUploadButton required onSuccess={(e)=>handleAddImage(e)} uploadPreset="jcejqihu" />
        <br></br>
        <button type="submit">Submit</button>
        </form>
    )
}