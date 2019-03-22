import React, { Component } from 'react';
import { Card, Input, Modal, Form, Checkbox, Row, Col, Table, Divider, Tag, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../BannerManage/Banner.less';
import { _admin_insert } from '@/utils/api';
import { _admin_show } from '@/utils/api';
import adminStore from '../../store/adminStore';
import { observer } from 'mobx-react';
import { action, toJS } from 'mobx';

const { Search } = Input;
const FormItem = Form.Item;

const tabList = [
  {
    key: 'tab1',
    tab: '超级管理员',
  },
  {
    key: 'tab2',
    tab: '子管理员',
  },
];

@observer
class UserManage extends Component {
  state = {
    key: 'tab1',
    visible: false,
    visible1: false,
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  @action.bound
  componentWillMount() {
    return adminStore.admin_show();
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  static onChange(checkedValues) {
    adminStore.power_ids = checkedValues;
  }

  // 添加管理员点击确认
  @action.bound
  handleOk = () => {
    this.setState({
      visible: false,
    });

    const { name, mobile, password, power_ids } = adminStore;

    if (name !== '' && mobile !== '' && password !== '' && power_ids.length !== 0) {
      return adminStore.admin_insert();
    } else {
      message.error('信息未输全');
    }
  };

  // 添加管理员点击取消
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // 修改用户点击确认
  @action.bound
  handleOk1 = () => {
    this.setState({
      visible1: false,
    });
    const { name, mobile, password, power_ids } = adminStore;

    if (name !== '' && mobile !== '' && password !== '' && power_ids.length !== 0) {
      return adminStore.admin_update();
    } else {
      message.error('信息未输全');
    }
  };

  // 修改用户点击取消
  handleCancel1 = () => {
    this.setState({
      visible1: false,
    });
  };

  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '账号',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: '权限',
        dataIndex: 'permission_name',
        key: 'permission_name',
        render: permission => (
          <div style={{ width: '250px' }}>
            {permission.map(tag => (
              <Tag style={{ margin: '2px' }} color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        ),
      },
      {
        title: '操作',
        key: 'key',
        render: key => (
          <span>
            <a
              onClick={() => {
                this.setState({
                  visible1: true,
                });
                adminStore.id = key.key;
                adminStore.name = key.name;
                adminStore.mobile = key.phone;
                adminStore.password = key.password;
                adminStore.power_ids = key.permission;
              }}
            >
              修改
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                adminStore.id = key.key;
                return adminStore.admin_delete();
              }}
            >
              删除
            </a>
          </span>
        ),
      },
    ];

    const contentList = {
      // 超级管理员
      tab1: <Table dataSource={adminStore.dataSource1} columns={columns} />,
      // 普通管理员
      tab2: <Table dataSource={adminStore.dataSource2} columns={columns} />,
    };

    // 搜索
    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入手机号"
          onSearch={value => {
            adminStore.mobile = value;
            adminStore.name = '';
            return adminStore.admin_show();
          }}
        />

        <Search
          className={styles.extraContentSearch}
          placeholder="请输入姓名"
          onSearch={value => {
            adminStore.mobile = '';
            adminStore.name = value;
            return adminStore.admin_show();
          }}
        />

        <a
          className={styles.extraContentSearch}
          onClick={() => {
            this.setState({
              visible: true,
            });
          }}
        >
          添加记录
        </a>
      </div>
    );

    // 管理员添加
    const getModalContent = () => (
      <Form>
        <FormItem label="管理员姓名" {...this.formLayout}>
          <Input
            placeholder="请输入"
            onChange={value => {
              adminStore.name = value.target.value;
            }}
          />
        </FormItem>
        <FormItem label="手机号" {...this.formLayout}>
          <Input
            placeholder="请输入"
            onChange={value => {
              adminStore.mobile = value.target.value;
            }}
          />
        </FormItem>
        <FormItem label="账号" {...this.formLayout}>
          <Input placeholder="请输入" value={adminStore.mobile} />
        </FormItem>
        <FormItem label="密码" {...this.formLayout}>
          <Input
            placeholder="请输入"
            onChange={value => {
              adminStore.password = value.target.value;
            }}
          />
        </FormItem>
        <FormItem label="权限" {...this.formLayout}>
          <Checkbox.Group style={{ width: '100%' }} onChange={UserManage.onChange}>
            <Row>
              <Col span={8}>
                <Checkbox value="1">用户管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="2">文章管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="3">轮播图管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="4">预约管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="5">体征管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="6">用药管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="7">护理管理</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </FormItem>
      </Form>
    );

    // 修改管理员
    const getModalContent1 = () => (
      <Form>
        <FormItem label="管理员姓名" {...this.formLayout}>
          <Input
            placeholder="请输入"
            value={adminStore.name}
            onChange={value => {
              adminStore.name = value.target.value;
            }}
          />
        </FormItem>
        <FormItem label="手机号" {...this.formLayout}>
          <Input
            placeholder="请输入"
            value={adminStore.mobile}
            onChange={value => {
              adminStore.mobile = value.target.value;
            }}
          />
        </FormItem>
        <FormItem label="账号" {...this.formLayout}>
          <Input placeholder="请输入" value={adminStore.mobile} />
        </FormItem>
        <FormItem label="密码" {...this.formLayout}>
          <Input
            placeholder="请输入"
            value={adminStore.password}
            onChange={value => {
              adminStore.password = value.target.value;
            }}
          />
        </FormItem>
        <FormItem label="权限" {...this.formLayout}>
          <Checkbox.Group
            style={{ width: '100%' }}
            value={adminStore.power_ids}
            onChange={UserManage.onChange}
          >
            <Row>
              <Col span={8}>
                <Checkbox value="1">用户管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="2">文章管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="3">轮播图管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="4">预约管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="5">体征管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="6">用药管理</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="7">护理管理</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </FormItem>
      </Form>
    );

    return (
      <PageHeaderWrapper>
        <Card
          style={{ width: '100%' }}
          title="角色管理"
          extra={extraContent}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
          {contentList[this.state.key]}
        </Card>
        <Modal
          title="添加管理员"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
        >
          {getModalContent()}
        </Modal>

        <Modal
          title="修改管理员"
          visible={this.state.visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
          width={700}
        >
          {getModalContent1()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default UserManage;
