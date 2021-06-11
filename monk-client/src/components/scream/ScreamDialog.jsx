import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip, Modal, Card, Typography, Space, Avatar, Skeleton } from "antd";
import { CommentOutlined, ExpandAltOutlined } from "@ant-design/icons";
import { format } from 'date-fns';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const { Meta } = Card;
const { Text } = Typography;

const ScreamDialog = ({ screamId, userHandle, openModal }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paths, setPaths] = useState({ oldPath: '', newPath: '' })
  const dispatch = useDispatch();
  const { scream: { body, createdAt, likeCount, commentCount, userImage, comments } } = useSelector(state => state.data);
  const { loading } = useSelector(state => state.UI);

  const showModal = () => {
    let oldPath = window.location.pathname;
    const newPath = `/user/${userHandle}/scream/${screamId}`;
    if (oldPath === newPath) oldPath = `/user/${userHandle}`;
    window.history.pushState(null, null, newPath)
    setPaths({ oldPath, newPath })
    setIsModalVisible(true);
    dispatch(getScream(screamId))
  };

  const handleCancel = () => {
    window.history.pushState(null, null, paths.oldPath)
    setIsModalVisible(false);
    dispatch(clearErrors())
  };

  useEffect(() => {
    if (openModal) {
      showModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])

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
        width={500}
        footer={null}
      >
        {dialogBody}
        <CommentForm screamId={screamId} />
        {comments?.length > 0 && <Comments comments={comments} />}
      </Modal>
    </>
  );
}

ScreamDialog.propTypes = {
  userHandle: PropTypes.string.isRequired,
  screamId: PropTypes.string.isRequired,
  openModal: PropTypes.bool
}

export default ScreamDialog;
