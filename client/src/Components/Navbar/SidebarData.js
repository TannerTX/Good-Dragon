import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    class: 'current',
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    class: 'current',
    title: 'Shop',
    path: '/shop',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    class: 'current',
    title: 'Account',
    path: '/login',
    icon: <IoIcons.IoIosPerson />,
    cName: 'nav-text'
  },
  {
    class: 'current',
    title: 'TESTING GROUNDS',
    path: '/testing',
    icon: <FaIcons.FaBattleNet />,
    cName: 'nav-text'
  }
];