import React, { useState, useEffect } from 'react';
import { Card, List, Tag, Button, Modal, Space } from 'antd';
import { CameraOutlined, EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons';

const CommunityAR = () => {
  const [arActive, setArActive] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyPoints, setNearbyPoints] = useState([
    {
      id: 1,
      type: 'issue',
      title: 'Pothole Detected',
      description: 'Large pothole needs immediate attention',
      severity: 'high',
      votes: 15,
      location: 'Main Street',
      distance: '50m',
    },
    {
      id: 2,
      type: 'development',
      title: 'Smart Park Project',
      description: 'Upcoming green space with solar-powered amenities',
      severity: 'info',
      votes: 45,
      location: 'Downtown',
      distance: '150m',
    },
    {
      id: 3,
      type: 'alert',
      title: 'Air Quality Warning',
      description: 'Higher than normal PM2.5 levels detected',
      severity: 'warning',
      votes: 30,
      location: 'Industrial Zone',
      distance: '200m',
    },
  ]);

  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    // Simulate getting user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error('Error getting location:', error)
    );
  }, []);

  const handleStartAR = () => {
    setArActive(true);
    // In a real implementation, this would initialize AR.js or similar
  };

  const handleStopAR = () => {
    setArActive(false);
  };

  const handlePointClick = (point) => {
    setSelectedPoint(point);
  };

  const handleVote = (pointId) => {
    setNearbyPoints(points =>
      points.map(p =>
        p.id === pointId
          ? { ...p, votes: p.votes + 1 }
          : p
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card
        title="Community AR View"
        extra={
          <Button
            type={arActive ? 'default' : 'primary'}
            icon={<CameraOutlined />}
            onClick={arActive ? handleStopAR : handleStartAR}
          >
            {arActive ? 'Stop AR' : 'Start AR'}
          </Button>
        }
      >
        {arActive ? (
          <div style={{ 
            height: '400px', 
            background: '#000', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            marginBottom: '20px'
          }}>
            AR View Simulation
            {currentLocation && (
              <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                <Tag icon={<EnvironmentOutlined />}>
                  {`${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`}
                </Tag>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            Click "Start AR" to begin the augmented reality experience
          </div>
        )}

        <List
          itemLayout="horizontal"
          dataSource={nearbyPoints}
          renderItem={point => (
            <List.Item
              actions={[
                <Button 
                  type="text" 
                  onClick={() => handleVote(point.id)}
                >
                  👍 {point.votes}
                </Button>,
                <Button 
                  type="link" 
                  onClick={() => handlePointClick(point)}
                >
                  View Details
                </Button>
              ]}
            >
              <List.Item.Meta
                title={
                  <Space>
                    {point.title}
                    <Tag color={
                      point.severity === 'high' ? 'red' : 
                      point.severity === 'warning' ? 'orange' : 
                      'blue'
                    }>
                      {point.distance}
                    </Tag>
                  </Space>
                }
                description={point.description}
              />
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title={selectedPoint?.title}
        visible={!!selectedPoint}
        onCancel={() => setSelectedPoint(null)}
        footer={[
          <Button key="back" onClick={() => setSelectedPoint(null)}>
            Close
          </Button>,
          <Button 
            key="vote" 
            type="primary" 
            onClick={() => {
              handleVote(selectedPoint.id);
              setSelectedPoint(null);
            }}
          >
            Vote
          </Button>
        ]}
      >
        {selectedPoint && (
          <Space direction="vertical">
            <p>{selectedPoint.description}</p>
            <p>
              <EnvironmentOutlined /> Location: {selectedPoint.location}
            </p>
            <p>
              <InfoCircleOutlined /> Distance: {selectedPoint.distance}
            </p>
            <p>
              👍 Votes: {selectedPoint.votes}
            </p>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default CommunityAR; 