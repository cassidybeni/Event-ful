import React from 'react'
import { Link } from "react-router-dom"
import './SignUp.css'

export default function SignUp() {
    return (
        <div className="three-d">
           <form >
               <label htmlFor="FullName">Please Enter Your Full Name</label> <br/>
               <input 
               type="text" 
               value="" 
               placeholder="Full Name"/> <br/>
               <br/>

               <label htmlFor="UserName">Select a Username</label> <br/>
               <input 
               type="text" 
               value="" 
               placeholder="Username"/> <br/>
               <br/>

               <label htmlFor="Email">Please Enter your Email</label> <br/>
               <input 
               type="text" 
               value="" 
               placeholder="Email"/> <br/>
               <br/>

               <label htmlFor="PassWord">Select a Password</label> <br/>
               <input 
               type="text" 
               value="" 
               placeholder="Password"/> <br/>
               <br/>

               <Link to="/dashboard">
               <button type="submit" className="pg-buttons">Sign Up</button>
               </Link>
           </form>
            
        </div>
    )

}
