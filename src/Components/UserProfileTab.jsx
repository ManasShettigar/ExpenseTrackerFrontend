import React, { useEffect } from "react";
import styled from "@emotion/styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
const ParentDiv = styled.div`
  width: 25%;
  max-width: 1200px;
  min-width: 300px;
  height: 100vh;
  /* margin: 0 auto;/ */
  padding: 20px;
  background-color: #5038ed;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 10;
  right: -50%; /* Start off-screen */
  transition: right 0.5s ease; /* Smooth transition */
  animation: fadeIn 2s forwards;

  &.visible {
    right: 0; /* Slide in */
  }

  button {
    position: absolute;
    bottom: 20px;
    right: 50%;
    transform: translateX(50%);
    height: 50px;
    /* background-image: linear-gradient(#9181f4, #f0edff); */
    background-color: #ffffff;
    width: 150px;
    font-size: 18px;
    font-weight: 500;
    border-radius: 15px;
    :hover {
      border: 1px solid #9181f4;
      background-image: none;
      background-color: #7b67fcdd;
      cursor: pointer;
      color: #e1dfed;
    }
  }
`;

const UpperDiv = styled.div`
  height: 150px;
  width: 100%;
  span {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 28px;
    color: aliceblue;
  }
`;
const CenterDiv = styled.div`
  height: 200px;
  width: 100%;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  input {
    width: 100%;
    font-size: 18px;

    color: #5038ed;
    height: 32px;
    border: none;
    /* background-color: #9181fe; */
  }
  .email,
  .country {
    color: white;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  /* span{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 28px;
        color: aliceblue;
    } */
`;
const VerticalLine = styled.div`
  border: 1px solid white;
  height: 100px;
`;
function UserProfileTab({
  email,
  role,
  firstName,
  lastName,
  country,
  showUserProfileTab,
  setShowUserProfileTab,
}) {
  useEffect(() => {
    console.log({ email, firstName, lastName });
  }, [email]);
  return (
    <ParentDiv className={showUserProfileTab ? "visible" : ""}>
      <CloseTwoToneIcon
        style={{
          color: "white",
          cursor: "pointer",
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
        onClick={() => setShowUserProfileTab(false)}
      />
      <UpperDiv>
        <div className="ProfileImg" style={{ display: "flex" }}>
          <span style={{ position: "relative", marginRight: "20px" }}>
            <AccountCircleIcon style={{ fontSize: "100px", color: "white" }} />{" "}
            <div
              style={{
                position: "absolute",
                right: "5px",
                bottom: "20px",
                height: "30px",
                width: "30px",
                border: "1px solid white",
                borderRadius: "50%",
                backgroundColor: "#5038ed",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <EditIcon style={{ color: "white", fontSize: "20px" }} />
            </div>
          </span>
          <div
            className="NameCard"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <div>
                <span>Hi,</span>
              </div>
              <div>
                <span>
                  {firstName}
                  {"  "}
                  {lastName}
                </span>
              </div>
            </div>
            {/* <hr/>
                <span style={{fontSize:"18px"}}>{`Role: ${role}`}</span> */}
          </div>
        </div>
        <hr />
      </UpperDiv>
      <CenterDiv>
        <div className="role">
          <span>Role: </span>
          <span>{role}</span>
        </div>

        <div className="email">
          <div style={{ fontWeight: 600 }}>Email:</div>
          <div>{email}</div>
          {/* <input type="email" value={email} disabled={true} /> */}
        </div>
        <div className="country">
          <div style={{ fontWeight: 600 }}>Country:</div>
          {/* <input type="text" value={country} disabled={true} /> */}
          <div>{country}</div>
        </div>
      </CenterDiv>
      <button>Logout</button>
    </ParentDiv>
  );
}

export default UserProfileTab;
