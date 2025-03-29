import React, { useCallback, useEffect, useState } from 'react'
import { setAccessToken } from '../Actions/AuthTokenAction'
import { useSelector } from 'react-redux'
import { jwtDecode } from "jwt-decode";
import styled from "@emotion/styled";
import UserProfileTab from './UserProfileTab';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarCardDiv from './CalendarCardDiv';
import BottomBar from './BottomBar';

const ParentDiv=styled.div`
width: 100vw;
height: 100vh;
position: relative;
background-color:#2200ff15 ;
.showUserProfile{
    z-index: 10;
    position: absolute;
    right: 0px;
}

.hideUserProfile{
    position: absolute;
    right: -50%;
}
`
const NavBarDiv=styled.div`
position: relative;
height: 70px;
width: 100vw;
color: white;
background-color: #5038ed;
box-shadow: 2px 2px 5px 1px #3617f9;
font-family: "Poppins", sans-serif;
border-radius: 0px 0px 2em 2em;
`
const CalendarDiv=styled.div`
width: 50%;
height: 100%;
/* background-color:whitesmoke; */
.CalendarHeader{
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    padding-inline: 30px;
    padding-block: 20px;
    color:"#42224A";
}
.ParentCalendarDiv{
    display: flex;
    justify-content: center;
}
`

function Dashboard() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [userData,setUserData]=useState();
    const [showUserProfileTab,setShowUserProfileTab]=useState(false); 
    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded; 
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    };
    
    
useEffect(()=>{
    if(accessToken){
        setUserData(decodeToken(accessToken));
    }
},[accessToken])
const { email, role, firstName, lastName, country } = userData || {};


  return (
    <ParentDiv>        
        <UserProfileTab email={email} role={role} firstName={firstName} lastName={lastName} country={country} showUserProfileTab={showUserProfileTab} setShowUserProfileTab={(val)=>setShowUserProfileTab(val)}/>
            <NavBarDiv style={{display:"flex" ,justifyContent :"space-between"}}>
                <div style={{fontSize:"36px",cursor:"pointer",display:"flex" ,justifyContent :"center",alignItems:"center",marginInline:"20px",fontWeight:"600"}}><span>ExpenseTracker</span></div>
                <div className="userProfileCard" style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px" ,width:"350px",fontSize:"32px",cursor:"pointer"}} onClick={()=>setShowUserProfileTab(prev=>!prev)} > 
    <span >{firstName} {lastName}</span>
<AccountCircleIcon style={{fontSize:"42px",cursor:"pointer"}}/>
                </div>
            </NavBarDiv>
            <CalendarDiv>
                <div className="CalendarHeader">
                    <div className="BalanceTitle" style={{fontSize:"24px", marginInline:"45px"}}>Balance :</div>
                    <div className="BalanceAmount"style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",width:"200px" ,marginInline:"45px"}} ><span style={{fontSize:"18px",alignSelf:"end",paddingBottom:"10px"}}>₹</span><div className="BalanceAmountMain" style={{fontSize:"36px",alignSelf:"end"}}>20000.00</div></div>
                </div>
                <div className="ParentCalendarDiv"  ><CalendarCardDiv/></div>
            </CalendarDiv>
            <BottomBar/>
    </ParentDiv>
    
  )
}

export default Dashboard