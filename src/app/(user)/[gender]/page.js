import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import "../../styles/categories.css"
import Image from 'next/image';


async function getCategories(gender){
    const res = await axios.get(`http://localhost:3000/api/categorie/getAllCategoriesName?gender=${gender}`)
  
    return res.data.data;

}


export default async function Gender({ params }){

    const gender = params.gender;

    const categories = await getCategories(gender);


    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
          Home
        </Link>,
        <Typography key="3" color="text.primary">
          {gender}
        </Typography>,
      ];


    return(
        <section>
             <Stack style={{marginLeft:"10%",marginTop:"20px",marginBottom:"50px",position:"sticky",zIndex:"100",top:"0"}} spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      </Stack>
      <div className='categoriesSection'>
        {categories.map((categorie)=>{
            return(
                <a className="a" href={"/" + gender + "/" + categorie.name}>
                <div className="categorie">
                <Image src={categorie.image} fill={true} alt={categorie.name} />
                <h6 className="bottom-left">
                    {categorie.name.toUpperCase()}
                </h6>
                </div>
                </a>
            )
        })}
        </div>
      


        </section>
    )
}