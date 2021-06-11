import PropTypes from 'prop-types';
import { List, Comment } from 'antd';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';



const Comments = ({ comments }) => {
  return (
      <List
        className="comments-list"
        header={`${comments?.length} ${comments?.length > 1 ? 'comments' : 'comment'}`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={({ body, createdAt, userImage, userHandle }) => (
          <li>
            <Comment
              author={<Link to={`/user/${userHandle}`}>{userHandle}</Link>}
              avatar={userImage}
              content={body}
              datetime={formatDistance(!createdAt ? new Date() : new Date(createdAt), new Date(), { addSuffix: true })}
            />
          </li>
        )}
      />
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
}

export default Comments;
