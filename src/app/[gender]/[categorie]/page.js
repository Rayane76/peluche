import CategoriePage from "@/app/components/categoriePage/CategoriePage";
import axios from "axios";

async function getCategorie(gender,name){
    const res = await axios.get(`http://localhost:3000/api/categorie/getCategorieByNameAndGender?gender=${gender}&name=${name}`)
  
    return res.data.data;
}


export default async function Categorie({ params }){

    const gender = params.gender;
    const name = params.categorie;

    const articles = await getCategorie(gender,name);


    return(
        <CategoriePage gender={gender} name={name} articles={articles}/>
    )
}