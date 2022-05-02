import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./OrderHistory.css";
import {base_url} from "./config.js"



function OrderHistory() {

  const [placedOrders, setPlacedOrders] = useState([])
  const [orderHistory, setOrderHistory] = useState([])
  const [selection, setSelection] = useState("")
  const [users, setUsers] = useState([])


  useEffect(() => {

    Axios.post(`${base_url}/getPlacedOrders`).then(res => {
      console.log(res)
      if(res.data[0])
      setPlacedOrders(res.data)
      else if(res.data.message)
      setPlacedOrders(null)
    })

    Axios.post(`${base_url}/getOrderHistory`).then(res => {
      console.log(res)
      if(res.data[0])
      setOrderHistory(res.data)
      else if(res.data.message)
      setOrderHistory(null)
    })

    Axios.post(`${base_url}/getUsers`).then(res => {
      setUsers(res.data)
    })




  }, [])

  useEffect(() => {
    setPlacedOrders(placedOrders)
    setOrderHistory(orderHistory)
    setUsers(users)

  }, [placedOrders, orderHistory, users])


  const sortHistory = (sort) => {
      let dbSort = ""

      if(sort === "o-r")
      dbSort = "ORDER BY orderDate ASC"
      else if(sort === "r-o")
      dbSort = "ORDER BY orderDate DESC"
      else if(sort === "h-l")
      dbSort = "ORDER BY orderTotal DESC"
      else if(sort === "l-h")
      dbSort = "ORDER BY orderTotal ASC"
      else dbSort = `WHERE username="${sort}"`

      Axios.post(`${base_url}/getOrderHistory`, {sort: dbSort}).then(res => {
        setOrderHistory(res.data)
      })
  }



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
          

        </div>
        )

        }
      </div>

      <div>
        <select id="selection" onChange={(e) => sortHistory(e.target.value)}>
          <option selected="selected" value="r-o">Sort: Date Recent-Old</option>
          <option value="o-r">Sort: Date Old-Recent</option>
          <option value="h-l">Sort: Total High-Low</option>
          <option value="l-h">Sort: Total Low-High</option>
          <option disabled="true">--USERS--</option>
          { users.map(user => 
          
          <option>{user.username}</option>
          )
          }
  
        </select>
      </div>


    </>
  );
}
export default OrderHistory;