import axios from "axios";
import "../../../../../styles/admin/gender.css"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';



async function getCategorie(id){
  const res = await axios.get(`${process.env.WEBSITE_URL}/api/categorie/getCategorie?id=${id}`)

  return res.data.data;

}

export default async function SpecCategorie({ params }){

    const gender = params.gender;
    const id = params.id;

    const categorie = await getCategorie(id)

    return(
       <div style={{width:"100%", padding: "40px",marginTop:"20px" }}>
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href={"/admin/" + gender}>
          {gender}
        </Link>
        <Typography color="text.primary">{categorie.name}</Typography>
      </Breadcrumbs>
         <div style={{display:"flex",justifyContent:"space-between",marginTop:"20px"}}>
         <a  href={"/admin/" + gender + "/categorie/" + id + "/edit"}>Edit Categorie Informations</a>
         <a href={"/admin/" + gender + "/categorie/" + id + "/new"}>Add Article</a>
         </div>
         {
          categorie.articles.length === 0 ? 
          <div>
          <h2>No Articles yet !</h2>
          </div>
          : 
          <div className="mt-4">
          <div className="allCats">
          {categorie.articles.map((article,index)=>{
            return(
              <a
                  key={index}
                  href={"/admin/" + gender + "/categorie/" + id + "/article/" + article._id}
                >
                  <div className="d-flex flex-column">
                    <img
                      style={{
                        height: "300px",
                        maxWidth: "300px",
                        width: "auto",
                      }}
                      alt="img"
                      src={article.colors[0].images[0]}
                    ></img>
                    <p>{article.name}</p>
                    <p>{article.price}</p>
                  </div>
                </a>
            )
          })
          }
          </div>
          </div>
         }
       </div>
    )
}