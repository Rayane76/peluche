import OneArticle from "@/app/components/oneArticlePage/OneArticle";
import axios from "axios";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography } from "@mui/material";
import Link from '@mui/material/Link';
import "../../styles/catPage.css"
import Stack from '@mui/material/Stack';



async function getArticle(id){
   const article = await axios.get(`http://localhost:3000/api/product/getProduct?article=${id}`)

   return article.data.data;
}


export default async function Article({ params }){

    const id = params.id;

    const article = await getArticle(id);

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
          Home
        </Link>,
        <Typography key="3" color="text.primary">
          {article.name}
        </Typography>,
      ];

    return(
        <>
         <div className="newNav">
        <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      </Stack>
      </div>
        <OneArticle article={article} />
        </>
    )
}