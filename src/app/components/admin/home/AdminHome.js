'use client'
import { signOut } from "next-auth/react"
import "../../../styles/admin/adminHome.css"




export default function AdminHome(){
    return(
        <div style={{width:"100%",position:"relative"}}>
           <button className="btn btn-success" style={{position:"absolute", right:"10px",top:"50px"}} onClick={() => signOut()}>
            Sign out
           </button>
        </div>
    )
}