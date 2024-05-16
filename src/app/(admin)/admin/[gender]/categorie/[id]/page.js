import axios from "axios";
import Link from "next/link";



async function getCategorie(id){
  const res = await axios.get(`http://localhost:3000/api/categorie/getCategorie?id=${id}`)

  return res.data.data;

}

export default async function SpecCategorie({ params }){

    const gender = params.gender;
    const id = params.id;

    const categorie = await getCategorie(id)

    return(
       <div>
         {
          categorie.articles.length === 0 ? 
          <div>
          <h1>{categorie.name}</h1>
          <h2>No Articles yet !</h2>
          <Link  href={"/admin/" + gender + "/categorie/" + id + "/edit"}>Edit Categorie Informations</Link>
         <Link href={"/admin/" + gender + "/categorie/" + id + "/new"}>Add Article</Link>
          </div>
          : 
          <div>
          {categorie.articles.map((article)=>{
            return(
                <div>
                  <a href={"/admin/" + gender + "/categorie/" + id + "/article/" + article._id}>{article.name}</a>
                </div>
            )
          })
          }
          <Link  href={"/admin/" + gender + "/categorie/" + id + "/edit"}>Edit Categorie Informations</Link>
          <Link href={"/admin/" + gender + "/categorie/" + id + "/new"}>Add Article</Link>
          </div>
         }
       </div>
    )
}