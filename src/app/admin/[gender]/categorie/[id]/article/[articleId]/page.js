'use client'
import { useState,useEffect } from "react";
import axios from "axios";
import { CldUploadButton } from 'next-cloudinary';
import ColorAdd from "../../new/ColorAdd";
import isEqual from 'lodash/isEqual';
import { useRouter } from "next/navigation";



export default function SpecArticle({ params }){
    
    const categorie = params.id;
    const art = params.articleId;
    const router = useRouter();

    const [article,setArticle] = useState(null);

    useEffect(()=>{
        getArticle();
     },[]);


    //  useEffect(()=>{
    //     console.log(article);
    //  },[article])
      
     const [initialArticle,setInitialArticle] = useState(null);
    
     const getArticle = async () => {
         const result = await axios.get(`/api/product/getProduct?categorie=${categorie}&article=${art}`);
         setArticle(result.data.data);
         setInitialArticle(result.data.data);
     }

     const [addColorClicked,setAddColorClicked] = useState(false);

     const handleChangeSize = (e, sizeName, id) => {
        const { value } = e.target;
        setArticle(prevState => ({
            ...prevState,
            colors: prevState.colors.map(color => {
                if (color._id === id) {
                    return {
                        ...color,
                        sizes: color.sizes.map(size => {
                            if (size.name === sizeName) {
                                return { ...size, stock: parseInt(value) };
                            }
                            return size;
                        })
                    };
                }
                return color;
            })
        }));
    };

    const handleChangeColorName = (e, id) => {
        const { value } = e.target;
        setArticle(prevState => ({
            ...prevState,
            colors: prevState.colors.map(color => {
                if (color._id === id) {
                    return { ...color, name: value };
                }
                return color;
            })
        }));
    };

    const handleDeleteImage = (e,id, imageName) => {
        setArticle(prevState => ({
            ...prevState,
            colors: prevState.colors.map(color => {
                if (color._id === id) {
                    return {
                        ...color,
                        images: color.images.filter(image => image !== imageName)
                    };
                }
                return color;
            })
        }));
    };

    const handleAddImage = (e,id) => {
        if(e.event === "success"){
            setArticle(prevState => ({
                ...prevState,
                colors: prevState.colors.map(color => {
                    if (color._id === id) {
                        return {
                            ...color,
                            images: [...color.images, e.info.secure_url]
                        };
                    }
                    return color;
                })
            }));
        }
    };

    const handleNewColor = (color)=>{
        setArticle((prev)=>({...prev,colors:[...prev.colors,color]}));
   }

   const handleClickAddColor = () =>{
    setAddColorClicked(true);
    const addClrBtn = document.getElementById("addClrBtn");
    addClrBtn.style.display = 'none'
   }

   const handleSaveChanges = async (e) => {
    const areEqual = isEqual(article, initialArticle);
    if(areEqual === false){
        const res = await axios.post("/api/product/updateProduct",{id: categorie , article: article})
        .then((res)=>{
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
     
   const handleDeleteArticle = async (e)=>{
    const res = await axios.delete(`/api/product/deleteProduct?categorie=${categorie}&article=${art}`)
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

    return(
        <div>
         {article === null ? "" :
         <div>
         <div className="d-flex align-items-center">
         <h1>Name : </h1>
         <input onChange={(e)=>setArticle((prev)=>({...prev,[e.target.name]:e.target.value}))} name="name" type="text" value={article.name}></input>
         </div>
         <div className="d-flex align-items-center">
         <h3>Price : </h3>
         <input onChange={(e)=>setArticle((prev)=>({...prev,[e.target.name]: parseInt(e.target.value)}))} name="price" type="number" value={article.price}></input>
         </div>
         

         <h3>Colors : </h3>
         {article.colors.map((color,index)=>{
            return(
                <div key={index} className='border border-dark p-4 w-25'>
                <div>
                <label>Color: </label>
                <input onChange={(e)=>handleChangeColorName(e,color._id)} type="text" name="colorName" value={color.name}></input>
                </div>
                 {color.sizes.map((size,i)=>{
                    return(
                        <div key={i} className='d-flex'>
                       <label>{size.name} : </label>
                       <input onChange={(e)=>handleChangeSize(e,size.name,color._id)} type='number' name={size.name} value={size.stock}></input>
                       </div>       
                    )
                 })}
                 {color.images.map((image,j)=>{
                    return(
                        <div key={j} className="d-flex flex-column">
                        <img src={image} style={{width:"50px",height:"50px"}}></img>
                        <button onClick={(e)=>handleDeleteImage(e,color._id,image)} className="deleteBtn w-25">Delete Image</button>
                        </div>
                    )
                 })} 
                 <CldUploadButton onSuccess={(e)=>handleAddImage(e,color._id)} uploadPreset="jcejqihu" />
                </div>
            )
         })}
        <button id="addClrBtn" onClick={()=>handleClickAddColor()}>Add Color</button>
         {addColorClicked && <ColorAdd onValueChange={handleNewColor} />}

        <button onClick={(e)=>handleSaveChanges(e)}>Save Changes</button>
        <button onClick={(e)=>handleDeleteArticle(e)}>Delete Article</button>
         </div>
         }
        </div>
    )
}