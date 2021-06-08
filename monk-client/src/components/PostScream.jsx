import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Modal, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { postScream, clearErrors } from '../redux/actions/dataActions';

const { TextArea } = Input;

const PostScream = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uiErrors, setUIerrors] = useState({});
  const [state, setState] = useState('');
  const dispatch = useDispatch();
  const { loading, errors } = useSelector(state => state.UI);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(clearErrors())
  };

  const reset = () => {
    setState('');
    handleCancel();
    setUIerrors({})
  }

  const handleChange = ({ target: { value } }) => {
    setState(value);
  }

  const handleSubmit = () => {
    dispatch(postScream({ body: state }, reset));
  }

  useEffect(() => {
    setUIerrors(errors)
  }, [errors])

  return (
    <>
      <Tooltip title="Post a Scream" placement="top">
        <div className="ant-menu-item" onClick={showModal}>
          <PlusOutlined />
        </div>
      </Tooltip>

      <Modal
        title="Post New Scream"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
            Post
          </Button>
        ]}
      >
        <TextArea
          placeholder="What's on your mind?"
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={state}
          onChange={handleChange}
          onError={errors?.body}
        />
      </Modal>
    </>
  );
}

export default PostScream;
