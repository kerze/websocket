import React from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replenishesList: [],
      purse: '',
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:8001/replenishes')
      .then(response => {
        this.setState({ replenishesList: response.data.replenishes, purse: response.data.purse });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const { replenishesList, purse } = this.state;
    return (
      <div className="modalWrap">
        <button className="close" onClick={() => this.props.closeModal()}>
          X
        </button>
        <div className="modalBlock">
          <ul>
            {replenishesList.map(card => (
              <li key={card} onClick={() => this.props.replenishAcount(card)}>
                {card}
              </li>
            ))}
          </ul>
          <div>
            <span>{purse}</span>
            <CopyToClipboard text={purse} onCopy={() => this.setState({ copied: true })}>
              <button>Copy to clipboard</button>
            </CopyToClipboard>
          </div>
          {this.state.copied ? <span style={{ color: 'green' }}>Copied.</span> : null}
        </div>
      </div>
    );
  }
}
export default Modal;
