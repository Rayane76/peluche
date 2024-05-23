import axios from "axios";
import "../../../styles/admin/gender.css";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

async function getCategories(gender) {
  const res = await axios.get(
    `${process.env.WEBSITE_URL}/api/categorie/getAllCategoriesName?gender=${gender}`
  );

  return res.data.data;
}

export default async function Gender({ params }) {
  const gender = params.gender;

  const categories = await getCategories(gender);

  return (
    <div style={{ width: "100%", padding: "40px",marginTop:"20px" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Dashboard
        </Link>
        <Typography color="text.primary">{gender}</Typography>
      </Breadcrumbs>
      <div style={{ display: "flex", justifyContent: "space-between" , marginBottom:"30px",marginTop:"10px" }}>
        <h3>Categories : </h3>
        <a href={"/admin/" + gender + "/new"}>Add new categorie</a>
      </div>
      {categories.length === 0 ? (
        <h1>No Categories Yet ! </h1>
      ) : (
        <div>
          <div className="allCats">
            {categories.map((categorie, index) => {
              return (
                <a
                  key={index}
                  href={"/admin/" + gender + "/categorie/" + categorie._id}
                >
                  <div className="d-flex flex-column">
                    <img
                      style={{
                        height: "300px",
                        maxWidth: "300px",
                        width: "auto",
                      }}
                      alt="img"
                      src={categorie.image}
                    ></img>
                    <p>{categorie.name}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
