import React, { Component } from 'react';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { List, Card, Row, Col, Form, Input, Modal, Select, Upload, Icon, message } from 'antd';
import bannerStore from '../../store/bannerStore';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { uploadFile } from '../../utils/api';

const { Meta } = Card;
const { Option } = Select;
const FormItem = Form.Item;

@observer
class Banner extends Component {
  state = {
    visible: false,
    previewVisible: false,
    previewImage: '',
    goodsSkuImg: [],
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  @action.bound
  componentWillMount() {
    return bannerStore.load();
  }

  // 取消上传
  handleCancel = () => this.setState({ visible: false });

  //预览
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  // 取消预览
  imgCancel = () => this.setState({ previewVisible: false });

  //上传
  handleChange = file => {
    uploadFile(file).then(uploadResp => {
      console.log(uploadResp);
      if (uploadResp.data.status === 1) {
        const publicUrl = uploadResp.data.data;
        this.setState({
          goodsSkuImg: [
            {
              uid: publicUrl,
              name: file.name,
              status: 'done',
              url: publicUrl,
            },
          ],
        });

        bannerStore.image = publicUrl;
      }
    });
  };

  //移除
  handleRemove() {
    this.setState({
      goodsSkuImg: [],
    });
  }

  // 选择是否上架
  valueChange = value => {
    bannerStore.isshow = value;
  };

  handleOk = () => {
    if (
      bannerStore.title !== '' &&
      bannerStore.alt !== '' &&
      bannerStore.isshow !== '' &&
      this.state.goodsSkuImg.length !== 0
    ) {
      return bannerStore.add_banner();
    } else {
      message.error('您有信息未收入');
    }
  };

  render() {
    console.log(bannerStore.inshow);
    console.log(bannerStore.show);

    const { previewVisible, previewImage, goodsSkuImg } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // @ts-ignore
    const getModalContent = () => (
      <Form>
        <FormItem label="轮播图标题" {...this.formLayout}>
          <Input
            placeholder="请输入"
            onChange={value => {
              bannerStore.title = value.target.value;
            }}
          />
        </FormItem>
        <FormItem label="轮播图描述" {...this.formLayout}>
          <Input
            placeholder="请输入"
            onChange={value => {
              bannerStore.alt = value.target.value;
            }}
          />
        </FormItem>
        <FormItem label="上传轮播图" {...this.formLayout}>
          {/* 上传图片*/}
          <div className="clearfix">
            <Upload
              listType="picture-card"
              fileList={goodsSkuImg}
              onPreview={this.handlePreview}
              beforeUpload={event => {
                return this.handleChange(event, 'goodsSkuImg');
              }}
              onRemove={changeEvent => {
                return this.handleRemove(changeEvent, 'goodsSkuImg');
              }}
              accept="image/*"
            >
              {goodsSkuImg.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.imgCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </FormItem>
        <FormItem label="是否上架" {...this.formLayout}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="选择是否上架"
            optionFilterProp="children"
            onChange={this.valueChange}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
        </FormItem>
      </Form>
    );

    return (
      <PageHeaderWrapper>
        <Card
          style={{ width: '100%' }}
          title="轮播图"
          extra={<a onClick={() => this.setState({ visible: true })}>添加</a>}
        >
          <Card title="已上架">
            <List
              grid={{ gutter: 15, column: 3 }}
              dataSource={bannerStore.show}
              renderItem={item => (
                <List.Item
                  extra={
                    <Card
                      hoverable={true}
                      style={{ width: '100%' }}
                      cover={<img alt="example" src={item.href} style={{ height: '170' }} />}
                    >
                      <Meta title={item.title} description={item.description} />
                    </Card>
                  }
                >
                  <Row type="flex" justify="space-around">
                    <Col span={12}>
                      <a
                        onClick={() => {
                          bannerStore.bid = item.id;
                          bannerStore.status = 0;
                          return bannerStore.change_banner();
                        }}
                      >
                        下架
                      </a>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      <a
                        onClick={() => {
                          bannerStore.bid = item.id;
                          return bannerStore.delete_banner();
                        }}
                      >
                        删除
                      </a>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Card>

          <Card title="未上架">
            <List
              grid={{ gutter: 15, column: 3 }}
              dataSource={bannerStore.inshow}
              renderItem={item => (
                <List.Item
                  extra={
                    <Card
                      hoverable={true}
                      style={{ width: '100%' }}
                      cover={<img alt="example" src={item.href} style={{ height: '170' }} />}
                    >
                      <Meta title={item.title} description={item.description} />
                    </Card>
                  }
                >
                  <Row type="flex" justify="space-around">
                    <Col span={12}>
                      <a
                        onClick={() => {
                          bannerStore.bid = item.id;
                          bannerStore.status = 1;
                          return bannerStore.change_banner();
                        }}
                      >
                        上架
                      </a>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      <a
                        onClick={() => {
                          bannerStore.bid = item.id;
                          return bannerStore.delete_banner();
                        }}
                      >
                        删除
                      </a>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Card>
        </Card>
        <Modal
          title="添加轮播图"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Banner;
