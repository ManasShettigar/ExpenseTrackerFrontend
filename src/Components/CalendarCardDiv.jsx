import React, { useState } from "react";
import styled from "@emotion/styled";
const monthsValueFullArray = [
  80,40,80,90,100,50,60,90,80,70,30,70
];
const monthsFullArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthsArray = [
  "Jan", // January
  "Feb", // February
  "Mar", // March
  "Apr", // April
  "May", // May
  "Jun", // June
  "Jul", // July
  "Aug", // August
  "Sep", // September
  "Oct", // October
  "Nov", // November
  "Dec", // December
];
const CalendarCardContainerDiv = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  justify-content: space-between;
  font-family: Poppins, sans-serif;
  align-items: center;
  flex-direction: column;
  background-color: #42224a;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding-block: 50px;
  .Title{
    font-size: 32px;
    color: aliceblue;
  }
`;
const MonthCardContainerDiv = styled.div`
  width: 800px;
  height: 350px;
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  align-items: end;
`;
const BalanceCards=styled.div`
  display: flex;
  justify-content: space-around;
  width: 750px;
  div{
    text-align: center;
  }
  .ExpenseCardTitle,.BalanceCardTitle,.IncomeCardTitle{
    color: #EF8767;
    font-size: 24px;
  }
  .ExpenseCardValue,.BalanceCardValue,.IncomeCardValue{
    color: #B6B5B7;
    font-size: 28px;
  }
`
const MonthDiv = styled.div`
  width: 750px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  font-weight: 500;
  font-size: 18px;
  color: aliceblue;
  div{
    cursor: pointer;
  }
`;

const MonthDivBar = styled.div`
  height: 100%;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const MonthDivBarTitle = styled.div`
  align-self: end;
  width: 100%;
  display: flex;
  justify-content: center;

`;
const MonthDivBarGraph = styled.div`
height: 90%;
width: 100%;
display: flex;
flex-direction: column-reverse;
padding: 0px 0px 10px 0px;
div{
border-radius: 50px;
}
`;
function CalendarCardDiv() {
  const [currentMonth,setCurrentMonth]=useState(monthsFullArray[0]);
  
  const handleMonthChange=(key)=>{
    setCurrentMonth(monthsFullArray[key])
  }
  return (
    <CalendarCardContainerDiv>
        <div className="Title">{currentMonth}</div>
<BalanceCards>
          <div className="ExpenseCard">
<div className="ExpenseCardTitle">Exp</div>
<div className="ExpenseCardValue">25000</div>
          </div>
          <div className="BalanceCard">
<div className="BalanceCardTitle">Bal</div>
<div className="BalanceCardValue">+5000</div>

          </div>
          <div className="IncomeCard">
<div className="IncomeCardTitle">Inc</div>
<div className="IncomeCardValue">30000</div>

          </div>
        </BalanceCards>
      <MonthCardContainerDiv>
        <MonthDiv>
          {monthsArray.map((month, key) => {
            return <MonthDivBar key={key} onClick={()=>handleMonthChange(key)}>
                <MonthDivBarGraph ><div className="BarValue" style={{height:`${monthsValueFullArray[key]}% `,width:"100%",backgroundColor:"#5A3F61"}}></div>  </MonthDivBarGraph>
                <MonthDivBarTitle><div>{month}</div></MonthDivBarTitle> 
              
              </MonthDivBar>;
          })}
        </MonthDiv>
      </MonthCardContainerDiv>
    </CalendarCardContainerDiv>
  );
}

export default CalendarCardDiv;
