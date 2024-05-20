import "../../styles/footer.css"
import { IoLogoInstagram } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";



export default function Footer(){
    return(
        <footer className="footer">
           <div className="d-flex flex-column d1">
           <h1 className="title">PELUCHE</h1>
           <p className="desc">Welcome to Peluche! We specialize in crafting high-quality
home and aqua slippers designed for comfort and style.
we're dedicated to providing premium footwear solutions for
both domestic and international markets. Join us as we
redefine comfort with our luxurious range of slippers.</p>
</div>
            <div className="d-flex align-items-center flex-column d2">
           <p className="cst">Customer service :</p>
           <p className="nmbr">1212121212</p>
           <p className="flw">Follow us :</p>
           <div className="d-flex icnDv">
            <a href="https://www.instagram.com/peluche.homeslippers?igsh=MXdtOGNtNXZ4cTl2bQ==">
            <IoLogoInstagram className="icnFtr"/>
            </a>
            <a href="/">
             <FaLinkedin className="icnFtr2" />
            </a>
           </div>
           </div>
           <div className="d-flex align-items-center flex-column d3">
           <a href="/aboutUs">
           <p className="lstQst">About us <MdKeyboardArrowRight /></p>
           </a>
           <a href="/faq">
           <p className="lstQst">FAQ <MdKeyboardArrowRight /></p>
           </a>
           <a href="/deliveryInfos">
           <p className="lstQst">Delivery and Return Informations <MdKeyboardArrowRight /></p>
           </a>
           </div>
        </footer>
    )
}