'use client'
import "../../styles/catPage.css"
import ArticleCmp from "@/app/components/article/ArticleCmp";
import { Container } from "react-bootstrap";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";



export default function CategoriePage(props){


    let availableColors = [];


    props.articles.map((article)=>{
        article.colors.map((color)=>{
            availableColors.push(color.name);
        })
    })

    const uniqueColors = Array.from(new Set(availableColors));



    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
          Home
        </Link>,
        <Link underline="hover" key="1" color="inherit" href={"/" + props.gender}>
          {props.gender}
        </Link>,
        <Typography key="3" color="text.primary">
          {props.name}
        </Typography>,
      ];

      const [selectedColor,setSelectedColor] = useState(undefined);

    return(
        <>
        <div className="newNav">
        <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      </Stack>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={(e)=>setSelectedColor(e.target.innerText)}
      options={uniqueColors}
      className="colorInput"
      renderInput={(params) => <TextField {...params} label="Color" />}
    />
      </div>
        <Container>
        <div>
        <div className="row heroGrid">
         {props.articles.map((article,index)=>{
            if(selectedColor === undefined || selectedColor === "" || (article.colors.some(item => item.name === selectedColor) === true) ){
             return(
                 <ArticleCmp key={index} id={article._id} name={article.name} colors={article.colors} price={article.price} />
             )
            }
         })}
         </div>
         </div>
         
     </Container>
     </>
    )
}