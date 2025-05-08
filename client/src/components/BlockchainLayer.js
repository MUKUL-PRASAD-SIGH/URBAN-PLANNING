import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Modal, Input, message } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Web3 from 'web3';

const BlockchainLayer = () => {
  const [transactions, setTransactions] = useState([
    {
      id: '0x123...abc',
      type: 'Road Work',
      status: 'Verified',
      timestamp: '2023-11-15 14:30',
      location: 'Main Street',
      contractor: 'City Works Inc.',
    },
    {
      id: '0x456...def',
      type: 'Building Permit',
      status: 'Pending',
      timestamp: '2023-11-15 15:45',
      location: 'Downtown',
      contractor: 'Urban Builders',
    },
    {
      id: '0x789...ghi',
      type: 'Utility Update',
      status: 'Verified',
      timestamp: '2023-11-15 16:20',
      location: 'North District',
      contractor: 'PowerGrid Co.',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [verificationId, setVerificationId] = useState('');

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'Verified' ? 'green' : status === 'Pending' ? 'orange' : 'red';
        const icon = status === 'Verified' ? <CheckCircleOutlined /> : 
                    status === 'Pending' ? <ClockCircleOutlined /> : 
                    <ExclamationCircleOutlined />;
        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Contractor',
      dataIndex: 'contractor',
      key: 'contractor',
    },
  ];

  const handleVerify = () => {
    if (!verificationId) {
      message.error('Please enter a transaction ID');
      return;
    }

    // Simulate blockchain verification
    setTimeout(() => {
      message.success('Transaction verified successfully!');
      setIsModalVisible(false);
      setVerificationId('');
    }, 2000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card
        title="Blockchain Trust Layer"
        extra={
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Verify Transaction
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={transactions}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title="Verify Transaction"
        visible={isModalVisible}
        onOk={handleVerify}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="Enter Transaction ID"
          value={verificationId}
          onChange={(e) => setVerificationId(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default BlockchainLayer; 