import { useEffect, useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconUserPlus,
  IconUserEdit,
} from '@tabler/icons-react';
import logo from '../../assets/logo.png';
import classes from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';

const data = [
  { link: '/', label: 'All Employees', icon: IconUserEdit },
  { link: '/add-employee', label: 'Add Employees', icon: IconUserPlus },
];

export function Navbar() {
  const [active, setActive] = useState('All Employees');

  useEffect(() => {
    navigate('/');
  }, [])
  
  

  const navigate = useNavigate();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={2} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar} >
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
        <img src={logo} alt="Your Logo" height="50" width={100} />
          <Code fw={700}>v1.0.0</Code>
        </Group>
        {links}
      </div>
    </nav>
  );
}
