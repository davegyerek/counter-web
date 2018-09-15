import React from 'react';
import PropTypes from 'react-proptypes';
import gql from 'graphql-tag';
import { 
    graphql, 
    compose, 
} from 'react-apollo';
import { 
    Card, 
    Button,
    Icon,
    Popconfirm,
 } from 'antd';

import { GET_COUNTERS } from '../App';

const { Meta } = Card;

function Counter(props) {
    const {
        id,
        text,
        number,
        // photo,
        increaseNumber,
        deleteCounter,
        style,
    } = props;

    function onIncrease() {
        increaseNumber({ 
            variables: { 
                number: number+1,
                id: id
            },
            refetchQueries: [{ query: GET_COUNTERS}]
          })
    }

    function onDelete() {
        deleteCounter({
            variables: {
                id: id
            },
            refetchQueries: [{ query: GET_COUNTERS}]
        })
    }
   
    return (
        <Card 
            style={style}
            hoverable
            className={'card-container__item'}
            actions={[
                <Button onClick={onIncrease}>
                    <Icon 
                        type="plus" 
                        theme="outlined"
                    />
                </Button>,
                <Popconfirm title={'Are you sure to delete this counter?'} onConfirm={onDelete}>
                    <Button>
                        <Icon 
                            type="delete" 
                            theme="filled"
                            style={{ color: '#FF4136' }}
                        />
                    </Button>
                </Popconfirm>
            ]}
        >
            <Meta
                title={text}
                description={number}
            />
        </Card>
    )
};

const INCREASE_NUMBER = gql`
    mutation updateCounter($number: Int, $id: ID){
        updateCounter(data: {
        number: $number
        }, where: { 
            id: $id
        }){
        id
        text
        number
        }
    }
`

const DELETE_COUNTER = gql`
    mutation deleteCounter($id: ID){
        deleteCounter(where: {
            id: $id
        }){
            id
        }
    }
`

const CounterWithMutation = 
compose(
    graphql(
    INCREASE_NUMBER,
    { name: "increaseNumber" }
),
    graphql(
    DELETE_COUNTER,
    { name: "deleteCounter" }
))(Counter);

export default CounterWithMutation;

Counter.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    number: PropTypes.number,
    photo: PropTypes.object,
}

