import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip, Modal, Card, Typography, Space, Avatar, Skeleton } from "antd";
import { CommentOutlined, ExpandAltOutlined } from "@ant-design/icons";
import { format } from 'date-fns';
import { getScream } from '../redux/actions/dataActions';

import LikeButton from './LikeButton';

const { Meta } = Card;
const { Text } = Typography;

const ScreamDialog = ({ screamId, userHandle }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { scream: { body, createdAt, likeCount, commentCount, userImage } } = useSelector(state => state.data);
  const { loading } = useSelector(state => state.UI);

  const showModal = () => {
    dispatch(getScream(screamId))
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const screamDetails = (
    <>
      <Space direction="vertical">
        <Text type="secondary">{format(!createdAt ? new Date() : new Date(createdAt), 'PPPP')}</Text>

        <Text strong>{body}</Text>
      </Space>
    </>
  )

  const dialogBody =
    <Card
      style={{ width: '100%' }}
      actions={[
        <LikeButton screamId={screamId} likeCount={likeCount} />,
        <Tooltip key="comment-basic-dislike" title="Comment">
          <CommentOutlined />
          {" "}
          <span className="comment-action">{commentCount}</span>
        </Tooltip>,
        // <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={
            <Avatar size={100} alt="Profile" src={userImage} />
          }
          title={<Link to={`/users/${userHandle}`}>@{userHandle}</Link>}
          description={screamDetails}
        />
      </Skeleton>
    </Card>

  return (
    <>
      <Tooltip title="View Scream" placement="top">
        <ExpandAltOutlined onClick={showModal} />
      </Tooltip>

      <Modal
        title="Scream Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={400}
        footer={null}
      >
        {dialogBody}
      </Modal>
    </>
  );
}

ScreamDialog.propTypes = {
  userHandle: PropTypes.string.isRequired,
  screamId: PropTypes.string.isRequired,
}

export default ScreamDialog;
