import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class HomePage extends Component {

    state = {
        isNamesComponentVisible : false,
        isInitialButtonsVisible : true,
        player1Name:"",
        player2Name:""
    }

    getNamesComponent = () =>{
        this.setState({
            'isInitialButtonsVisible':!this.state.isInitialButtonsVisible,
            'isNamesComponentVisible':!this.state.isNamesComponentVisible,
        })
    }

    getPlayer1Name = (event) =>{
        this.setState({
            'player1Name': event.target.value,
        })
    }

    getPlayer2Name = (event) =>{
        this.setState({
            'player2Name': event.target.value,
        })
    }

    getNames = () =>{
        this.props.storePlayerNames(this.state.player1Name, this.state.player2Name);
        this.setState({
            'isNamesComponentVisible':!this.state.isNamesComponentVisible
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.isInitialButtonsVisible ? (
                        <div style={{'text-align':'center'}}>
                            <RaisedButton
                                label="Play Game"
                                primary={true}
                                className={"mb-3"}
                                onClick={this.getNamesComponent}
                            /><br/>
                            <RaisedButton label="View Leader board" />
                        </div>
                    ) : ''

                }
                {
                    this.state.isNamesComponentVisible ? (
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
                            <RaisedButton
                                label="Start Game"
                                primary={true}
                                className={"mb-3"}
                                onClick={this.getNames}
                            /><br/>
                        </div>
                    ) : ''

                }

            </div>
        );
    }
}

export default HomePage;
