import "../../styles/footer.css"
import { IoLogoInstagram } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";



export default function Footer(){
    return(
        <footer className="footer">
           <h1 className="title">PELUCHE</h1>
           <p className="desc">Welcome to Peluche! We specialize in crafting high-quality
home and aqua slippers designed for comfort and style.
we're dedicated to providing premium footwear solutions for
both domestic and international markets. Join us as we
redefine comfort with our luxurious range of slippers.</p>
           <p className="cst">Customer service</p>
           <p className="nmbr">1212121212</p>
           <p className="flw">Follow us :</p>
           <div className="d-flex gap-2">
            <a href="https://www.instagram.com/peluche.homeslippers?igsh=MXdtOGNtNXZ4cTl2bQ==">
            <IoLogoInstagram className="icnFtr"/>
            </a>
           </div>
           <p className="lstQst">About us <MdKeyboardArrowRight /></p>
           <p className="lstQst">FAQ <MdKeyboardArrowRight /></p>
           <p className="lstQst">Delivery and Return Informations <MdKeyboardArrowRight /></p>
        </footer>
    )
}