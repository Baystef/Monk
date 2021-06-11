import React, { useState, useEffect } from 'react';
import { Modal, Button, Tooltip, Form, Input } from 'antd';
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';


const EditProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState({ bio: '', website: '', location: '' })
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { credentials } = useSelector(state => state.user);
 
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = ({ target: { name, value } }) => {
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = () => {
    dispatch(editUserDetails(state));
    handleCancel()
  }

  useEffect(() => {
    for (let key in state) {
      setState(prevState => ({ ...prevState, [key]: credentials[key] }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Tooltip title="Edit Profile" placement="top">
        <EditOutlined onClick={showModal} />
      </Tooltip>

      <Modal title="Edit Profile" visible={isModalVisible} onOk={handleSubmit} onCancel={handleCancel}>
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Bio"
          >
            <Input name="bio" placeholder="Tell us about yourself..." value={state.bio} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Website"
          >
            <Input name="website" placeholder="Your website" value={state.website} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Location"
          >
            <Input name="location" placeholder="Where are you in the world?" value={state.location} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditProfile;
