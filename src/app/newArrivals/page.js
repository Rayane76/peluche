import CategoriePage from "../components/categoriePage/CategoriePage";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

async function getNewArrivals(){
    const res = await import("../api/product/getLastProducts/route");
  
    const categories = await (await res.GET()).json();
  
    return categories.data;
  }



export default async function newArrivals(){

    const articles = await getNewArrivals();

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
          Home
        </Link>,
        <Typography key="3" color="text.primary">
          New Arrivals
        </Typography>,
      ];


    return(
        <>
             <Stack style={{marginLeft:"10%",marginTop:"20px",marginBottom:"50px",position:"sticky",zIndex:"100",top:"0"}} spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      </Stack>
      <CategoriePage articles={articles} />
        </>
    )
}