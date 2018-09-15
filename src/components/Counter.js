import React from 'react';
import PropTypes from 'react-proptypes';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { 
    Card, 
    Button,
    Icon,
 } from 'antd';
const { Meta } = Card;

function Counter(props) {
    const {
        id,
        text,
        number,
        photo,
        mutate
    } = props;

    function onClick() {
        mutate({ 
            variables: { 
                number: number+1,
                id: id
            }
          })
    }

    console.log(mutate)
   
    return (
        <Card 
            className={'card-container__item'}
            actions={[<Button onClick={onClick}/>]}
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

const CounterWithMutation = graphql(
    INCREASE_NUMBER
)(Counter);

export default CounterWithMutation;

Counter.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    number: PropTypes.number,
    photo: PropTypes.object,
}

