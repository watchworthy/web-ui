import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const TestChild: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [newTestChild, setNewTestChild] = useState({ name: '', parent_id: '' });
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedTestChild, setEditedTestChild] = useState({ id: '', name: '', testParentE_id: '' });
  const [testParents, setTestParents] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [parentNameFilter, setParentNameFilter] = useState<string>('');


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
  
    // Fetch test child data based on name and parentName filters
    axios
      .get(
        `http://localhost:8081/testchild?name=${filter}&parentName=${parentNameFilter}`
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [isCreateModalVisible, filter, parentNameFilter]); // Include both filter and parentNameFilter in the dependencies array
  


  // ...

// ...

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

  // Fetch test child data based on parent name filter
  axios
    .get(`http://localhost:8081/testchild?parentName=${filter}`)
    .then((response) => {
      setData(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
}, [isCreateModalVisible, filter]); // Include filter in the dependencies array

// ...



  const handleCreate = () => {
    // Send a POST request to create a new test child
    axios
    .post('http://localhost:8081/testchild', newTestChild)
    .then((response) => {
      // Handle success
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
        testParentE_id: editedTestChild.testParentE_id, // Update to match your API
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
      render: (text: any, record: { id: any; name: any; testParentE_id: any }) => (
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

  const editButton = (record: { id: any; name: any; testParentE_id: any }) => (
    <Button
      onClick={() => {
        setEditModalVisible(true);
        setEditedTestChild({
          id: record.id, 
          name: record.name,
          testParentE_id: record.testParentE_id,
        });
      }}
    >
      Edit
    </Button>
  );

  // Filter data based on the 'filter' state
  // Filter data based on the 'filter' state
const filteredData = data.filter((item) =>
item.name && item.name.toLowerCase().includes(filter.toLowerCase())
);



  return (
    <div>
      <h1>Player</h1>

      <Input
  placeholder="Filter by Parent Name"
  value={parentNameFilter}
  onChange={(e) => setParentNameFilter(e.target.value)}
/>

      <Input
        placeholder="Filter by Name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Button type="primary" onClick={() => setCreateModalVisible(true)}>
        Create Player
      </Button>
      <Table dataSource={filteredData} columns={columns} loading={loading} />
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
              value={editedTestChild.testParentE_id}
              onChange={(value) =>
                setEditedTestChild({ ...editedTestChild, testParentE_id: value })
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
