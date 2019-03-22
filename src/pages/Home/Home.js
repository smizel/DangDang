import React, { Component } from 'react';
import {
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress,
  TimelineChart,
  WaterWave,
  Bar,
} from '../../components/Charts';
import Trend from '../../components/Trend';
import { Row, Col, Icon, Tooltip, Card } from 'antd';
import numeral from 'numeral';
import moment from 'moment';
import router from 'umi/router';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

class Home extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    const auth = localStorage.getItem('authority');
    if (token === null || auth === null || token === undefined || auth === undefined) {
      router.push('/user/login');
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={24} style={{ padding: 10, textAlign: 'center' }}>
            <div style={{ fontSize: '20px' }}>北京挡挡美装饰工程有限公司</div>
          </Col>
          <Col span={8} style={{ padding: 10 }}>
            <ChartCard
              title="用户注册数量"
              total={numeral(594).format('0,0')}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              footer={<Field label="日访问量" value={numeral(763).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea line height={46} data={visitData} />
            </ChartCard>
          </Col>

          <Col span={8} style={{ padding: 10 }}>
            <ChartCard
              title="访问量"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(886).format('0,0')}
              footer={<Field label="日访问量" value={numeral(459).format('0,0')} />}
              contentHeight={46}
            >
              <MiniBar height={46} data={visitData} />
            </ChartCard>
          </Col>

          <Col span={8} style={{ padding: 10 }}>
            <ChartCard
              title="用户活跃数"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="78%"
              footer={
                <div>
                  <span>
                    周同比
                    <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                      12%
                    </Trend>
                  </span>
                  <span style={{ marginLeft: 16 }}>
                    日环比
                    <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                      11%
                    </Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} />
            </ChartCard>
          </Col>

          <Col span={16} style={{ padding: 10 }}>
            <TimelineChart
              height={200}
              data={chartData}
              titleMap={{ y1: '用户数量预测', y2: '预约次数预测' }}
            />
          </Col>

          <Col span={8} style={{ padding: 10 }}>
            <Card style={{ textAlign: 'center' }}>
              <WaterWave height={175} title="服务评价" percent={89} />
            </Card>
          </Col>

          <Col span={24} style={{ padding: 10 }}>
            <Card>
              <Bar height={200} title="用药量趋势" data={salesData} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
