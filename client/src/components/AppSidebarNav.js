import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { CBadge, CSidebarNav } from '@coreui/react';

const imgStyle = {
  filter: 'invert(100%) brightness(200%)', // Inverts colors to white
};

const activeNavItemStyle = {
  color: 'white',
  backgroundColor: '#2E5AAB',
};

export const AppSidebarNav = ({ items }) => {
  const navLink = (name, icon, badge, indent = false, isActive) => {
    const appliedImgStyle = isActive ? imgStyle : {};

    return (
      <>
        {icon ? (
          React.cloneElement(icon, {
            style: { ...icon.props.style, ...appliedImgStyle }, // Merge existing styles with appliedImgStyle
          })
        ) : (
          indent && (
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
          )
        )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <NavLink
            {...rest}
            className="nav-link"
            style={({ isActive }) => ({
              ...(isActive ? activeNavItemStyle : {}),
            })}
          >
            {({ isActive }) => navLink(name, icon, badge, indent, isActive)}
          </NavLink>
        ) : (
          <div>
            {navLink(name, icon, badge, indent, false)}
          </div>
        )}
      </Component>
    );
  };

  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item;
    const Component = component;
    return (
      <Component compact as="div" key={index} toggler={navLink(name, icon)} {...rest}>
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true)
        )}
      </Component>
    );
  };

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </CSidebarNav>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
