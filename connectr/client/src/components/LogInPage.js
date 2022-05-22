
import {Link, useNavigate} from 'react-router-dom';
import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {User, user} from './userInfo';
import background from "../Blue_Pink_Minimalist_Simple_Modern_Icon_Design_Tour_and_Travel_Logo.png";



export default

function LogInPage(){

    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [nextPath, setNextPath] = useState('');
    const [message, setMessage] = useState('');

    const logIn = () => {axios.post("/users/login", 
        JSON.stringify({
        "password": passwordRegister,
        "email": emailRegister
        }
        ),
        {headers: { 
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            if (response.status === 400) {
                alert('Wrong credentials');
            }
            if (response.status === 201) {
                alert('logged in');
                setIsAuth(true);
                setUserInfo(response.data[0]);
                if (response.data[0].createdBio == 0) {
                    setNextPath('/description');
                    setMessage("You've succesfully logged in. Click here to complete your bio");
                } else {
                    setNextPath('/dummy');
                    console.log(nextPath);
                    setMessage("You've succesfully logged in. Click here to go to home page");
                    console.log(message);
                }
            }
        }).catch((err) => {
            if (err.code === 'ERR_BAD_REQUEST') {
                alert('wrong credentials given');
            } else {
                alert('internal error occured');
            }
        });
    
    }
    if (userInfo != 0) {
        user.setVal(userInfo.firstname, userInfo.lastname, userInfo.passwd, userInfo.email,
            userInfo.phone, userInfo.country, userInfo.birthday, userInfo.family);

    }

    return (
        

        <div style={{ height:"100vh", backgroundImage: `url(${background})`, backgroundSize: 'cover', overflow: 'hidden', backgroundPosition: 'center center'}}  className="SignIn">
            { isAuth ? (
                <Link to = {nextPath} state ={{ user: JSON.stringify(user)}}> {message} </Link>
            ) : (
            <>
           
            <form style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 600}}>
            <h1>SIGN IN</h1>
                <div className='container'>
                <input style={{height: 30, width: 300}} placeholder="Email" type="text" name="Email" onChange={(e) => {
                    setEmailRegister(e.target.value);}}/>
                <br></br>
                <br></br>
                <input style={{height: 30, width: 300}} placeholder="Password" type="password" name="passWord" onChange={(e) => {
                    setPasswordRegister(e.target.value);
                }}/>
                <br></br>
                <div>
                    <label><input type="checkbox" name="keepMeLogged" value="Keep Me Logged"/> Keep me logged  </label>
                    <label style={{color: 'rgba(1, 1, 1, 0)'}}>space</label>
                    <Link to="/ChangePassword">Forgot password?</Link>
                </div>
                <br></br>
                <br></br>
                <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 5, height: 30, width: 300}} type="button" onClick={function(){
                    logIn()}}>Sign in</button>
                <br></br>
                <div>
                Don't have an account?
                <label style={{color: 'rgba(1, 1, 1, 0)'}}>se</label>  
                <Link to="/Register">Sign Up</Link>
                </div>
                </div> 
            </form>
            </>
            )
        }        
        </div>
    );
}


