import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { 
  ApolloProvider,
  Query,
  Mutation,
} from 'react-apollo';
import { 
  Card,
  Button,
  Input,
  Row,
  Col,
} from 'antd';
import Counter from './components/Counter';

import './App.scss';

const client = new ApolloClient({
  uri: "https://api-euwest.graphcms.com/v1/cjm3al9q2202u01cy0eytbw2e/master"
})

const query = gql`
  {
    counters {
      id,
      text,
      number,
      photo {
        id,
      }
    }
  }
`

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

const renderCounters = counters => {
  return counters.map(counter => 
    <Col 
      span={8}
      key={counter.id}
    >
      <Counter 
        id={counter.id}
        text={counter.text} 
        number={counter.number} 
        photo={counter.photo}
      />
    </Col>
  )
}
let input;


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query
          query={query}
        >
          {({ loading, data }) => {
            console.log(data)
            if (loading)
              return (<div>Loading...</div>)

            return (
              <div className={'card-container'}>
                <Row gutter={18}>
                  {renderCounters(data.counters)}
                </Row>
              </div>
            )
            
          }
        }
        </Query>
        <Mutation mutation={CREATE_COUNTER}>
          {(createCounter, { data }) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  createCounter({ variables: { text: input.value } });
                  input.value = "";
                }}
              >
                <Input
                  ref={node => {
                    input = node;
                  }}
                />
                <Button type="submit">Add Counter</Button>
              </form>
            </div>
          )}
        </Mutation>
      </ApolloProvider>
    );
  }
}

export default App;
