import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Search from './SearchBar'
import { useState, useEffect } from "react";
import axios from 'axios';
import { profile } from "./profileInfo";
import logo from "../Blue_Pink_Minimalist_Simple_Modern_Icon_Design_Tour_and_Travel_Logo.png";

const filterPosts = (posts, query) => { 
    if (!query) {
        return posts; 
    }
    return posts.filter((post) => {
        const postName = post.username.toLowerCase();
        return postName.includes(query);
    });
};

const goToProfile = (key, posts, user, navigate) => {
    const post = posts[key];
    profile.setVal(post.username, post.email, post.country, post.birthday);
    navigate('/Profile', {state: JSON.stringify({user : JSON.stringify(user), profile: JSON.stringify(profile)})});
}



function Dummy() {
    const navigate = useNavigate();
    const location = useLocation();
    var {user} = location.state;
    user = JSON.parse(user);
    const [matches, setMatches] = useState([]);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
    axios.get("/users/recommended/", {
        params: {
            lastName : user.lastName,
            email : user.email
        }
    }).then((response) => {
        setMatches(response.data);
    }).catch((err) => {
        setMatches(-1);
    });
    }, []);

    const searchPerson = () => {
        axios.get("/users/search", {
            params: {
                searchName : searchName,
                email : user.email
            }
        }).then((response) => {
            setMatches(response.data);
        }).catch((err) => {
            setMatches(-1);
        });
    }
    const {search} = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchResult, setSearchResult] = useState(query || '');
    var filteredPosts;
    if (matches != 0 && matches !== -1) {
        filteredPosts = filterPosts(matches, searchResult);  
    }
    return (
        <> 
        <img style={{height: 70, width: 70, position: 'absolute', top: 8, left: 16}} src={logo} alt="Logo"></img>
        <br></br>
        <input style={{height: 30, width: 350}} type='text' placeholder="search for person" onChange={function(e){setSearchName(e.target.value)}}/>
        <label style={{color: 'rgba(1, 1, 1, 0)'}}>sce</label>
        <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 5, height: 35, width: 100}} type='button' onClick={function() {searchPerson()}}>
            search
        </button>
        {matches != 0 ? ( matches !== -1 ? (
            <>
        <br></br>
        <h1>{filteredPosts.length} users found</h1>
        <ul style={{marginLeft: 575, listStyleType: "none"}}>
            {filteredPosts.map((post, index) => (
                <li style={{borderStyle: "hidden", backgroundColor: 'rgba(0, 0, 0, 0.05)', marginBottom: 10, width: 300, borderRadius: 30}} key={post.key}>
                    <p>{post.country + ' .  '  +
                    post.family}</p>
                    <h2>{post.firstname + ' ' + post.lastname}</h2>
                    <p>Birthday: {post.birthday}</p>
                
                    <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 15, height: 40, width: 125, marginBottom: 5}} type="button" id={index} onClick={function(e){goToProfile(e.currentTarget.id, filteredPosts, user, navigate);
                                                                }}>    
                            VIEW PROFILE
                    </button>
                
                    </li>
            ))}
        </ul>
        <br></br>
            <Link to="/">
                <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 5, height: 30, width: 250}} type = "button">
                    SIGN OUT
                </button>
            </Link>
            </>) : (<><p> WE ARE SORRY...NO USER FOUND </p>
                <Link to="/">
                    <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 5, height: 30, width: 250}} type = "button">
                        SIGN OUT
                    </button>
                </Link></>)) : (
                <p>loading data</p>
            )
        }
        </>
    );
}
export default Dummy;