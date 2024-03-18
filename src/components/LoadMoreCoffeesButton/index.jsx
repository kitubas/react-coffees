import './styles.css';
import P from 'prop-types';

import { Component } from 'react';

export class LoadMoreCoffeesButton extends Component {
  render() {
    const { text, onClick, disabled = false } = this.props;

    return (
      <button className="loadMoreCoffees-button" onClick={onClick} disabled={disabled}>
        {text}
      </button>
    );
  }
}

LoadMoreCoffeesButton.defaultProps = {
  disabled: false,
};

LoadMoreCoffeesButton.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
