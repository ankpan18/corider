import React, { useEffect,useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
// import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import OIP from '../assets/OIP.jpg';
import Back from '../assets/back-arrow.ico';
import Edit from '../assets/edit.ico';
import More from '../assets/more.ico';
import Send from '../assets/paper-plane.ico';
import att from '../assets/attachment.ico';
import mem from '../assets/users-svgrepo.svg';
import phone from '../assets/phone.svg';
import close from '../assets/close.svg';
import cam from '../assets/camera.svg';
import rec from '../assets/record.svg';
import doc from '../assets/document.svg';
import '../styles/Chat.css';
import axios from "axios";
// import ScrollableFeed from 'react-scrollable-feed';
import InfiniteScroll from 'react-infinite-scroll-component';
;

 
const apiURL="https://qa.corider.in/assignment/chat?page=";

function Chat() {

  const [page,setPage]=useState(1);
  // const [loading, setLoading] = useState(false); 
  const [chatData,setChatData]=useState([]);
  const [name, setName] = useState('');
  const [to,setTo]=useState('');
  const [from,setFrom]=useState('');
  const [toggle1,setToggle1]=useState(true);
  const [toggle2,setToggle2]=useState(true);


  useEffect(() => {
    // setLoading(true);
    
   const getData=()=>{
    axios.get(apiURL+page).then((response)=>{
      response.data["chats"]=response.data["chats"].reverse();
      setChatData(chatData.concat(response.data["chats"]));
      
      console.log(response.data);
      setName(response.data.name);
      setTo(response.data.to);
      setFrom(response.data.from);
      // setLoading(false);
      
    })
  };
  return getData();
  
  }, [page]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="main-container">
      <div className="mod1">
       
        <img src={Back} alt="Back"/>
       <h2>  {name} </h2>

       <img  src={Edit} alt="Edit" className='Edit'/>
       </div>


       <div className="mod2">
       <img  src={OIP} alt="profile pic" className='img'/>
       <div className="sub1">
       <p>From <b>{from}</b></p>
      <p>To <b>{to}</b></p> 
      </div>

    
       <img onClick={()=>{setToggle1(!toggle1)}} src={More} alt="Expand" className='expand-btn'/>    
       <div className={"expand "+((toggle1) ? 'hidden' : '')} >
        <div className="ex2">
        <img src={mem} alt="Members"/> <p>Members</p>
        </div>
        <div className="ex2">
        <img src={phone} alt="Members"/><p>Phone</p>
        </div>
        <div className="ex2">
        <img src={close} alt="Members"/><p>Close</p>
        </div>
       </div>

       </div>

        {/*Here is my Chat Data Displayed  */}

      <div className="content" id="scrollableDiv"
      style={{
        height: 300,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
      >


<InfiniteScroll loader={<h4 style={{"margin": "0px auto"}}>Loading...</h4>}
dataLength={chatData.length}
next={()=>setPage(page+1)}
style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
inverse={true} //
hasMore={true}
scrollableTarget="scrollableDiv">
{chatData.map((v,index)=>(    
  
    <div key={index} >
      
    
   
      <div className="line1">
        <span className="date1">
    {(() => {

      //Here I have shown date again for each message because dummy API has been used.
      var msg_date=new Date(v["time"]);
      // msg_date.setHours(0);
      // msg_date.setMinutes(0);
      // msg_date.setSeconds(0);
      // console.log(msg_date);
    

      return msg_date.getDate()+' '+msg_date.toLocaleString("default", { month: "short" })+','+msg_date.getFullYear();

    })()} 

  </span>
  </div>

     
    
    <div className={(v["sender"]["self"])?"contentfal":"contentdic"}>
      <img src={v["sender"]["image"]} alt="Profile" />
      <p>{v["message"]}</p></div>
    </div>
  
))
  } </InfiniteScroll>
  
   </div>


        {/* This is my bottom input tag */}

        <div className='foot'>
        <input name="myInput" className="squery" type="text" placeholder="Reply to @Rohit Yadav"/>
        <div className='Attachment_container'>
          <div className={"options "+((toggle2) ? 'hidden' : '')} >
          <img src={cam} alt="Camera"/>
          <img src={rec} alt="Record"/>
          <img src={doc} alt="Document"/>
          </div>
          
      
        <img  src={att} className="pa" onClick={()=>{setToggle2(!toggle2)}}  alt="Attachment"/>
        </div>

    <img  src={Send} className="plane"  alt="Paper Plane"/>

    </div>
    </div>
    
  )
}

export default Chat;