import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Drawer } from "antd";

import "./index.scss";

export default memo(function cDrawer(props) {

  const { isDrawerOpen, setDrawer } = props.drawer

  return (
    <Drawer
      className="drawer"
      placement="top"
      visible={isDrawerOpen}
      closable={false}
      onClose={() => setDrawer(false)}
    >

      <Menu selectedKeys={[props.location.pathname]} onSelect={() => setDrawer(false)}>
        {props.paths.map((path) => (
          <Menu.Item key={path.route}>
            <NavLink to={path.route}>{path.slug}</NavLink>
          </Menu.Item>
        ))}
      </Menu>

    </Drawer>
  );
});
