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
        
        <div className='border border-dark p-4 w-25'>
        <label>Color Name : </label>
        <input onChange={(e)=>setColor((prev)=>({...prev,[e.target.name]:e.target.value}))} value={color.name} type="text" name="name"></input>
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
    {   typeSize !== "manually" ? 
        
    <>
      {color.sizes.map((size,index)=>{
        return(
        <div key={index} className='d-flex'>
        <label>{size.name} : </label>
        <input type='number' onChange={(e)=>handleChangeSize(e,size.name)} name={size.name}></input>
      </div>       
        )                         
      })}
      </>
        
      :
      typeSize === "manually" ?
      <>
        <div className='d-flex align-items-center'>
        <label>Add size name : </label>
        <input onChange={(e)=>setSizeEnteredName(e.target.value)} value={sizeEnteredName} type='text'></input>
        <button onClick={(e)=>handleAddSizeName(e)}>+</button>
        </div>
        {color.sizes.length === 0 ? "" 
        : (
                color.sizes.map((size, index) => {
                    return(
                    <div key={index} className='d-flex align-items-center'>
                   <label>{size.name} : </label>
                   <input onChange={(e)=>handleChangeSize(e,size.name)} type='number' name={size.name}></input>
                    </div>
                    )
                })
            )}
      </>
      : ""
    }
        <div>
         <label>Add Images : </label>   
         <CldUploadButton onSuccess={(e)=>handleSuccess(e)} uploadPreset="jcejqihu" />        

        </div>
        <button onClick={(e)=>handleSubmitColor(e)}>Submit Color</button>
        </div>
    )
}