// pages/test-parent.tsx

import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Row, Col, Card, Spin } from 'antd';
import axios from 'axios';

const TestParent : React.FC = () => {
  const [data, setData] = useState<any[]>([]); // Specify the type for your data
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [newTestParent, setNewTestParent] = useState({ name: '' });
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedTestParent, setEditedTestParent] = useState({ id: '', name: '' });

  useEffect(() => {
    axios.get('http://localhost:8081/testparent')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [isCreateModalVisible]);

  const handleCreate = () => {
    // Send a POST request to create a new test parent
    axios
      .post('http://localhost:8081/testparent', newTestParent)
      .then((response) => {
        // Handle success, maybe refresh the data or close the modal
        // You can also update the data array with the newly created record.
        setData([...data, response.data]);
        setCreateModalVisible(false);
      })
      .catch((error) => {
        console.error('Error creating test parent:', error);
      });
  };

  const handleEdit = () => {
    // Send a PUT request to update the test parent
    axios
      .put(`http://localhost:8081/testparent/${editedTestParent.id}`, { name: editedTestParent.name })
      .then(() => {
        // Handle success, maybe refresh the data or close the modal
        // You can also update the data array with the updated record.
        setEditModalVisible(false);
        const updatedData = data.map((item) => {
          if (item.id === editedTestParent.id) {
            return { ...item, name: editedTestParent.name };
          }
          return item;
        });
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error updating test parent:', error);
      });
  };

  const handleDelete = (id:number) => {
    // Send a DELETE request to delete the test parent
    axios
      .delete(`http://localhost:8081/testparent/${id}`)
      .then(() => {
        // Handle success, maybe refresh the data
        // You can also update the data array to remove the deleted record.
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error deleting test parent:', error);
      });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
    title: 'Actions',
    key: 'actions',
    render: (text: any, record: { id: any; name: any; }) => (
      <>
        {editButton(record)}
        {deleteButton(record)}
      </>
    ),
  },
  ];
  
  const deleteButton = (record: { id: number; }) => (
    <Button type="default" style={{backgroundColor:'red'}} onClick={() => handleDelete(record.id)}>Delete</Button>
  );
  
  const editButton = (record: { id: any; name: any; }) => (
    <Button onClick={() => {
      setEditModalVisible(true);
      setEditedTestParent({ id: record.id, name: record.name });
    }}>Edit</Button>
  );


  return (
    <div>
    
    <Button type="primary" onClick={() => setCreateModalVisible(true)}>
      Create Team
    </Button>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
      />
    <Modal
      title="Create Test Parent"
      visible={isCreateModalVisible}
      onOk={handleCreate}
      onCancel={() => setCreateModalVisible(false)}
    >
      <Form>
        <Form.Item label="Name">
          <Input
            value={newTestParent.name}
            onChange={(e) => setNewTestParent({ ...newTestParent, name: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Modal>

    <Modal
      title="Edit Test Parent"
      visible={isEditModalVisible}
      onOk={handleEdit}
      onCancel={() => setEditModalVisible(false)}
    >
      <Form>
        <Form.Item label="Name">
          <Input
            value={editedTestParent.name}
            onChange={(e) => setEditedTestParent({ ...editedTestParent, name: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Modal>
  </div>
  );
};


export default TestParent;
