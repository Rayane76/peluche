'use client'
import { useState } from 'react';
import ColorAdd from './ColorAdd';



export default function New(){

    const [newArticle,setNewArticle] = useState({
        name: "",
        price: null,
        colors: [],
    })

    const [colors,setColors] = ([]);

    const handleNewColor = (color)=>{
         setColors((prev)=>([...prev,color]));
    }

    const [numberOfColors,setNumberOfColors] = useState(1);

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
        {numberOfColors > 1 ? (
                Array.from({ length: numberOfColors }).map((_, index) => (
                    <ColorAdd />
                ))
            ) : (
                <ColorAdd />
            )}
        
        <button onClick={()=>setNumberOfColors((prev)=>prev + 1)}>Add Color</button>
        </form>
      </div>
    )
}