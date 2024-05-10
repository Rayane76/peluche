import NewArrival from "./components/home/newArrival/NewArrival";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/home/heroSection/Hero";



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
     <Hero />
     <NewArrival />
    </>
  );
}
