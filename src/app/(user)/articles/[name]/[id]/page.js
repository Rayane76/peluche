import OneArticle from "@/app/components/oneArticlePage/OneArticle";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography } from "@mui/material";
import Link from '@mui/material/Link';
import "../../../../styles/catPage.css"
import Stack from '@mui/material/Stack';

export async function generateMetadata({ params }){
  const article = await fetch(`http://localhost:3000/api/product/getProduct?article=${params.id}`)

  const res = await article.json();

  return {
    title: res.data.name
  }
}



async function getArticle(id){
   const article = await fetch(`http://localhost:3000/api/product/getProduct?article=${id}`)

   return article.json();
}


export default async function Article({ params }){

    const id = params.id;

    const article = await getArticle(id);

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
          Home
        </Link>,
        <Typography key="3" color="text.primary">
          {article.data.name}
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
        <OneArticle article={article.data} id={id} />
        </>
    )
}