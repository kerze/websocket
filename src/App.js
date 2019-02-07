import React, { Component } from 'react';
import './App.css';
import Modal from './Modal';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      showReplenish: false,
      showModal: false,
    };
  }
  socket = openSocket('http://localhost:8001');

  componentDidMount() {
    this.getAmount();
  }

  getAmount() {
    this.socket.on('amount', value => this.setState({ amount: value }));
    setTimeout(() => {
      this.setState({ showReplenish: true });
    }, 5000);
  }
  openModal() {
    this.setState({ showModal: true });
  }
  closeModal() {
    this.setState({ showModal: false });
  }
  replenishAcount(count) {
    const newAmount = this.state.amount + count;
    this.socket.emit('change', newAmount);
    this.closeModal();
  }
  render() {
    const { amount, showReplenish, showModal } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h2>Money in the account</h2>
          <p className="App-intro">{amount}</p>
          {showReplenish && (
            <button className="replenish-btn" onClick={() => this.openModal()}>
              Replenish
            </button>
          )}
          {showModal && (
            <Modal
              closeModal={() => this.closeModal()}
              replenishAcount={count => this.replenishAcount(count)}
            />
          )}
        </header>
      </div>
    );
  }
}
export default App;
