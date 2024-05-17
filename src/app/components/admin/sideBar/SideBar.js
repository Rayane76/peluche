'use client'
import "../../../styles/admin/sidebar.css"
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { IoManOutline } from "react-icons/io5";
import { IoWomanOutline } from "react-icons/io5";
import { FaChild } from "react-icons/fa6";
import { usePathname } from "next/navigation";


export default function SideBar(){


    const pathname = usePathname();


    const menuItems = [
        { href: '/admin', icon: <IoHomeOutline className="icn" />, label: 'Dashboard' },
        { href: '/admin/accounts', icon: <MdOutlineDesktopWindows className="icn" />, label: 'Admins' },
        { href: '/admin/orders', icon: <FiTruck className="icn" />, label: 'Orders' },
        { href: '/admin/Men', icon: <IoManOutline className="icn" />, label: 'Men' },
        { href: '/admin/Women', icon: <IoWomanOutline className="icn" />, label: 'Women' },
        { href: '/admin/Unisex', icon: <><IoManOutline className="icn2" /><IoWomanOutline className="icn" /></>, label: 'Unisex' },
        { href: '/admin/Kids', icon: <FaChild className="icn" />, label: 'Kids' },
      ];


    return(
        <div className="sidebar">
             <div className="titleDiv">
               <h1 className="title">Admin</h1>
               </div>
               <ul className="ul">
      {menuItems.map((item) => (
        <li key={item.href}>
          <a className={`tags ${pathname === item.href ? 'active' : ''}`} href={item.href}>
            {item.icon}
            {item.label}
          </a>
        </li>
      ))}
    </ul>
        </div>
    )
}