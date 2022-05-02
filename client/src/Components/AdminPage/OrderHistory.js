import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./OrderHistory.css";




function OrderHistory() {

  const [placedOrders, setPlacedOrders] = useState([])
  const [orderHistory, setOrderHistory] = useState([])


  useEffect(() => {

    Axios.post("http://localhost:3001/getPlacedOrders").then(res => {
      console.log(res)
      if(res.data[0])
      setPlacedOrders(res.data)
      else if(res.data.message)
      setPlacedOrders(null)
    })

    Axios.post("http://localhost:3001/getOrderHistory").then(res => {
      console.log(res)
      if(res.data[0])
      setOrderHistory(res.data)
      else if(res.data.message)
      setOrderHistory(null)
    })




  }, [])

  useEffect(() => {
    setPlacedOrders(placedOrders)
    setOrderHistory(orderHistory)

  }, [placedOrders, orderHistory])


  return (
    <>
      <div className="OrderHistoryContainer">
        <h2>Order History</h2>
        { orderHistory &&
        
        orderHistory.map(order => 
        <div className = "insideHistory" >
          <h5>Order ID: {order.orderID}</h5>
            <h5>User: {order.username}</h5>
            <h5 className="upperRight" style={{color: "green"}}>Total: ${order.orderTotal.toLocaleString()}</h5>
            <h5>Date of order: <a style={{color: "red"}}>{order.orderDate}</a></h5>
            <span>View Items</span>
        </div>
        )

        }

        { !orderHistory &&
        <p>NO ORDER HISTORY</p>
        }
      </div>

      <div className="PlacedOrdersContainer">
        <h2>Placed Orders</h2>
        { placedOrders &&

        placedOrders.map(order => 
        <div className = "insidePlaced">
          <h5>Order ID: {order.orderID}</h5>
            <h5>User: {order.username}</h5>
            <h5 className="upperRight" style={{color: "green"}}>Total: ${order.orderTotal.toLocaleString()}</h5>
            <h5>Date of order: <a style={{color: "red"}}>{order.date}</a></h5>
            <span>View Items</span>
        </div>
        )

        }
      </div>


    </>
  );
}
export default OrderHistory;