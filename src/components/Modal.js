import React from 'react';
import PropTypes from 'react-proptypes';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
    Modal as AntdModal,
    Button,
    Row, 
    Col,
    Upload,
    Input,
    Icon,
    message,
} from 'antd';

import { GET_COUNTERS } from '../App.js';


function Modal(props) {
    const {
        newText,
        isModalVisible,
        onTextChange,
        onCancel,
        mutate,
    } = props;

    function onSave() {
        mutate({ 
            variables: { 
                text: newText
            },
            refetchQueries: [{ query: GET_COUNTERS }]
        });
        onCancel();
        message.success('New counter had been added!')
    }

    return (
        <AntdModal
          title="Basic Modal"
          visible={isModalVisible}
          onCancel={onCancel}
          footer={
            <Button onClick={() => onSave()}>Add Counter</Button>
          }
        >
            <div>
              <Row
                type="flex" 
                justify="space-between"
                align="middle"
              >
                <Col span={11}>
                  <Input
                    onChange={onTextChange}
                    value={newText}
                  />
                </Col>
                <Col span={11}>
                  <Upload>
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload>
                </Col>
              </Row>
            </div>
        </AntdModal>
    )
}

const CREATE_COUNTER = gql`
    mutation createCounter($text: String!){
        createCounter(data: {
            text: $text,
            number: 0
        }){
        id,
        text
        number
        }
    }
`

const ModalWithMutation = graphql(
    CREATE_COUNTER
)(Modal);

export default ModalWithMutation;

Modal.propTypes = {
    newText: PropTypes.string,
    isModalVisible: PropTypes.bool,
    onTextChange: PropTypes.func,
    onCancel: PropTypes.func,
}
