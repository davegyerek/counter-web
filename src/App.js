import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { 
  ApolloProvider,
  Query,
} from 'react-apollo';
import { 
  Button,
  Icon,
  Row,
  Col,
} from 'antd';
import { Transition } from 'react-spring';

import Modal from './components/Modal';
import Counter from './components/Counter';
import './App.css';

const client = new ApolloClient({
  uri: "https://api-euwest.graphcms.com/v1/cjm3al9q2202u01cy0eytbw2e/master"
})

export const GET_COUNTERS = gql`
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

const renderCounters = counters => {
  return (
  <Transition
    items={counters}
    keys={counter => counter.id}
    from={{ opacity: 0, number: 0}}
    enter={counter => ({ opacity: 1, number: counter.number})}
    leave={{ opacity: 0, number: 0}}
  >
    {counters.map(counter => styles =>
      <Col 
        span={8}
        key={counter.id}
        style={styles}
      >
        <Counter 
          style={styles}
          id={counter.id}
          text={counter.text} 
          number={counter.number} 
          photo={counter.photo}
        />
      </Col>
    )}
  </Transition>
  )
}

const initState = {
  isModalVisible: false,
  newText: "",
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {initState}
  }

  handleNewTextChange(e) {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      newText: e.target.value,
    }))
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Query
          query={GET_COUNTERS}
        >
          {({ loading, data }) => {
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
        <Row 
          type="flex" 
          justify="space-around"
          align="middle"
        >
          <Button 
            type="primary" 
            onClick={() => this.setState(prevState => ({
              ...prevState,
              isModalVisible: true
            }))}
          >
                  Add new Counter <Icon type="smile" theme="outlined" />
          </Button>
        </Row>
        <Modal 
          newText={this.state.newText}
          isModalVisible={this.state.isModalVisible}
          onTextChange={(e) => this.handleNewTextChange(e)}
          onCancel={() => this.setState(initState)}
        />

{/*         
        <Modal
          title="Basic Modal"
          visible={this.state.isModalVisible}
          // onOk={this.handleOk}
          onCancel={() => this.setState(initState)}
          footer={[
            <Button type="submit">Add Counter</Button>
          ]}
        >
                  <Mutation mutation={CREATE_COUNTER}>
          {(createCounter, { data }) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  createCounter({ variables: { text: this.state.newText } });
                  // input.value = "";
                }}
              >
              <Row
                type="flex" 
                justify="space-between"
                align="middle"
              >
                <Col span={11}>
                  <Input
                    onChange={(e) => this.handleNewTextChange(e)}
                    value={this.state.newText}
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
              </form>
            </div>
          )}
        </Mutation>
              </Modal> */}

      </ApolloProvider>
    );
  }
}

export default App;
