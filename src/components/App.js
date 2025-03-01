import React, { useState, memo } from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import { useSelector } from "react-redux"

import paths from '../paths'

import { Layout } from "antd"

import Header from './shared/Header'
import Drawer from './shared/Drawer'
import Footer from './shared/Footer'

import './App.scss'
import 'antd/dist/antd.css'

export default memo(withRouter(function App(props) {

  const auth = useSelector(state => state.auth)

  const [isDrawerOpen, setDrawer] = useState(false)

  return (
    <Layout className="layout">
      <Header {...props} paths={paths} drawer={{ isDrawerOpen, setDrawer }} />
      <Drawer {...props} paths={paths} drawer={{ isDrawerOpen, setDrawer }} />
      <Layout.Content className='content'>
        <Switch>
          {window.scrollTo(0, 0)}
          {paths.map((path) => <Route key={path.slug} exact={path.exact} path={path.route} component={path.component} />)}
        </Switch>
      </Layout.Content>
      {window.location.pathname.replaceAll('/', '') !== 'login' && <Footer {...props} paths={paths} />}
    </Layout>
  );

}));
