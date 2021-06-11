import { Menu, Dropdown, Tooltip, Badge, Typography } from 'antd';
import { NotificationFilled, LikeOutlined, CommentOutlined  } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { markNotificationsRead } from '../../redux/actions/userActions';
import { useEffect, useState } from 'react';

const { Text } = Typography;

const Notifications = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const notifications = useSelector(state => state.user.notifications);
 
  useEffect(() => {
    if (open) {
      onMenuOpen()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onMenuOpen = () => {
    let unreadNotifIds = notifications.filter(not => !not.read).map(not =>  not.notificationId);
    dispatch(markNotificationsRead(unreadNotifIds))
  }

  const notifLength = notifications.filter(not => not.read === false).length

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    notifLength > 0
      ? notificationIcon = (
        <Badge count={notifLength}>
          <NotificationFilled />
        </Badge>
      ) : (
        notificationIcon = <NotificationFilled />
      )
  } else {
    notificationIcon = <NotificationFilled />
  }

  const menu =
    <Menu>
      {notifications && notifications.length > 0 ? (
        notifications.map(not => {
          const verb = not.type === 'like' ? 'liked' : 'commented on';
          const time = formatDistance(new Date(not.createdAt), new Date(), { addSuffix: true })
          const iconColor = not.read ? '' : 'red'
          const icon = not.type === 'like' ? (
            <LikeOutlined style={{ color: `${iconColor}`, marginRight: 10 }} />
          ) : (
            <CommentOutlined style={{ color: `${iconColor}`, marginRight: 10 }} />
          )

          return (
            <Menu.Item key={not.createdAt} onClick={''}>
              {icon}
              <Link to={`/user/${not.recipient}/scream/${not.screamId}`}>
                <Text>
                  {not.sender} {verb} your scream {time}
                </Text>
              </Link>
            </Menu.Item>
          )
        })

      ) : (
        <Menu.Item>
          You have no notifications yet
        </Menu.Item>
      )}
    </Menu>

  return (
    <Dropdown onVisibleChange={() => setOpen(!open)} trigger={["click"]} overlay={menu} placement="bottomCenter" arrow>
      <Tooltip title="Notifications" placement="right">
      <div className="ant-menu-item">
        {notificationIcon}
      </div>
      </Tooltip>
    </Dropdown>
  );
}

export default Notifications;
