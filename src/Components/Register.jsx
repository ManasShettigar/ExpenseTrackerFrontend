import { React, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import styled from "@emotion/styled";
import{ Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GlobalSnackbar from "./GlobalSnackbar";
import { showSnackbar } from "../Actions/SnackbarAction";
const ParentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Center items vertically */
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
  position: relative;
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
  box-sizing: border-box;
`;

const ChildDiv1 = styled.div`
  background-color: aliceblue;
  height: 100vh;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChildDiv2 = styled.div`
  background-image: url("../Images/bgRectanglePurple.png");
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
  width: 50vw;
`;

const ChildInnerDiv1 = styled.div`
  height: 70%;
  width: 50%;
  font-family: "Poppins", sans-serif;

  h1 {
    font-weight: 700;
    font-size: 32px;
  }
  h3 {
    font-weight: 500;
    font-size: 20px;
  }
  input,
  select,
  button {
    font-size: 16px;
    width: 300px;
  }
  input {
    &::placeholder {
      color: #5038ED;
      opacity: 0.7;
    }
    padding-inline: 10px;
    height: 50px;
    border-radius: 15px;
    background-color: #f0edff;
  }
  select {
    height: 50px;
    width: 300px;
    padding-inline: 10px;
    border-radius: 5px;
    border: 1px solid #5038ED;
    cursor: pointer;
  }
  .belowInput {
    width: 610px;
  }
  p {
    span {
      color: #5038ED;
      cursor: pointer;
      font-weight: 600;
    }
  }
  button {
    height: 50px; 
    background-image: linear-gradient(#9181F4, #5038ED);
    color: #f0edff;
    font-size: 18px;
    border-radius: 15px;
    :hover {
      border: 1px solid #9181F4;
      background-image: none;
      background-color: #7b67fcdd;
      cursor: pointer;
    }
  }
`;

const ChildInnerDiv2 = styled.div`
  height: 60%;
  width: 50%;
  position: relative;
  border: 1px solid aliceblue;
  border-radius: 50px;

  h1 {
    position: absolute;
    font-size: 36px;
    width: 40%;
    font-weight: 700;
    color: white;
    left: 10%;
    top: 5%;
    line-height: 42px;
  }

  img {
    height: 100%;
    width: auto;
    position: absolute;
    right: -10%;
  }
`;

const majorCountries = [
  'India',
  'United States',
  'China',
  'Germany',
  'United Kingdom',
  'France',
  'Japan',
  'Brazil',
  'Canada',
  'Australia',
  'Russia',
  'South Korea',
  'Italy',
  'Spain',
  'Mexico',
];

function Register() {
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const [password, setPassword] = useState('');
  const [adminSelected,setAdminSelected]=useState(true);
  const loginRedirect=useRef(null);
  const dispatch =useDispatch();
  const hidePassword = () => {
    setPasswordDisplay(prev => !prev);
  };
 
  const validate=(data)=>{
    // console.log(data)
    if(!data.firstName){
        console.log("First Name Required");
      }
      else if(!data.lastName){
      console.log("Last Name Required");
      
    }
    else if(!data.email){
      console.log("Email Name Required");
      
    }
    else if(!data.password){
      console.log("Password Name Required");

    }
    else{
      return true;
    }
    return false;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    if(validate(formJson)){
      registerUserAPI(formJson);
      e.target.reset();
      setPassword("");

    }
  };

  const registerUserAPI= async (data)=>{
    
    try {
      const res = await axios.post('http://localhost:8080/api/authHandle/register', data);
      console.log(res.data);
      // Example usage
      dispatch(showSnackbar(res.data.message, "success"));
      // loginRedirect.current.click();
// dispatch(showSnackbar("This is a warning message!", "warning"));
// dispatch(showSnackbar("This is an error message!", "error"));
      // <Navigate to="/Login" />;
    } catch (err) {
      err.response ? dispatch(showSnackbar(err.response.data.errors[0], "error")) : dispatch(showSnackbar("Something went wrong while registering the user!", "error"));
      // console.log(err)
      // console.log(err.response.data.errors[0])
    }
  }
 const handleRoleChange =(e)=>{
  if(e.target.value==="ADMIN"){
    setAdminSelected(true);
  }
  else{
    setAdminSelected(false);
  }
 }
  return (
    <ParentDiv>
      <ChildDiv1>
        <ChildInnerDiv1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection : "column",
            gap: "10px",
          }}
        >
          <h1>REGISTER</h1>
          <hr style={{ border: "none", height: "2px", width: "100%", backgroundColor: "#7c64f2", margin: "6px" }} />
          <h3>Please fill out all the details</h3>
          <form
            onSubmit={handleRegister}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              height: "400px",
              paddingBlock: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <label htmlFor="First Name" style={{ position: 'relative' }}>
                <PersonIcon style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  required={true}
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  style={{ paddingInlineStart: '40px' }}
                />
              </label>
              <label htmlFor="Last Name">
                <input required={true}  type="text" placeholder="Last Name" name="lastName" />
              </label>
            </div>
            <label htmlFor="Email" style={{ position: 'relative' }}>
              <EmailIcon style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                className="belowInput"
                type="email"
                placeholder="Please enter your Email"
                name="email"
                required={true} 
                style={{ paddingInlineStart: '40px' }}
              />
            </label>
            <label htmlFor="Password" style={{ position: 'relative' }}>
              <PasswordIcon style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <span className='eyeIcon' onClick={hidePassword} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                {!passwordDisplay ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
              </span>
              <input
                className="belowInput"
                required={true} 
                type={passwordDisplay ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingInlineStart: '40px' }}
              />
            </label>
             <div style={{ display: "flex", gap: "10px" }}>

            <label htmlFor="Country" style={{ position: 'relative' }}>
              <FlagIcon style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <select name="country" style={{ paddingInlineStart: '40px' }}>
                {majorCountries.map((value, index) => <option key={index} value={value}>{value}</option>)}
              </select>
            </label>
            <label htmlFor="Role" style={{ position: 'relative' }}>
            {adminSelected?
              <SupervisorAccountIcon style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />:
              <AccountCircleIcon style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />}
              <select name="role" onClick={handleRoleChange} style={{ paddingInlineStart: '40px' }}>
                 <option value="ADMIN">Admin</option>
                 <option value="USER" >User</option>
              </select>
            </label>

             </div>
            <button type="submit">Register</button>
            <p>Already registered?  <Link ref={loginRedirect} to="/login"><span>Login</span> </Link></p>
          </form>
        </ChildInnerDiv1>
      </ChildDiv1>
      <ChildDiv2>
        <ChildInnerDiv2>
          <h1>Very good works are waiting for you Register Now!!!</h1>
          <img src="../Images/womenUSPTab.png" alt="Women USPTab" />
        </ChildInnerDiv2>
      </ChildDiv2>
      <GlobalSnackbar />
    </ParentDiv>
  );
}

export default Register;