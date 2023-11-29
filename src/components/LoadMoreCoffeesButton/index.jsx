import './styles.css'

import { Component } from "react";

export class LoadMoreCoffeesButton extends Component{

    render(){
        const { text, onClick, disabled } = this.props;

        return (
          <button 
            className='loadMoreCoffees-button' 
            onClick={onClick}
            disabled={disabled}
          >
            {text}
          </button>
        ); 
    
    }

}