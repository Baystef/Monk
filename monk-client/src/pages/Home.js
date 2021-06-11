import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Layout } from 'antd';
import { getAllScreams } from '../redux/actions/dataActions';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';

const { Content } = Layout;

const style = { padding: '8px' };
const Home = () => {
  const dispatch = useDispatch();
  const { screams } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(getAllScreams())
  }, [dispatch])

  const recentScreams = screams.length !== 0 ? (
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
          <div style={style}><Profile /></div>
        </Col>
        <Col className="gutter-row" sm={16} xs={24}>
          <div style={{ ...style, paddingLeft: '12px' }}>{recentScreams}</div>
        </Col>
      </Row>
    </Content>
  )
}

export default Home;
