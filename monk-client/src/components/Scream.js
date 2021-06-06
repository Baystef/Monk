import { createElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Comment, Tooltip, Avatar, Divider } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, CommentOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDistance, subDays, format } from 'date-fns';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

import DeleteScream from './DeleteScream';

const style = {
  likeButton: {
    marginRight: '10px',
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'color 0.3s',
    userSelect: 'none',
  }
}

const Scream = ({ scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } }) => {
  const { likes, authenticated, credentials: { handle } } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const likedScream = () => {
    if (likes && likes.find(like => like.screamId === screamId)) {
      return true;
    } else return false;
  }

  const like = () => {
    dispatch(likeScream(screamId))
  };

  const dislike = () => {
    dispatch(unlikeScream(screamId))
  };

  const likeButton = () => !authenticated ? (
    <Tooltip key="like" title="Like">
      <Link to="/login" style={style.likeButton}>
        {createElement(LikeOutlined)}
        {" "}
        <span className="comment-action">{likeCount}</span>
      </Link>
    </Tooltip>
  ) : (
    <Tooltip key="like" title={likedScream() ? 'Unlike' : 'Like'}>
      <span onClick={likedScream() ? dislike : like}>
        {createElement(likedScream() ? LikeFilled : LikeOutlined)}
        {" "}
        <span className="comment-action">{likeCount}</span>
      </span>
    </Tooltip>
  )

  const deleteButton = () => authenticated && userHandle === handle ? (
    
    <DeleteScream screamId={screamId} />
    // <Tooltip key="delete" title="Delete">
    //   <span onClick={likedScream() ? dislike : like}>
    //     {createElement(DeleteOutlined)}
    //   </span>
    // </Tooltip>
  ) : null


  const actions = [
    likeButton(),
    <Tooltip key="comment-basic-dislike" title="Comment">
      {/* <span onClick={dislike}> */}
      <CommentOutlined />
      {" "}
      <span className="comment-action">{commentCount}</span>
      {/* </span> */}
    </Tooltip>,
    deleteButton(),
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
          <Tooltip title={format(new Date(createdAt), 'yyyy-MM-dd HH:mm')}>
            <span>{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}</span>
          </Tooltip>
        }
      />
      <Divider />
    </>
  );
}

export default Scream;
