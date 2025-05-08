import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { GlobalOutlined, SafetyCertificateOutlined, CameraOutlined } from '@ant-design/icons';
import DigitalTwin from './components/DigitalTwin';
import CityBrain from './components/CityBrain';
import BlockchainLayer from './components/BlockchainLayer';
import CommunityAR from './components/CommunityAR';
import 'antd/dist/reset.css';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function App() {
  const [selectedMenu, setSelectedMenu] = React.useState('digital-twin');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'digital-twin':
        return <DigitalTwin />;
      case 'city-brain':
        return <CityBrain />;
      case 'blockchain':
        return <BlockchainLayer />;
      case 'ar':
        return <CommunityAR />;
      default:
        return <DigitalTwin />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 24px' }}>
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            SynCity
          </Title>
          <span style={{ marginLeft: '16px', color: '#8c8c8c' }}>
            AI-Powered Digital Twin Platform
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            style={{ height: '100%', borderRight: 0 }}
            onSelect={({ key }) => setSelectedMenu(key)}
          >
            <Menu.Item key="digital-twin" icon={<GlobalOutlined />}>
              Digital Twin
            </Menu.Item>
            <Menu.Item key="city-brain" icon={<GlobalOutlined />}>
              City Brain
            </Menu.Item>
            <Menu.Item key="blockchain" icon={<SafetyCertificateOutlined />}>
              Blockchain Layer
            </Menu.Item>
            <Menu.Item key="ar" icon={<CameraOutlined />}>
              Community AR
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
              borderRadius: '4px',
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
