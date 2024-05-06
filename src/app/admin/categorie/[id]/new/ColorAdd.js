'use client'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CldUploadButton } from 'next-cloudinary';
import { useState } from 'react';



export default function ColorAdd(){
    

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const [customSize,setCustomSize] = useState([]);

    const [sizeEnteredName,setSizeEnteredName] = useState("");

    const handleAddSizeName = (e)=>{
        if(sizeEnteredName != ""){

        const valueExists = customSize.some(obj => Object.values(obj).includes(sizeEnteredName));
        if(!valueExists){    
        setCustomSize((prev)=>([...prev,{name: sizeEnteredName, stock : 0}]))
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


    const [colorImages,setColorImages] = useState([]);

    const [typeSize,setTypeSize] = useState("");

    
    const [color,setColor] = useState({
        name: "",
        sizes: [],
        images: [],
    })



    const handleChangeSizeXs = (e,arr)=>{
        const { name, value } = e.target;
        setXsArr(prevArr => {
            return prevArr.map(size => {
                if (size.name === name) {
                    return { ...size, stock: parseInt(value) };
                }
                return size;
            });
        });
    }

    const handleChangeSizeNum = (e,arr)=>{
        const { name, value } = e.target;
        setNumArr(prevArr => {
            return prevArr.map(size => {
                if (size.name === name) {
                    return { ...size, stock: parseInt(value) };
                }
                return size;
            });
        });
    }

    const handleChangeSizeCpx = (e,arr)=>{
        const { name, value } = e.target;
        setCpxArr(prevArr => {
            return prevArr.map(size => {
                if (size.name === name) {
                    return { ...size, stock: parseInt(value) };
                }
                return size;
            });
        });
    }

    const handleChangeSizeCustom = (e,arr)=>{
        const { name, value } = e.target;
        setCustomSize(prevArr => {
            return prevArr.map(size => {
                if (size.name === name) {
                    return { ...size, stock: parseInt(value) };
                }
                return size;
            });
        });
    }




    return(
        <div className='border border-dark p-4 w-25'>
        <label>Color Name : </label>
        <input onChange={(e)=>setColor((prev)=>({...prev,[e.target.name]:e.target.value}))} type="text" name="color" required></input>
        <br></br>
        <div className='d-flex align-items-center'>
        <label>Color Sizes : </label>
        <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Type</InputLabel>
        <Select
          value={typeSize}
          label="Age"
          onChange={(e)=>setTypeSize(e.target.value)}
        >
          <MenuItem value="xsValues">XS-S-...-XXl</MenuItem>
          <MenuItem value="numberValues">38-...-45</MenuItem>
          <MenuItem value="complexValues">44/6N-...-60/6N</MenuItem>
          <MenuItem value="manually">Add sizes manually</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </div>
    {typeSize != "" && 
      typeSize === "xsValues" ? 
      
      <>
      {xsArr.map((size,index)=>{
        return(
        <div key={index} className='d-flex'>
        <label>{size.name} : </label>
        <input type='number' onChange={(e)=>handleChangeSizeXs(e)} required name={size.name}></input>
      </div>       
        )                         
      })}
      </>
      : typeSize === "numberValues" ?
      <>
      {numArr.map((size,index)=>{
        return(
        <div key={index} className='d-flex'>
        <label>{size.name} : </label>
        <input type='number' onChange={(e)=>handleChangeSizeNum(e)} required name={size.name}></input>
      </div>       
        )                         
      })}
      </>
      : typeSize === "complexValues" ? 
      <>
      {cpxArr.map((size,index)=>{
        return(
        <div key={index} className='d-flex'>
        <label>{size.name} : </label>
        <input type='number' onChange={(e)=>handleChangeSizeCpx(e)} required name={size.name}></input>
      </div>       
        )                         
      })}
      </>
      : typeSize === "manually" ?
      <>
        <div className='d-flex align-items-center'>
        <label>Add size name : </label>
        <input onChange={(e)=>setSizeEnteredName(e.target.value)} value={sizeEnteredName} required type='text'></input>
        <button onClick={(e)=>handleAddSizeName(e)}>+</button>
        </div>
        {customSize.length === 0 ? "" 
        : (
                customSize.map((size, index) => {
                    return(
                    <div key={index} className='d-flex align-items-center'>
                   <label>{size.name} : </label>
                   <input onChange={(e)=>handleChangeSizeCustom(e)} type='number' name={size.name} required></input>
                    </div>
                    )
                })
            )}
      </>
      : ""
    }
        <div>
         <label>Add Images : </label>   
         <CldUploadButton onUploadAdded={(e)=>setColorImages((prev)=>[...prev,e.info.file.name])} uploadPreset="jcejqihu" />        

        </div>
        </div>
    )
}