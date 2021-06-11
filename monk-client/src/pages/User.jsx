import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { get } from 'axios'
import { Row, Col, Layout } from "antd";
import { getUserData } from "../redux/actions/dataActions";

import Scream from "../components/scream/Scream";
import UserProfile from "../components/profile/UserProfile";
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

const { Content } = Layout;
const style = { padding: '8px' };

const User = () => {
  const [profile, setProfile] = useState(null)
  // const [screamIdParam, setScreamIdParam] = useState(null)
  const { screams, loading } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const { handle, screamId } = useParams();

  useEffect(() => {
    dispatch(getUserData(handle))
    get(`/user/${handle}`)
      .then(res => setProfile(res.data.user))
      .catch(err => console.log(err))
  }, [handle, dispatch])

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>No screams from this user yet</p>
  ) : screamId ? (

    screams.map(scream => {
      if (scream.screamId !== screamId) {
        return <Scream key={scream.screamId} scream={scream} />
      } else {
        return <Scream key={scream.screamId} scream={scream} openModal />
      }
    })
  ) : (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  )

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
          <div style={style}>{profile === null ? <ProfileSkeleton /> : <UserProfile profile={profile} />}</div>
        </Col>
        <Col className="gutter-row" sm={16} xs={24}>
          <div style={{ ...style, paddingLeft: '12px' }}>{screamsMarkup}</div>
        </Col>
      </Row>
    </Content>
  );
}

export default User;