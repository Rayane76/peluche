import Image from "next/image"
import "../../../styles/categories.css"



export default function Categories(props){
    return(
        <section className="categoriesSection">
          {props.categories.map((categorie)=>{
            return(
                <div className="categorie">
                <Image src={categorie.image} width={0} height={0} sizes="100vw" className="categorieImage" alt={categorie.name} />
                <h6 className="bottom-left">
                    {categorie.name}
                </h6>
                </div>
            )
          })}
        </section>
    )
}