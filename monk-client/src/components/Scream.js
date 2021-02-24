import { createElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { Comment, Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, CommentOutlined } from '@ant-design/icons';
import { formatDistance, subDays, format } from 'date-fns';

const Scream = ({ scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [action, setAction] = useState(null);


  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        {" "}
        <span className="comment-action">{likeCount}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        {" "}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Comment">
      <span onClick={dislike}>
        <CommentOutlined />
        {" "}
        <span className="comment-action">{commentCount}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
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
        <Tooltip title={format(new Date(createdAt), 'yyyy-MM-dd HH:mm')}>
          <span>{formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })}</span>
        </Tooltip>
      }
    />
  );
}

export default Scream;
