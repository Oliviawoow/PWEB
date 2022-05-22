import React from 'react';
import { useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from "../Blue_Pink_Minimalist_Simple_Modern_Icon_Design_Tour_and_Travel_Logo.png";
import mail from "../mail.jpg";
import lock from "../lock.jpg";
import phone from "../phone.jpg";
import avatar from "../avatar.jpg";
import mapLocation from "../maplocation.jpg";
import cake from "../cake.jpg";
import plus from "../plus.jpg";



export default
function RegisterPage() {
    const [firstNameRegister, setFistNameRegister] = useState("");
    const [lastNameRegister, setLastNameRegister] = useState("");
    const [passwordRegister, setpasswordRegister] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [phoneRegister, setPhoneRegister] = useState("");
    const [countryRegister, setCountryRegister] = useState("");
    const [birthdayRegister, setBirthdayRegister] = useState("");
    const [familyRegister, setFamilyRegister] = useState("");

    const register = () => { axios.post("/users/register", 
        JSON.stringify({"firstName": firstNameRegister,
        "lastName": lastNameRegister,
        "password": passwordRegister,
        "email": emailRegister,
        "phone": phoneRegister,
        "country": countryRegister,
        "birthday": birthdayRegister,
        "family": familyRegister}
        ),
        {headers: { 
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            if (response.status === 400) {
                alert('bad body');
            }
            alert('Account created succesfully');
        }).catch((err) => {
            alert('Email address is already in use!');
        });
        }


    return (
        <div className="Register">
            <img style={{height: 70, width: 70, position: 'absolute', top: 8, left: 16}} src={logo} alt="Logo"></img>
            <h1>REGISTER</h1>
            <form style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 600}}>
                <div className='container'>
                <label style={{marginRight: 29}} for="Email">Email   </label>
                <img style={{height: 18, width: 18, position: 'absolute', top: 88, left: 625}} src={mail} alt="Logo"></img>
                <input type="text" name="Email" onChange={(e) => {
                    setEmailRegister(e.target.value)
                }} />
                <br></br>
                <label for="password">Password   </label>
                <img style={{height: 18, width: 18, position: 'absolute', top: 113, left: 625}} src={lock} alt="Logo"></img>
                <input type="password" name="passWord" onChange={(e) => {
                    setpasswordRegister(e.target.value)
                }}/>
                <br></br>
                <label style={{marginRight: 24}} for="phone">Phone   </label>
                <img style={{height: 18, width: 18, position: 'absolute', top: 137, left: 625}} src={phone} alt="Logo"></img>
                <input type="text" name="phone" onChange={(e) => {
                    setPhoneRegister(e.target.value)
                }}/>
                <br></br>
                <label style={{marginRight: 2}} for="firstname">Firstname   </label>
                <img style={{height: 18, width: 18, position: 'absolute', top: 162, left: 625}} src={avatar} alt="Logo"></img>
                <input type="text" name="firstname" onChange={(e) => {
                    setFistNameRegister(e.target.value)
                }}/>
                <br></br>
                <label style={{marginRight: 4}} for="lastname">Lastname   </label>
                <img style={{height: 18, width: 18, position: 'absolute', top: 187, left: 625}} src={avatar} alt="Logo"></img>
                <input type="text" name="lastname" onChange={(e) => {
                    setLastNameRegister(e.target.value)
                }}/>
                <br></br>
                <label style={{marginRight: 15}} for="country">Country   </label>
                <img style={{height: 18, width: 18, position: 'absolute', top: 211, left: 625}} src={mapLocation} alt="Logo"></img>
                <input type="text" name="country" onChange={(e) => {
                    setCountryRegister(e.target.value)
                }}/>
                <br></br>
                <label style={{marginRight: 15}} for="birthday">Birthday   </label>
                <img style={{height: 18, width: 18, position: 'absolute', top: 235, left: 625}} src={cake} alt="Logo"></img>
                <input type="text" name="birthday" onChange={(e) => {
                    setBirthdayRegister(e.target.value)
                }}/>
                <br></br>
                <label style={{marginRight: 28}} for="family">Family   </label>
                <img style={{height: 18, width: 18, position: 'absolute', top: 260, left: 625}} src={plus} alt="Logo"></img>
                <input type="text" name="family" onChange={(e) => {
                    setFamilyRegister(e.target.value)
                }}/>
                <br></br>
                <br></br>
                <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 5, height: 30, width: 250}} type="button" onClick={function(){
                    register();
                    }}>REGISTER</button>
                <br></br>
                <Link to="/">Go back to LogIn</Link>
                </div>
            </form>
            
        </div>
    );
}