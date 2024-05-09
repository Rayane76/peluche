'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export default function NewArrival(){

    const [articles,setArticles] = useState(null);

    useEffect(()=>{
        getArticles()
    },[])

    const getArticles = async () => {
        const res = await axios.get("/api/product/getLastProducts");
        console.log(res);
    }

    return(
        <div>

        </div>
    )
}