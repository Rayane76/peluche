import NewArrival from "./components/home/newArrival/NewArrival";
import Image from "next/image";
import "./styles/home.css"
import Categories from "./components/home/categoriesSection/CategoriesSection";



async function getCategories(){
  const res = await import("./api/categorie/getCategoriesNoQuery/route");

  const categories = await (await res.GET()).json();

  return categories.data;
}

async function getNewArrivals(){
    const res = await import("./api/product/getLastProducts/route");
  
    const categories = await (await res.GET()).json();
  
    return categories.data;
  }


export default async function Home() {

  const categories = await getCategories();

  const newArrivals = await getNewArrivals();




  return (
    <>
     <section className="hero">
     <Image src="/home1.png" width={0} height={0} alt="home" sizes="100vw" className="homeImg"></Image>
     </section>
     <Categories categories={categories} />
     <NewArrival newArrivals={newArrivals} />
    </>
  );
}