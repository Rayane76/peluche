'use client'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CldUploadButton } from 'next-cloudinary';
import { useEffect, useState } from 'react';



export default function ColorAdd({ onValueChange }){

    const [color,setColor] = useState({
        name: "",
        sizes: [],
        images: [],
    })

    const [typeSize,setTypeSize] = useState("");

    const handleTypeSize = (e)=>{
        setTypeSize(e.target.value);
        if(e.target.value === "xsValues"){
            setColor((prev)=>({...prev,sizes:xsArr}));
        }
        else if(e.target.value === "numberValues"){
            setColor((prev)=>({...prev,sizes:numArr}));
        }
        else if(e.target.value === "complexValues"){
            setColor((prev)=>({...prev,sizes:cpxArr}));
        }
        else if(e.target.value === "manually"){
            setColor((prev)=>({...prev,sizes:[]}));
        }
    }

    const [sizeEnteredName,setSizeEnteredName] = useState("");

    const handleAddSizeName = (e)=>{
        if(sizeEnteredName != ""){

        const valueExists = color.sizes.some(obj => Object.values(obj).includes(sizeEnteredName));
        if(!valueExists){    
        setColor(prevState => ({
            ...prevState,
            sizes: [...prevState.sizes, { name: sizeEnteredName, stock: 0 }]
        }));
        
        }
        setSizeEnteredName("");
    }
}


    const [xsArr,setXsArr] = useState([
    {
     name: "xs",
     stock: 0
    }
    ,
    {
        name: "s",
        stock: 0
    }
    ,
    {
        name: "m",
     stock: 0
    }
    ,
    {
        name: "l",
        stock: 0
    }
    ,
    {
        name: "xl",
        stock: 0
    }
    ,
    {
        name: "xxl",
     stock: 0
    }
])



    const [cpxArr,setCpxArr] = useState([
        {
            name: "size44/6N",
            stock: 0
        }
        ,
        {
            name: "size46/6N",
            stock: 0
        }
        ,
        {
            name: "size48/6N",
            stock: 0
        }
        ,
        {
            name:  "size50/6N",
            stock: 0
        }
        ,
        {
            name: "size52/6N",
            stock: 0
        }
        ,
        {
            name: "size54/6N",
            stock: 0
        }
        ,
        {
            name: "size56/6N",
            stock: 0
        }
        ,
        {
            name: "size58/6N",
            stock: 0
        }
        ,
        {
            name: "size60/6N",
            stock: 0
        }
    ])


    const [numArr,setNumArr] = useState([
        {
            name: "size38",
            stock: 0
        }
        ,
        {
            name: "size39",
            stock: 0
        }
        ,
        {
            name: "size40",
            stock: 0
        }
        ,
        {
            name: "size41",
            stock: 0
        }
        ,
        {
            name: "size42",
            stock: 0
        }
        ,
        {
            name: "size43",
            stock: 0
        }
        ,
        {
            name: "size44",
            stock: 0
        }
        ,
        {
            name: "size45",
            stock: 0
        }
    ])

    const handleChangeSize = (e, sizeName) => {
        const { value } = e.target;
        setColor(prevState => {
            return {
                ...prevState,
                sizes: prevState.sizes.map(size => {
                    if (size.name === sizeName) {
                        return { ...size, stock: parseInt(value) };
                    }
                    return size;
                })
            };
        });
    };


    
    const handleSuccess = (e) => {
        if(e.event === "success"){
            setColor((prev)=>({...prev,images:[...prev.images,e.info.secure_url]}));
        }
    }

    const handleSubmitColor = (e) => {
        e.preventDefault();
        if(color.name != "" && color.sizes.length > 0 && color.images.length > 0){
            onValueChange(color);
            setColor({
                name: "",
                sizes: [],
                images: []
            });
            setTypeSize("");
        }
    }

    return(
        
        <div className='border border-dark p-4 w-full'>
        <label style={{marginBottom:"10px"}}>Color Name : </label>
        <input style={{width:"100%",height:"40px"}} onChange={(e)=>setColor((prev)=>({...prev,[e.target.name]:e.target.value}))} value={color.name} type="text" name="name"></input>
        <p style={{margin:"0"}}>Please choose a name that exists in this link and write it exactly the same as it is in the website : <a target='blank' href='https://developer.mozilla.org/en-US/docs/Web/CSS/named-color'>Color names</a></p>

        <br></br>
        <div className='d-flex align-items-center'>
        <label>Color Sizes : </label>
        <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Type</InputLabel>
        <Select
          value={typeSize}
          label="Age"
          onChange={(e)=>handleTypeSize(e)}
        >
          <MenuItem value="xsValues">XS-S-...-XXl</MenuItem>
          <MenuItem value="numberValues">38-...-45</MenuItem>
          <MenuItem value="complexValues">44/6N-...-60/6N</MenuItem>
          <MenuItem value="manually">Add sizes manually</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </div>
    <br></br>
    {   typeSize !== "manually" ? 
        
    <>
      {color.sizes.map((size,index)=>{
        return(
        <div key={index} className='d-flex mb-4'>
        <label className='me-4'>{size.name} : </label>
        <input style={{width:"125px"}} type='number' onChange={(e)=>handleChangeSize(e,size.name)} name={size.name}></input>
      </div>       
        )                         
      })}
      </>
        
      :
      typeSize === "manually" ?
      <>
        <div className='d-flex align-items-center mb-4'>
        <label className='me-2'>Add size name : </label>
        <input className='me-2' onChange={(e)=>setSizeEnteredName(e.target.value)} value={sizeEnteredName} type='text'></input>
        <button className='btn btn-success' onClick={(e)=>handleAddSizeName(e)}>+</button>
        </div>
        {color.sizes.length === 0 ? "" 
        : (
                color.sizes.map((size, index) => {
                    return(
                    <div key={index} className='d-flex align-items-center mb-4'>
                   <label className='me-4'>{size.name} : </label>
                   <input onChange={(e)=>handleChangeSize(e,size.name)} type='number' name={size.name}></input>
                    </div>
                    )
                })
            )}
      </>
      : ""
    }
        <div>
         <label className='me-2'>Add Images : </label>   
         <CldUploadButton className='btn btn-secondary' onSuccess={(e)=>handleSuccess(e)} uploadPreset="jcejqihu" />        

        </div>
        {color.images.length > 0 && 
        <div className='d-flex gap-4'>
           {color.images.map((image,index)=>{
            return(
                <img key={index} style={{height:"100px",width:"auto",maxWidth:"150px"}} src={image}></img>
            )
           })}
        </div>
        }
        <div className='d-flex justify-content-center mt-4'>
        <button className='btn btn-dark' onClick={(e)=>handleSubmitColor(e)}>Submit Color</button>
        </div>
        </div>
    )
}