import axios from 'axios';
import React from 'react'
import { useEffect , useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../Blue_Pink_Minimalist_Simple_Modern_Icon_Design_Tour_and_Travel_Logo.png";


export default function ProfilePage() {
  const [description, setDescription] = useState({});
  var { state } = useLocation();
  console.log(state);
  state = JSON.parse(state);
  var {user, profile} = state;
  user = JSON.parse(user);
  profile = JSON.parse(profile);
  useEffect( () => {
  axios.get('/users/description', {
    params: {
        email : user.email
    }}).then((response) => {
      setDescription(response.data[0]);
    }).catch((err) => {
      setDescription({});
    });
    }, []);
    console.log(description);
    var relatives = [];
    if (Object.keys(description).length) {
      relatives = description.relatives;
      relatives = relatives.substr(1, relatives.length - 2).split(',');
    console.log(relatives[0]);
    }
  return (
    <div>
      <img style={{height: 70, width: 70, position: 'absolute', top: 8, left: 16}} src={logo} alt="Logo"></img>
      <h1>DESCRIPTION</h1>
        <p>{description.aboutMe}</p>
        <br></br>
        <h1>FAMILY MEMBERS</h1>
        <ul style={{marginLeft: 575, listStyleType: "none"}}>
            {relatives.map((relative, index) => (
                <li style={{borderStyle: "solid", marginBottom: 10, width: 300, borderRadius: 10}} key={relative.key}>
                    <p>{relative}</p>
                </li>
            ))}
        </ul>
        <Link to = '/dummy' state={{user: JSON.stringify(user)}}> 
        <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 5, height: 30, width: 250}} type='button'>
          GO BACK TO PROFILE
        </button>
        </Link>
        <br>
        </br>
        <br></br>
        <Link to= '/chat' state={{user: JSON.stringify(user)}}>
          <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 5, height: 30, width: 250}} type='button'>
            CHAT WITH ME
          </button>
        </Link>
    </div>
  );
}
