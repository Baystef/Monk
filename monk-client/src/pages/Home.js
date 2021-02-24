import { useState, useEffect } from 'react';
import { Row, Col, Layout } from 'antd';
import axios from 'axios';

import Scream from '../components/Scream';
const { Content } = Layout;

const style = { padding: '8px' };
const Home = () => {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    const getScreams = async () => {
      try {
        const { data } = await axios.get('/screams');
        setScreams(data)
      } catch (error) {
        console.log(error)
      }
    }

    getScreams()
  }, [])

  const recentScreams = screams ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : <p>Loading...</p>

  return (
    <Content
      className="chat-layout-background"
      style={{
        margin: '0 auto',
        maxWidth: 960,
      }}
    >
      <Row gutter={24}>
        <Col className="gutter-row" sm={8} xs={24}>
          <div style={style}>Profile...</div>
        </Col>
        <Col className="gutter-row" sm={16} xs={24}>
          <div style={{...style, paddingLeft: '12px'}}>{recentScreams}</div>
        </Col>
      </Row>
    </Content >
  )
}

export default Home;
