import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { generateFromString } from 'generate-avatar';
import { Card, Avatar, Typography, Button, message, Tooltip, Divider } from 'antd';
import { EditOutlined, SettingOutlined, EnvironmentFilled, CloudFilled, CalendarFilled, PoweroffOutlined } from '@ant-design/icons';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

import EditProfile from './EditProfile';
import ProfileSkeleton from '../../util/ProfileSkeleton';

const { Meta } = Card;
const { Title } = Typography;

const style = {
  notLoggedIn: {
    padding: '15px',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center'
  },
  coverContainer: {
    width: 300,
    position: 'relative',
  },
  uploadContainer: {
    position: 'absolute',
    bottom: '2%',
    right: '2%'
  },
  profileImage: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'contain'
  }
}


const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated } = useSelector(state => state.user);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    dispatch(uploadImage(formData))
  }

  const handleClickUpload = () => {
    const fileInput = document.querySelector('#uploadImage');
    fileInput.click();
  }

  const handleLogout = () => {
    dispatch(logoutUser(history))
  }

  const profileDetails = (
    <>
      {bio ? bio : null}
      {website ?
        (
          <>
           <Divider />
            <CloudFilled /> 
            <a href={website} target="_blank" rel="noopener noreferrer">
              {' '}{website}
            </a>
            <Divider />
          </>
        )
        : null}
      {location ?
        (
          <>
            <EnvironmentFilled /> <span>{location}</span>
            <Divider />
          </>
        )
        : null}
      {createdAt && <>
        <CalendarFilled /> {' '} <span>Joined {format(new Date(createdAt), 'MM yyyy')}</span>
      </>}
    </>
  )

  const profileMarkup = !loading ? (authenticated ? (
    <Card
      style={{ width: 300 }}
      cover={
        <div style={style.coverContainer}>
          <img
            alt="profile"
            src={imageUrl}
            style={style.profileImage}
          />
          <div style={style.uploadContainer}>
            <Tooltip placement="bottom" title={'Upload new image'}>
              <input onChange={handleImageChange} type="file" name="uploadImage" id="uploadImage" style={{ display: 'none' }} />
              <Button onClick={handleClickUpload} type="ghost" icon={<EditOutlined />} shape="circle" />
            </Tooltip>
          </div>
        </div>
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditProfile key="edit profile" />,
        <Tooltip title="Logout" placement="top">
          <PoweroffOutlined onClick={handleLogout} key="logout" style={{ color: 'red' }} />
        </Tooltip>,
      ]}
    >

      <Meta
        avatar={<Avatar src={`data:image/svg+xml;utf8,${generateFromString(handle)}`} alt="Avatar" />}
        title={<Link to={`/users/${handle}`}>@{handle}</Link>}
        description={profileDetails}
      />
    </Card>
  ) : (
    <div style={style.notLoggedIn}>
      <Card title="Guest" style={{ width: 200, textAlign: 'center' }}>
        <Title level={2}>No profile found, please login</Title>
        <div style={style.buttons}>
          <Button type="primary">
            <Link to="/login">
              Login
            </Link>
          </Button>
          {" "}
          <Button>
            <Link to="/signup">
              Signup
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )) : (<ProfileSkeleton />)

  return profileMarkup
}

export default Profile;
