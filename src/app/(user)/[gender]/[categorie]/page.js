import CategoriePage from "@/app/components/categoriePage/CategoriePage";


export async function generateMetadata({ params }){
  return {
    title: params.gender + " " + params.categorie
  }
}

async function getCategorie(gender,name){
    const res = await fetch(`http://localhost:3000/api/categorie/getCategorieByNameAndGender?gender=${gender}&name=${name}`)

    return res.json();
}


export default async function Categorie({ params }){

    const gender = params.gender;
    const name = params.categorie;

    const articles = await getCategorie(gender,name);

    return(
         <CategoriePage gender={gender} name={name} articles={articles.data}/>
        
    )
}