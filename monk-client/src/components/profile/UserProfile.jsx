import PropTypes from 'prop-types';
import { Card, Avatar, Typography, Tooltip, Divider } from 'antd';
import { EditOutlined, SettingOutlined, EnvironmentFilled, CloudFilled, CalendarFilled, PoweroffOutlined } from '@ant-design/icons';
import { generateFromString } from 'generate-avatar';
import { format } from 'date-fns';

const { Meta } = Card;
const { Title } = Typography;

const style = {
  coverContainer: {
    width: 300,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'contain'
  }
}

const UserProfile = ({ profile }) => {
  const { handle, createdAt, imageUrl, bio, website, location } = profile;
  
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

  
  return ( 
    <Card
    style={{ width: 300 }}
    cover={
      <div style={style.coverContainer}>
        <img
          alt="profile"
          src={imageUrl}
          style={style.profileImage}
        />
      </div>
    }
    actions={[
      // <SettingOutlined key="setting" />,
      // <EditProfile key="edit profile" />,
      // <Tooltip title="Logout" placement="top">
      //   <PoweroffOutlined onClick={handleLogout} key="logout" style={{ color: 'red' }} />
      // </Tooltip>,
    ]}
  >

    <Meta
      avatar={<Avatar src={`data:image/svg+xml;utf8,${generateFromString(handle)}`} alt="Avatar" />}
      title={<Title level={4}>@{handle}</Title>}
      description={profileDetails}
    />
  </Card>
   );
}

UserProfile.propTypes = {
  profile: PropTypes.object.isRequired
}

export default UserProfile;