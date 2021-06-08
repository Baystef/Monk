import { createElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Tooltip } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { likeScream, unlikeScream } from '../redux/actions/dataActions';


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

const LikeButton = ({ screamId, likeCount }) => {
  const dispatch = useDispatch();
  const { likes, authenticated, } = useSelector(state => state.user);

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


  const likeButton = !authenticated ? (
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
  return likeButton;
}

LikeButton.propTypes = {
  screamId: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired
}
 
export default LikeButton;