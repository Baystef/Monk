import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Comment, Tooltip, Avatar, Divider } from 'antd';
import { DislikeOutlined, CommentOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { formatDistance, format } from 'date-fns';

import LikeButton from './LikeButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';


const Scream = ({  scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }, openModal }) => {
  const { authenticated, credentials: { handle } } = useSelector(state => state.user);

  const deleteButton = () => authenticated && userHandle === handle ? (
    <DeleteScream screamId={screamId} />
  ) : null


  const actions = [
    <LikeButton screamId={screamId} likeCount={likeCount} />,
    <Tooltip key="comment-basic-dislike" title="Comment">
      <CommentOutlined />
      {" "}
      <span className="comment-action">{commentCount}</span>
    </Tooltip>,
    deleteButton(),
    <ScreamDialog screamId={screamId} userHandle={userHandle} openModal={openModal} />,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <>
      <Comment
        actions={actions}
        author={<Link to={`/user/${userHandle}`}>{userHandle}</Link>}
        avatar={
          <Avatar src={userImage} alt={userHandle} />
        }
        content={
          <p>
            {body}
          </p>
        }
        datetime={
          <Tooltip title={format(new Date(createdAt), 'PPPP')}>
            <span>{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}</span>
          </Tooltip>
        }
      />
      <Divider />
    </>
  );
}

Scream.propType = {
  openModal: PropTypes.bool
}

export default Scream;
