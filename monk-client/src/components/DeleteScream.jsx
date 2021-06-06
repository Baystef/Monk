import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Popconfirm, message, Tooltip } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { deleteScream } from "../redux/actions/dataActions";

const DeleteScream = ({ screamId }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch();

  const removeScream = () => {
    dispatch(deleteScream(screamId))
  }

  const showPop = () => {
    setVisible(true);
  };

  const confirm = () => {
    removeScream();
    setVisible(false);
    // message.success('Scream Deleted');
  }

  const cancel = () => {
    setVisible(false);
  }

  return (
    <Popconfirm
      title="Are you sure to delete this?"
      onConfirm={confirm}
      onCancel={cancel}
      visible={visible}
      okText="Yes"
      cancelText="No"
    >
      <Tooltip key="delete" title="Delete">
        <DeleteOutlined onClick={showPop} style={{ color: 'red' }} />
      </Tooltip>
    </Popconfirm>
  );
}

DeleteScream.propTypes = {
  screamId: PropTypes.string.isRequired
}

export default DeleteScream;
