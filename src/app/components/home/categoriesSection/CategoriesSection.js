import Image from "next/image"
import "../../../styles/categories.css"



export default function Categories(props){
    return(
        <section className="categoriesSection">
          {props.categories.map((categorie)=>{
            return(
                <a className="a" href={"/" + categorie.gender + "/" + categorie.name}>
                <div className="categorie">
                <Image src={categorie.image} fill={true} alt={categorie.name} />
                <h6 className="bottom-left">
                    {categorie.name.toUpperCase()}
                </h6>
                </div>
                </a>
            )
          })}
        </section>
    )
}