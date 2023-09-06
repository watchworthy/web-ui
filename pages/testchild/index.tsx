import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Row, Col, Card, Spin, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const TestChild: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // Specify the type for your data
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [newTestChild, setNewTestChild] = useState({ name: '', parent_id: '' });
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedTestChild, setEditedTestChild] = useState({ id: '', name: '', testParentId: '' });
  const [testParents, setTestParents] = useState<any[]>([]);

  useEffect(() => {
    // Fetch test parents' data from the API when the component mounts
    axios
      .get('http://localhost:8081/testparent')
      .then((response) => {
        setTestParents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching test parents:', error);
      });

    axios
      .get('http://localhost:8081/testchild')
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
    // Send a POST request to create a new test child
    axios
      .post('http://localhost:8081/testchild', newTestChild)
      .then((response) => {
        // Handle success, maybe refresh the data or close the modal
        // You can also update the data array with the newly created record.
        setCreateModalVisible(false);
        setData([...data, response.data]);
      })
      .catch((error) => {
        console.error('Error creating test child:', error);
      });
  };

  const handleEdit = () => {
    // Send a PUT request to update the test child
    axios
      .put(`http://localhost:8081/testchild/${editedTestChild.id}`, {
        name: editedTestChild.name,
        testParentId: editedTestChild.testParentId,
      })
      .then(() => {
        // Handle success, maybe refresh the data or close the modal
        // You can also update the data array with the updated record.
        setEditModalVisible(false);
        const updatedData = data.map((item) => {
          if (item.id === editedTestChild.id) {
            return { ...item, name: editedTestChild.name };
          }
          return item;
        });
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error updating test child:', error);
      });
  };

  const handleDelete = (id: number) => {
    // Send a DELETE request to delete the test child
    axios
      .delete(`http://localhost:8081/testchild/${id}`)
      .then(() => {
        // Handle success, maybe refresh the data
        // You can also update the data array to remove the deleted record.
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error deleting test child:', error);
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
      render: (text: any, record: { id: any; name: any; testParentId: any }) => (
        <>
          {editButton(record)}
          {deleteButton(record)}
        </>
      ),
    },
  ];

  const deleteButton = (record: { id: any }) => (
    <Button type="default" style={{backgroundColor: 'red'}} onClick={() => handleDelete(record.id)}>
      Delete
    </Button>
  );

  const editButton = (record: { id: any; name: any; testParentId: any }) => (
    <Button
      onClick={() => {
        setEditModalVisible(true);
        setEditedTestChild({
          id: record.id, 
          name: record.name,
          testParentId: record.testParentId,
        });
      }}
    >
      Edit
    </Button>
  );

  return (
    <div>
      <h1>Test Child</h1>
      <Button type="primary" onClick={() => setCreateModalVisible(true)}>
        Create Test Child
      </Button>
      <Table dataSource={data} columns={columns} loading={loading} />
      <Modal
        title="Create Test Child"
        visible={isCreateModalVisible}
        onOk={handleCreate}
        onCancel={() => setCreateModalVisible(false)}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              value={newTestChild.name}
              onChange={(e) =>
                setNewTestChild({ ...newTestChild, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Test Parent">
            <Select
              value={newTestChild.parent_id}
              onChange={(value) =>
                setNewTestChild({ ...newTestChild, parent_id: value })
              }
            >
              {testParents.map((parent) => (
                <Option key={parent.id} value={parent.id}>
                  {parent.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Test Child"
        visible={isEditModalVisible}
        onOk={handleEdit}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              value={editedTestChild.name}
              onChange={(e) =>
                setEditedTestChild({ ...editedTestChild, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Test Parent">
            <Select
              value={editedTestChild.testParentId}
              onChange={(value) =>
                setEditedTestChild({ ...editedTestChild, testParentId: value })
              }
            >
              {testParents.map((parent) => (
                <Option key={parent.id} value={parent.id}>
                  {parent.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TestChild;
