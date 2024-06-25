import './App.css';
import { Layout, Menu, ConfigProvider, Flex, Typography, theme } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  GithubFilled,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Link } = Typography;

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

const primaryBgColor = '#141414';

const customTheme = {
  algorithm: theme.darkAlgorithm,
  cssVar: true,
  token: {
    colorBgBase: '#000000',
    colorLink: '#FFFFFF',
  },
  components: {
    Layout: {
      headerBg: primaryBgColor,
      siderBg: primaryBgColor,
      footerBg: primaryBgColor,
    },
    Menu: {
      darkItemBg: primaryBgColor,
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0" id="layout__sider">
          <Title level={5} id="layout__title">
            Dota2 Match Visualizer
          </Title>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['0']}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header>
            <Flex align="center" justify="end" style={{ height: '100%' }}>
              <Link
                href="https://github.com/LixingSun/dota2-match-visualizer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubFilled alt="Github" style={{ fontSize: '24px' }} />
              </Link>
            </Flex>
          </Header>
          <Content
            style={{
              margin: '24px 16px 0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Placeholder
          </Content>
          <Footer style={{ textAlign: 'center' }}>©dota2.oran.zone</Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
