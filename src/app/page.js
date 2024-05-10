import NewArrival from "./components/home/newArrival/NewArrival";
import Navbar from "./components/navbar/Navbar";
import Image from "next/image";
import "./styles/home.css"
import Categories from "./components/home/categoriesSection/CategoriesSection";



async function getCategories(){
  const res = await import("./api/categorie/getCategoriesNoQuery/route");

  const categories = await (await res.GET()).json();

  return categories.data;
}


export default async function Home() {

  const categories = await getCategories();

  // console.log(categories);


  return (
    <>
     <Navbar allArticles={categories} />
     <section className="hero">
     <Image src="/home1.png" width={0} height={0} alt="home" sizes="100vw" className="homeImg"></Image>
     </section>
     <Categories categories={categories} />
     <NewArrival />
    </>
  );
}
