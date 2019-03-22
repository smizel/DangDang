import React from 'react';
import {
  Table,
  Tag,
  Divider,
} from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '手机号',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: '账号',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '密码',
  dataIndex: 'password',
  key: 'password',
}, {
  title: '权限',
  dataIndex: 'permission',
  key: 'permission',
  render:
    permission => (
      <div style={{ width: '250px' }}>
        {permission.map(tag => <Tag style={{ margin: '2px' }} color="blue" key={tag}>{tag}</Tag>)}
      </div>),
}, {
  title: '操作',
  key: 'key',
  render: key => (
    <span>
      <a onClick={()=>{
        console.log(key)
      }}
      >修改
      </a>
      <Divider type="vertical" />
      <a href="">删除</a>
    </span>
  ),
}];


export default ({ dataSource }) => (
  <Table dataSource={dataSource} columns={columns}/>
);
