import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { Input, Form, Button, Comment, Avatar } from 'antd';
import { submitComment } from "../../redux/actions/dataActions";

const { TextArea } = Input;

const style = {
  formStyle: {
    marginBottom: '10px'
  }
}

const Editor = ({ onChange, onSubmit, loading, value }) => (
  <>
    <Form.Item style={style.formStyle}>
      <TextArea rows={2} onChange={onChange} name='body' value={value} />
    </Form.Item>
    <Form.Item style={style.formStyle} className="post-comment--btn">
      <Button htmlType="submit" loading={loading} onClick={onSubmit} type="primary">
        Post
      </Button>
    </Form.Item>
  </>
);

const CommentForm = ({ screamId }) => {
  const [state, setState] = useState({ body: '' });
  const [uiErrors, setUIerrors] = useState({});
  const dispatch = useDispatch();
  const { errors } = useSelector(state => state.UI);
  const { loading } = useSelector(state => state.data);
  const { credentials: { imageUrl }, authenticated } = useSelector(state => state.user);

  useEffect(() => {
    setUIerrors(errors)
    if (!loading) setState({ body: '' })
  }, [errors, loading])

  const handleChange = ({ target: { name, value } }) => {
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = () => {
    dispatch(submitComment(screamId, state))
  }

  const formMarkup = authenticated ? (
    <Comment
      avatar={
        <Avatar
          src={imageUrl}
          alt="Avatar"
        />
      }
      content={
        <Editor
          loading={loading}
          value={state.body}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      }
    />
  ) : null

  return formMarkup;
}

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired
}

export default CommentForm;