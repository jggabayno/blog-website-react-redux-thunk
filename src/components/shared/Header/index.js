import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { logout, loadNotifications } from '../../../actions'
import makeStorage from '../../../utilities/storage';

import moment from 'moment'

import { Layout, Grid, Menu, Dropdown, Button, Badge, Comment, Avatar } from "antd";

import "./index.scss";

import { CgMenuRightAlt } from 'react-icons/cg';

export default function Header({ location, paths, drawer, ...props }) {

  const dispatchLogout = useDispatch()

  const onLogout = () => {
    dispatchLogout(logout())
    makeStorage().clearSession()
  }

  const auth = useSelector(state => state.auth)

  const { isLoggedIn, loggedData } = auth


  const notifications = useSelector(state => state.notifications)
  const dispatchNotifications = useDispatch()
  useEffect(() => {
    dispatchNotifications(loadNotifications())
  }, [dispatchNotifications])

  console.log('notifications', notifications)


  const { useBreakpoint } = Grid

  const breakpoint = useBreakpoint()
  const isMobile = breakpoint.xs




  function commentsNotif(row) {
    console.log('type', row.type)
    console.log('row', row)
      if (row.type) {
        return (
          <Comment

          style={{background: !row.read_at ? '#F2F2F2' : '#fff'}}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
           <>
            <p>
             {`${row.data && row.data[0]?.commenter?.name} commented to your post "${row.data[0] && row.data[0].body}"`}
            </p>
            <p style={{color:'#1890ff'}}> {moment(row.data && row.data[0].created_at).fromNow()}</p>
           </>
          }
 
        />
          // 

          // 
          )
      }
  }
  
  const menu = (
    <Menu>

      {notifications.data.map(row => (
        <Menu.Item key={row.id}>
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            {commentsNotif(row)} 
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );


  return (
    <Layout.Header className="header">
      Logo
      {isMobile
        ?
        <CgMenuRightAlt onClick={(e) => {
          e.preventDefault();
          drawer.setDrawer((prev) => !prev)
        }} />
        :
        (isLoggedIn ?
          <>

            <Dropdown overlay={menu} placement="bottomLeft" arrow trigger={['click']}>
              <Badge title={''} count={notifications.data.filter(row => row.read_at === null).length} style={{ backgroundColor: '#52c41a' }}
              offset={[15, 0]}
              >
                
                  Notifications
         
              </Badge>

            </Dropdown>
            <Menu mode="horizontal" className="menu">
              <Menu.Item>{loggedData?.user?.name}</Menu.Item>
              <Menu.Item onClick={onLogout}>Logout</Menu.Item>
            </Menu>
          </>
          :
          <span onClick={() => props.history.push('/login')}>LOGIN</span>
        )}
    </Layout.Header>
  );
}
