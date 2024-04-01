import PropTypes from 'prop-types';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ item, key }) => {
  return (
    <ListItem key={key} disablePadding>
      <Link to={item.path}>
        <ListItemButton>
          <ListItemIcon>{item.Icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
};

export default NavItem;
