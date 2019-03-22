import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      copyright={
        <Fragment>
          <Icon type="copyright" /> 北京挡挡美装饰工程有限公司
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
