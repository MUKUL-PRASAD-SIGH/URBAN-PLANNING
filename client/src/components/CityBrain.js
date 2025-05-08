import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Alert, Space } from 'antd';
import { ThunderboltOutlined, AlertOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CityBrain = () => {
  const [decisions, setDecisions] = useState([
    {
      id: 1,
      type: 'traffic',
      message: 'Traffic congestion detected on Main Street. Diverting vehicles to alternate routes.',
      severity: 'warning',
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      type: 'air',
      message: 'Air quality index rising in downtown. Activating air purification systems.',
      severity: 'info',
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 3,
      type: 'energy',
      message: 'Peak energy demand detected. Optimizing grid distribution.',
      severity: 'success',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [metrics, setMetrics] = useState({
    trafficFlow: '85%',
    airQuality: 'Moderate',
    energyUsage: '72%',
    waterLevel: 'Normal',
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        trafficFlow: `${Math.floor(Math.random() * 100)}%`,
        energyUsage: `${Math.floor(Math.random() * 100)}%`,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'traffic':
        return <ThunderboltOutlined style={{ color: '#faad14' }} />;
      case 'air':
        return <AlertOutlined style={{ color: '#1890ff' }} />;
      case 'energy':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>City Brain Dashboard</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="Real-time Metrics">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {Object.entries(metrics).map(([key, value]) => (
              <Card key={key} size="small">
                <Text strong>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                <br />
                <Text>{value}</Text>
              </Card>
            ))}
          </div>
        </Card>

        <Card title="Recent Decisions">
          <List
            dataSource={decisions}
            renderItem={item => (
              <List.Item>
                <Alert
                  message={
                    <Space>
                      {getIcon(item.type)}
                      {item.message}
                    </Space>
                  }
                  description={`Time: ${item.timestamp}`}
                  type={item.severity}
                  showIcon
                />
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </div>
  );
};

export default CityBrain; 