import { React, use, useRef, useState } from "react";
import{ Link } from "react-router-dom";
import styled from "@emotion/styled";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import GoogleIcon from '@mui/icons-material/Google';
import GlobalSnackbar from "./GlobalSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showSnackbar } from "../Actions/SnackbarAction";
import { setAccessToken } from "../Actions/AuthTokenAction";
const ParentDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
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
      color: #5038ed;
      opacity: 0.7;
    }
    padding-inline: 10px;
    height: 50px;
    border-radius: 15px;
    background-color: #f0edff;
  }
  select {
    height: 50px;
    width: 400px;
    padding-inline: 10px;
    border-radius: 5px;
    border: 1px solid #5038ed;
    cursor: pointer;
  }
  .belowInput {
    width: 400px;
  }
  p {
    /* Link { */
      span{
      color: #5038ed;
      cursor: pointer;
      font-weight: 600;
      }
    /* } */
  }
  button {
    height: 50px;
    background-image: linear-gradient(#9181f4, #5038ed);
    color: #f0edff;
    font-size: 18px;
    border-radius: 15px;
    :hover {
      border: 1px solid #9181f4;
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

function Login() {
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch=useDispatch();

  const navigate = useNavigate(); 
  const hidePassword = () => {
    setPasswordDisplay((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    if(validate(formJson)){
      LoginUserAPI(formJson);
      e.target.reset();
      setPassword("");

    }
  };
  const validate=(data)=>{
    // console.log(data)
    if(!data.email){
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
  const LoginUserAPI= async (data)=>{
    
    try {
      const res = await axios.post('http://localhost:8080/api/authHandle/signin', data);
      console.log(res.data);
      const { accessToken } = res.data;

            // Store the access token in local storage or state management
            // localStorage.setItem('accessToken', accessToken);
      // Example 
      dispatch(setAccessToken(accessToken));
      dispatch(showSnackbar("Login Sucessfull", "success"));

      navigate('/dashboard');
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
  return (
    <ParentDiv>
      <ChildDiv1>
        <ChildInnerDiv1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h1>LOGIN</h1>
          <hr
            style={{
              border: "none",
              height: "2px",
              width: "100%",
              backgroundColor: "#7c64f2",
              margin: "6px",
            }}
          />
          <h3>Please fill out all the details</h3>
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              height: "300px",
              paddingBlock: "20px",
            }}
          >
            <label htmlFor="Email" style={{ position: "relative" }}>
              <EmailIcon
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                className="belowInput"
                type="email"
                placeholder="Please enter your Email"
                name="email"
                style={{ paddingInlineStart: "40px" }}
                required={true}
              />
            </label>
            <label htmlFor="Password" style={{ position: "relative" }}>
              <PasswordIcon
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <span
                className="eyeIcon"
                onClick={hidePassword}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {!passwordDisplay ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </span>
              <input
                className="belowInput"
                type={passwordDisplay ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingInlineStart: "40px" }}
                required={true}
              />
            </label>

            <button type="submit">Login</button>
            <p>
              New User? <Link  to="/register"><span >Register</span></Link>
            </p>
          </form>
            <div style={{display:'flex',alignItems: 'center'}}>
              <hr
            style={{
              border: "none",
              height: "2px",
              width: "220px",
              backgroundColor: "#7c64f2",
              margin: "6px", 
            }}
          />
              <span>OR</span>
             <hr
            style={{
              border: "none",
              height: "2px",
              width: "220px",
              backgroundColor: "#7c64f2",
              margin: "6px", 
            }}
          />
            </div>
            <button >Login with <GoogleIcon/> +</button>
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

export default Login;
