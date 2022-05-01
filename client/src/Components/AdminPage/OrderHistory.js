import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./OrderHistory.css";

function OrderHistory(){
  return (
    <>
      <div className="OrderHistoryContainer">
        <h2>Active Discount Codes</h2>
        <div className = "insideHistory" >

        </div>
      </div>
      <div className="PlacedOrdersContainer">
        <h2>Create a Discount Code</h2>
        <div className = "insidePlaced">
            
        </div>
      </div>


    </>
  );
}
export default OrderHistory;