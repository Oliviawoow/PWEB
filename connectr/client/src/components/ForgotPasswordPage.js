import {Link} from 'react-router-dom';
import React from 'react';
import logo from "../Blue_Pink_Minimalist_Simple_Modern_Icon_Design_Tour_and_Travel_Logo.png";


export default

function ForgotPasswordPage(){
    return (
        <div className="ForgotPass">
             <img style={{height: 70, width: 70, position: 'absolute', top: 8, left: 16}} src={logo} alt="Logo"></img>
            <h1>CHANGE PASSWORD</h1>
            <form>
                <div className='container'>
                <input style={{height: 30, width: 300}} placeholder="Enter email here" type="text" name="email" />
                <br></br>
                <Link to="/">Back to LogIn</Link>
                </div> 
            </form>
            
        </div>
    );
}