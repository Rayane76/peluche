import axios from "axios";
import Link from "next/link";



async function getCategories(gender){
    const res = await axios.get(`http://localhost:3000/api/categorie/getAllCategoriesName?gender=${gender}`)
  
    return res.data.data;

}


export default async function Gender({ params }){



   const gender = params.gender;

   const categories = await getCategories(gender);


   return(
    <div>
    <h1>{gender}</h1>
    {
      categories.length === 0 ? <h1>No Categories Yet ! </h1> :
            <div>
            <h3>Categories : </h3>
            {categories.map((categorie,index)=>{
                return(
                    <a key={index} href={"/admin/" + gender + "/categorie/" + categorie._id}>{categorie.name}</a>
                )
            })}
            </div>
            }

            <Link href={"/admin/" + gender + "/new"}>Add new categorie</Link>
    </div>
   )

}