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
<<<<<<< HEAD
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    class: 'current',
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
=======
    icon: <IoIcons.IoIosPerson />,
>>>>>>> 42f5a31a97a7a53a218f6b12be3fef9ecc3ef2d1
    cName: 'nav-text'
  },
  {
    class: 'current',
    title: 'TESTING GROUNDS',
    path: '/testing',
    icon: <FaIcons.FaBattleNet />,
    cName: 'nav-text'
<<<<<<< HEAD
  },
  {
    class: 'current',
    title: 'DATA',
    path: '/data',
    icon: <FaIcons.FaDev />,
    cName: 'nav-text'
=======
>>>>>>> 42f5a31a97a7a53a218f6b12be3fef9ecc3ef2d1
  }
];