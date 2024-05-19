"use client"
import { useState } from "react"
import "../styles/login.css"
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation"


export default function Login(){

    const router = useRouter();

    const [info,setInfo] = useState({username:"",password:""})

    function handleInput(e){
        setInfo((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        try {
            const res = await signIn("credentials",{
                username: info.username,
                password: info.password,
                redirect: false
            })
             console.log(res);
            if(res.error){
                console.log("invalid credentials")
            }
            else{
              router.push("/admin");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
           <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
           <form className="form" onSubmit={handleSubmit}>
       <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input required type="text" name="username" placeholder="Enter username" onChange={(e)=>handleInput(e)}/>
      </div>
      <div className="input-container">
          <input required type="password" name="password" placeholder="Enter password"  onChange={(e)=>handleInput(e)} />
        </div>
         <button type="submit" className="submit">
        Sign in
      </button>
      </form>

           </div>
        </>
    )
}