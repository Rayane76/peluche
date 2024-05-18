'use client'
import { useState,useEffect } from "react";
import axios from "axios";
import { CldUploadButton } from 'next-cloudinary';
import ColorAdd from "../../new/ColorAdd";
import isEqual from 'lodash/isEqual';
import { useRouter } from "next/navigation";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { MdDelete } from "react-icons/md";


export default function SpecArticle({ params }){
    
    const categorie = params.id;
    const art = params.articleId;
    const gender = params.gender;
    const router = useRouter();

    const [article,setArticle] = useState(null);

    useEffect(()=>{
        getArticle();
     },[]);


     useEffect(()=>{
        console.log(article);
     },[article])
      
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
        <div style={{width:"100%", padding: "40px",marginTop:"20px" }}>
         {article === null ? "" :
         <div style={{width:"100%",padding:"20px"}}>
         <div style={{marginBottom:"20px",display:"flex",justifyContent:"space-between",width:"100%"}}>
         <Breadcrumbs className="linkSize" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href={"/admin/" + gender}>
          {gender}
        </Link>
        <Link underline="hover" color="inherit" href={"/admin/" + gender + "/categorie/" + categorie}>
          Categorie
        </Link>
        <Typography color="text.primary">Edit Article</Typography>
      </Breadcrumbs>
      <Button onClick={(e)=>handleDeleteArticle(e)} variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
         </div>
         <label className="mb-2">Name : </label>
         <br></br>
         <input style={{width:"100%",height:"40px"}} onChange={(e)=>setArticle((prev)=>({...prev,[e.target.name]:e.target.value}))} name="name" type="text" value={article.name}></input> 
         <br></br>
         <label style={{marginTop:"10px",marginBottom:"10px"}}>Price : </label>
         <br></br>
         <input style={{width:"100%",height:"40px"}} onChange={(e)=>setArticle((prev)=>({...prev,[e.target.name]: parseInt(e.target.value)}))} name="price" type="number" value={article.price}></input>
         <br></br>
         <label className="mt-4">Colors : </label>
         {article.colors.map((color,index)=>{
            return(
                <div key={index} className='border border-dark p-4 w-full mb-2'>
                <div className="mb-4">
                <label className="me-4">Color: </label>
                <input onChange={(e)=>handleChangeColorName(e,color._id)} type="text" name="colorName" value={color.name}></input>
                </div>
                 {color.sizes.map((size,i)=>{
                    return(
                        <div key={i} className='d-flex mb-2'>
                       <label className="me-4">{size.name} : </label>
                       <input onChange={(e)=>handleChangeSize(e,size.name,color._id)} type='number' name={size.name} value={size.stock}></input>
                       </div>       
                    )
                 })}
                 <div style={{display:"flex",gap:"10px",flexWrap:"wrap",height:"auto"}}>
                 {color.images.map((image,j)=>{
                    return(
                        <div key={j} className="d-flex flex-column align-items-center">
                        <img src={image} style={{width:"auto",maxWidth:"150px",height:"100px",marginBottom:"10px"}}></img>
                        <MdDelete style={{cursor:"pointer",height:"30px",width:"30px"}} onClick={(e)=>handleDeleteImage(e,color._id,image)}></MdDelete>
                         </div>
                    )
                 })} 
                 </div>
                 <br></br>
                 <label className="me-2">Add Images : </label>
                 <CldUploadButton className="btn btn-secondary" onSuccess={(e)=>handleAddImage(e,color._id)} uploadPreset="jcejqihu" />
                </div>
            )
         })}
        <button className="btn btn-dark" id="addClrBtn" onClick={()=>handleClickAddColor()}>Add Color</button>
         {addColorClicked && <ColorAdd onValueChange={handleNewColor} />}
        <div style={{display:"flex",width:"100%",justifyContent:"center",marginTop:"50px"}}>
        <button className="btn btn-primary" onClick={(e)=>handleSaveChanges(e)}>Save Changes</button>
        </div>
         </div>
         }
        </div>
    )
}