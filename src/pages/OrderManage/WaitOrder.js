import React, { Component } from 'react';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Card, Table, Divider, Tag, Input, Select, message } from 'antd';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import orderStore from '../../store/orderStore';

const { Search } = Input;
const { Option } = Select;

@observer
class WaitOrder extends Component {
  @action.bound
  componentWillMount() {

  }

  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '备注',
        dataIndex: 'more',
        key: 'more',
      },
      {
        title: '状态',
        key: 'tag',
        dataIndex: 'tag',
        render: tag => (
          <Tag color={tag[1]} key={tag}>
            {tag[0]}
          </Tag>
        ),
      },
      {
        title: '操作',
        key: 'key',
        render: key => (
          <span>
            <a
              onClick={() => {
                // orderStore.id = key.key;
                // orderStore.status = '1';
                // return orderStore.check_order();
              }}
            >
              通过
            </a>
            <Divider type="vertical"/>
            <a
              onClick={() => {
                // orderStore.id = key.key;
                // orderStore.status = '2';
                // return orderStore.check_order();
              }}
            >
              拒绝
            </a>
          </span>
        ),
      },
    ];


    const showorder = [
      {
        name:"aaa",
        phone:'12345234523',
        more:'',
        tag:['未审核','red']
      }
    ];



    return (
      <PageHeaderWrapper>
        <Card style={{ width: '100%' }} title="已审核">
          <Table
            columns={columns}
            dataSource={showorder}
            pagination={{ showTotal: total => `共 ${total} 条数据` }}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default WaitOrder;
