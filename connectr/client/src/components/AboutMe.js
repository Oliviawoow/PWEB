import React from 'react'
import { useState } from 'react';
import {user} from './userInfo'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import logo from "../Blue_Pink_Minimalist_Simple_Modern_Icon_Design_Tour_and_Travel_Logo.png";


var familyMembers = [];


class List extends React.Component {
    render() {
        return (
        <ul>
        {
            this.props.familyMembers.map((member) => (
                <li key={member.key}>
                    {member}
                </li>
            ))
        }
        </ul>
        );
    }
};


export default function AboutMe() {
    const location = useLocation();
    var { user } = location.state;
    user = JSON.parse(user);
    const addInfo = () => { axios.post("/users/description", 
        JSON.stringify(
        {"email": user.email,
        "aboutMe": document.getElementById('bio').value,
        "family": JSON.stringify(familyMembers),
        }
        ),
        {headers: { 
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            alert('description added succesfully');
        }).catch((err) => {
            alert('something went wrong when adding description!');
        });
        axios.post('users/changeState',
        JSON.stringify(
            {"email": user.email}
        ),
        {headers: {
        'Content-Type': 'application/json'  
        }
        }).catch((err) => {
            alert('something went wrong!');
        });
        }
    const [familyMembersHook, setFamilyMembersHook] = useState([]);
    const [counter, setCounter] = useState(0);
    return (
    <div>
         <img style={{height: 70, width: 70, position: 'absolute', top: 8, left: 16}} src={logo} alt="Logo"></img>
    <h1>ABOUT ME</h1>
    <br></br>
    <textarea rows = '13' cols = '100' name='aboutMe' id='bio' placeholder='Enter details here...'>
    </textarea>
    <h1>FAMILY MEMBERS</h1>
    <input style={{height: 25}} type='text' id='familyMembers'></input>
    <label style={{color: 'rgba(1, 1, 1, 0)'}}>sce</label>
    <button style={{backgroundColor:"#0F4257", color: "white",borderRadius: 5, height: 30, width: 125}} type='button' onClick={function(){setCounter(counter + 1)
        familyMembers.push(document.getElementById('familyMembers').value);
        document.getElementById('familyMembers').value = '';
        setFamilyMembersHook(familyMembers);
        }}>
            ADD MEMBER
        </button> 
    <List familyMembers={familyMembersHook} />
    <br></br>
    <Link to="/dummy" state={{user: JSON.stringify(user)}}>
    <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 5, height: 30, width: 250}} type='button' onClick={function(){
        addInfo()}}>
        SUBMIT DATA
    </button>
    </Link>
    </div>
  )
}
/*
function(){
        
    }
    */