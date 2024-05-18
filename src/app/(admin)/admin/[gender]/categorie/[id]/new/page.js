'use client'
import { useState } from 'react';
import axios from 'axios';
import ColorAdd from './ColorAdd';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';



export default function New({ params }){

    const router = useRouter();
    const gender = params.gender;
    const id = params.id;

    const [newArticle,setNewArticle] = useState({
        name: "",
        price: null,
        colors: [],
    })

    const handleNewColor = (color)=>{
         setNewArticle((prev)=>({...prev,colors:[...prev.colors,color]}));
    }


    const handleSubmitArticle = async (e) => {
         e.preventDefault();
         if(newArticle.colors.length > 0){
         const res = await axios.post("/api/product/createProduct",{
            id: id,
            newArticle: newArticle
         }).then((res)=>{
            if(res.data.success === true){
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
         <div style={{marginBottom:"30px"}}>
         <Breadcrumbs className="linkSize" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href={"/admin/" + gender}>
          {gender}
        </Link>
        <Link underline="hover" color="inherit" href={"/admin/" + gender + "/categorie/" + id}>
          Categorie
        </Link>
        <Typography color="text.primary">New Article</Typography>
      </Breadcrumbs>
      </div>
        <form style={{minHeight:"150vh",height:"auto",position:"relative"}} onSubmit={(e)=>handleSubmitArticle(e)}>
        <label style={{marginBottom:"15px"}}>Article name : </label>
        <br></br>
        <input style={{width:"100%",height:"40px"}} onChange={(e)=>setNewArticle((prev)=>({...prev,[e.target.name]:e.target.value}))} type="text" name="name" required></input>
        <br></br>
        <label style={{marginTop:"30px",marginBottom:"30px"}}>Article price : </label>
        <br></br>
        <input style={{width:"100%",height:"40px"}} onChange={(e)=>setNewArticle((prev)=>({...prev,[e.target.name]: Number(e.target.value)}))} type="number" name="price" required></input>
        <br></br>
        <br></br>
        <label>Colors : </label>
        {newArticle.colors.length === 0 ? "" :
        newArticle.colors.map((color,index)=>{
            return(
                <div key={index} className='border border-dark p-4 w-full mb-2'>
                <label>Color: {color.name}</label>
                <br></br>
                <br></br>
                <label>Sizes: </label>
                <br></br>
                 {color.sizes.map((size,i)=>{
                    return(
                        <>
                        <label key={i}>{size.name} : {size.stock}</label>
                        <br></br>
                        </>
                    )
                 })}
                 <br></br>
                 <label>images :</label>
                 <br></br>
                 <div className='d-flex gap-4'>
                 {color.images.map((image,j)=>{
                    return(
                        <img key={j} src={image} style={{width:"auto",maxWidth:"150px",height:"100px"}}></img>
                    )
                 })} 
                 </div>
                </div>
            )
        })
        }
        <ColorAdd onValueChange={handleNewColor} />
       
         <div style={{display:"flex",justifyContent:"center",width:"100%",alignItems:"center",marginTop:"50px"}}>
        {newArticle.colors.length > 0 && <button className='btn btn-primary' type='submit'>Submit Article</button>}
        </div>
        </form>
      </div>
    )
}