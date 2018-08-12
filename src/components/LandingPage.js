import React, { Component } from 'react';
import GamePage from "./GamePage";
import RaisedButton from 'material-ui/RaisedButton';

class LandingPage extends Component {

    state = {
        isNameInputsVisible : true,
        isGamePageVisible: false,
        isGameOver: false,
        whoWon:'',
        leaderBoardValues:[],
        player1Name:"",
        player2Name:"",
    }

    getGamePage = () =>{
        this.setState({
            'isGamePageVisible' : !this.state.isGamePageVisible,
            'isNameInputsVisible' : !this.state.isNameInputsVisible,
        })
    }

    gameOver = (Winner) =>{
        this.setState({
            isGameOver: true,
            whoWon:Winner,
            'isGamePageVisible' : !this.state.isGamePageVisible,
            'isNameInputsVisible' : !this.state.isNameInputsVisible,
        })
    }

    getPlayer1Name = (event) =>{
        this.setState({player1Name:event.target.value});
    }

    getPlayer2Name = (event) =>{
        this.setState({player2Name:event.target.value});
    }
    render() {
        return (
            <div>
                <header>
                    <h3 className = "m-3">Tic-Tac-Toe</h3>
                </header>
                {this.state.isNameInputsVisible ? (
                    <div>
                        <div style={{'text-align':'center'}}>
                            <input
                                placeholder={"Enter player 1 Name"}
                                className={"mb-3 p-3"}
                                onChange={this.getPlayer1Name}
                            />
                            <br/>
                            <input
                                placeholder={"Enter player 2 Name"}
                                className={"mb-3 p-3"}
                                onChange={this.getPlayer2Name}
                            />
                            <br/>
                        </div>
                        <div style={{'text-align':'center'}}>
                            <RaisedButton
                                label="Play Game"
                                primary={true}
                                className={"mb-3"}
                                onClick={this.getGamePage}
                            /><br/>
                        </div>
                    </div>
                ) : ''}
                {this.state.isGamePageVisible ? <GamePage gameOver={this.gameOver}
                                                          player1Name={this.state.player1Name}
                                                          player2Name={this.state.player2Name}/> : ''}

            </div>
        );
    }
}

export default LandingPage;
