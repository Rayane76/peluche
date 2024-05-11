import CategoriePage from "../components/categoriePage/CategoriePage";

async function getNewArrivals(){
    const res = await import("../api/product/getLastProducts/route");
  
    const categories = await (await res.GET()).json();
  
    return categories.data;
  }



export default async function newArrivals(){

    const articles = await getNewArrivals();


    return(
        <>
      <CategoriePage articles={articles} name={"New Arrivals"} />
        </>
    )
}