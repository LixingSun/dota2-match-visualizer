import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

interface IMenuItem {
  key: string;
  icon: React.ReactElement;
  label: string;
}
const menuItems: IMenuItem[] = [
  {
    key: '0',
    icon: <VideoCameraOutlined />,
    label: 'Match',
  },
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Players',
  },
];

function App() {
  const [count, setCount] = useState(0);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div
            style={{
              height: '32px',
              margin: '16px',
              background: '#fff3',
              borderRadius: '6px',
            }}
          />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['0']}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}></Header>
          <Content
            style={{
              margin: '24px 16px 0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>
              <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©Dota2 Match Visualizer
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
