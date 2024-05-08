'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ColorAdd from './ColorAdd';
import { useRouter } from 'next/navigation';



export default function New({ params }){

    const router = useRouter();

    const id = params.id;

    const [newArticle,setNewArticle] = useState({
        name: "",
        price: null,
        colors: [],
    })

    const handleNewColor = (color)=>{
         setNewArticle((prev)=>({...prev,colors:[...prev.colors,color]}));
    }

    useEffect(()=>{
       console.log(newArticle);
    },[newArticle])


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
      <div>
        <h1>Add new article</h1>
        <form onSubmit={(e)=>handleSubmitArticle(e)}>
        <label>Article name : </label>
        <input onChange={(e)=>setNewArticle((prev)=>({...prev,[e.target.name]:e.target.value}))} type="text" name="name" required></input>
        <label>Article price : </label>
        <input onChange={(e)=>setNewArticle((prev)=>({...prev,[e.target.name]: Number(e.target.value)}))} type="number" name="price" required></input>
        <br></br>
        <label>Colors : </label>
        <ColorAdd onValueChange={handleNewColor} /> 
        {newArticle.colors.length === 0 ? "" :
        newArticle.colors.map((color,index)=>{
            return(
                <div key={index} className='border border-dark p-4 w-25'>
                <label>Color: {color.name}</label>
                 {color.sizes.map((size,i)=>{
                    return(
                        <label key={i}>{size.name} : {size.stock}</label>
                    )
                 })}
                 {color.images.map((image,j)=>{
                    return(
                        <img key={j} src={image} style={{width:"50px",height:"50px"}}></img>
                    )
                 })} 
                </div>
            )
        })
        }
        {newArticle.colors.length > 0 && <button type='submit'>Submit Article</button>}
        </form>
      </div>
    )
}