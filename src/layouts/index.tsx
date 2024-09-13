import React, { useState } from 'react';
import { Link, Outlet } from 'umi';
import styles from './index.less';
import { Layout, theme, Menu} from 'antd';
import type { MenuProps } from 'antd';

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export default function App() {
  const items: MenuItem[] =[
    {
      label:(
        <Link to="/">Home</Link>
      ),
      key: "home"
    },
    {
      label:(
        <Link to="/docs">Docs</Link>
      ),
      key: "docs"
    },
    {
      label:(
        <Link to="/vcr">VCR</Link>
      ),
      key: "vcr"
    },
  ];

  const getSubPageName = () => {
    var pageName = window.location.pathname.split('/')[1] || 'home';
    return pageName;
  };

  return (
    <>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[getSubPageName()]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
      </Layout>
    </>
  );
}
