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
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    class: 'current',
    title: 'Account',
    path: '/login',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    class: 'current',
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    class: 'current',
    title: 'TESTING GROUNDS',
    path: '/testing',
    icon: <FaIcons.FaBattleNet />,
    cName: 'nav-text'
  },
  {
    class: 'current',
    title: 'DATA',
    path: '/data',
    icon: <FaIcons.FaDev />,
    cName: 'nav-text'
  }
];