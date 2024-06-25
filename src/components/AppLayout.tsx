import { ReactNode } from 'react';
import './AppLayout.css';
import { Layout, Menu, Flex, Typography } from 'antd';
import { UserOutlined, TrophyOutlined, GithubFilled } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Link } = Typography;

interface IMenuItem {
  key: string;
  icon: React.ReactElement;
  label: string;
  disabled?: boolean;
}
const menuItems: IMenuItem[] = [
  {
    key: '0',
    icon: <TrophyOutlined />,
    label: 'Match',
  },
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Players',
    disabled: true,
  },
];

const AppLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
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
        <Content style={{ margin: '24px 16px' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>©dota2.oran.zone</Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
