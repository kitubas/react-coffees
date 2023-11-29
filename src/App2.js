import { Component } from "react";

class App2 extends Component{
    state={
        frase : 'oi'
    }

    mudaFrase = () => {
        this.state.frase==='oi' || this.state.frase==='oi dnv'
        ?this.setState({frase: 'nova frase' })
        :this.setState({frase: 'oi dnv' });

    }

    render(){
        return(
        <div onClick={this.mudaFrase}>{this.state.frase}</div>
            
        )
    }


};

export default App2;