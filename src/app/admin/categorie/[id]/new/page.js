'use client'
import { useEffect, useState } from 'react';
import ColorAdd from './ColorAdd';



export default function New(){

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

    return(
      <div>
        <h1>Add new article</h1>
        <form>
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
        </form>
      </div>
    )
}