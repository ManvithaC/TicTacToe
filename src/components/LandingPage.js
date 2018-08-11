import React, { Component } from 'react';
import HomePage from './HomePage';
import GamePage from "./GamePage";

class LandingPage extends Component {

    state = {
        isHomePageVisible : false,
        isGamePageVisible: true
    }

    getNames = (player1,player2) =>{
        this.setState({
            'isHomePageVisible' : !this.state.isHomePageVisible,
            'isGamePageVisible' : !this.state.isGamePageVisible,
        })
        console.log(player1 + " " + player2);
    }

    render() {
        return (
            <div>
                <header>
                    <h3 className = "m-3">Tic-Tac-Toe</h3>
                </header>
                {this.state.isHomePageVisible ? <HomePage storePlayerNames={this.getNames}/> : ''}
                {this.state.isGamePageVisible ? <GamePage/> : ''}
            </div>
        );
    }
}

export default LandingPage;
