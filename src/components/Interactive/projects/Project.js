import { DeleteOutlined, EditOutlined, Folder } from '@mui/icons-material';
import React, { useState } from 'react';
import { listProject } from '../../../FakeData';
import { Button, Space, Table } from 'antd';

function Project({data}) {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataforaction,setDataforaction] = useState(listProject)

  const handleDelete = (id) => {
    setDataforaction(dataforaction.filter(item=>item.id !== id))
  }

  const handleEdit = (id) => {
    console.log(id)
  }

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Desciption',
      dataIndex: 'description',
    },
    {
      title: 'Time',
      dataIndex: 'time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined 
            onClick={() => handleEdit(record?.key)}
            style={{
              cursor:'pointer',
              color:'blue'
            }}
          />
          <DeleteOutlined onClick={() => handleDelete(record?.key)} 
          style={{
            cursor:'pointer',
            color:'red'
          }}/>
        </Space>
      ),
    },
  ];

  return (
    <div className='project'>
        <div>
          <div
            style={{
              marginBottom: 16,
            }}
          >
            <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
              Reload
            </Button>
            <span
              style={{
                marginLeft: 8,
              }}
            >
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>
          <Table 
            rowSelection={rowSelection} 
            columns={columns} 
            dataSource={dataforaction} 
            size={5}
          />
        </div>
    </div>
  )
}

export default Project