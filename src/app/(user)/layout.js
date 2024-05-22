import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar/Navbar";
import { Rubik } from "next/font/google";
import Footer from "../components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

const rubik = Rubik({subsets: ["latin"]});

export const metadata = {
  title: {
    default: "Peluche",
    template: "%s - Peluche"
  },
  description: "Homeslippers and Aquaslippers store",
  openGraph: {
    images: [
      {
        url: "../openGraph.png"
      }
    ]
  }
};

async function getCategories(){
  const res = await import("../api/categorie/getCategoriesNoQuery/route");

  const categories = await (await res.GET()).json();

  return categories.data;
}

export default async function RootLayout({ children }) {

  const categories = await getCategories();


  return (
    <html lang="en">
      <body className={rubik.className}>
      <Navbar allArticles={categories} />
      {children}
      <Footer />
      </body>
    </html>
  );
}
