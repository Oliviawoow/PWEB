import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import logo from '../Blue_Pink_Minimalist_Simple_Modern_Icon_Design_Tour_and_Travel_Logo.png';
const socket = io.connect("http://localhost:3001");

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const location = useLocation();
  var { user } = location.state;
  user = JSON.parse(user);
  console.log(user);
  //const [messageList, setMessageList] = useState([]);
  const [messageRecv, setMessageRecv] = useState("");
  const sendMessage = () => {
      socket.emit("sendMessage", {message: message});
      /*const messageElem = {sender: 'me', msg: message};
      console.log(messageElem);
      const newMessageList = messageList;
      newMessageList.push(messageElem);
      console.log(newMessageList);
      setMessageList(newMessageList);*/
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
        const messageElem = {sender: 'other', msg: data.message};
        console.log(messageElem);
        setMessageRecv(messageElem.msg);
    })
  }, [socket]);
  return (
    <div>
        <img style={{height: 70, width: 70, position: 'absolute', top: 8, left: 16}} src={logo} alt="Logo"></img>
        <br></br>
        <input style={{height: 30, width: 300}} type='text' id='chatBox' placeholder="write your message here" onChange={function(e) {
            setMessage(e.target.value);
        }} />
        <label style={{color: 'rgba(1, 1, 1, 0)'}}>sce</label>
        <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 5, height: 30, width: 125}} type='button' onClick={function(e) {sendMessage();
             document.getElementById('chatBox').value = ''}}>
            SEND MESSAGE
        </button>
        <p style={{backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 30}}>
            {messageRecv}
        </p>
        <Link to="/dummy" state={{ user: JSON.stringify(user) }}>
        <button style={{backgroundColor:"#0F4257", color: "white", borderRadius: 5, height: 30, width: 250}} type='button'>
            Exit chat
        </button>
        </Link>

    </div>
  )
}
