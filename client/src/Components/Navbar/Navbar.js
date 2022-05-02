import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link, renderMatches } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Axios from "axios"
import {base_url} from "../AdminPage/config.js"

function TestNavbar(props) {


  const [sidebar, setSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const showSidebar = () => setSidebar(!sidebar);
  Axios.defaults.withCredentials = true

  useEffect(() => {
    Axios.get(`${base_url}/login`).then(response => {    
            if(response.data.loggedIn === true) 
            setCurrentUser(response.data.user[0])
             })
  }, [sidebar])


  return (
    <>
      <IconContext.Provider value={{ color: '#17999c', size: '27px' }}>
        <div className='navbar' onClick={() => showSidebar()}>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars />
          </Link>
        </div>
        </IconContext.Provider>

        <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars' onClick={showSidebar}>
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}

            {currentUser.username &&
          <li key="6" className="nav-text">
          <Link to="/cart">
            <FaIcons.FaShoppingBag />
            <span>Cart</span>
          </Link>
        </li> }

        { currentUser.isAdmin &&
            <li key="7" className="nav-text">
              <Link to="/admin">
                <AiIcons.AiFillCrown />
                <span>Admin Panel</span>
              </Link>
            </li> }

          </ul>
        </nav>
        </IconContext.Provider>
    </>
  );
  
}

export default TestNavbar;