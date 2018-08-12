import React, { Component } from 'react';
import GamePage from "./GamePage";
import RaisedButton from 'material-ui/RaisedButton';

class LandingPage extends Component {

    state = {
        isNameInputsVisible : true,
        isGamePageVisible: false,
        isGameOver: false,
        leaderBoardValues:[],
        player1Name:"",
        player2Name:"",
        leaderBoard:[],
        fastestTime:0,
        slowestTime:0
    }

    getGamePage = () =>{
        this.setState({
            'isGamePageVisible' : !this.state.isGamePageVisible,
            'isNameInputsVisible' : !this.state.isNameInputsVisible,
        })
    }

    gameOver = () =>{
        this.setState({
            isGameOver: true,
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

    addRecordToLeaderBoard = (winner, XorO,timeTaken) =>{
        var leaderBoardRecord = this.state.leaderBoard;
        var shouldPushEntry = true;

        leaderBoardRecord.map( (x) => {
            if(shouldPushEntry && x.WinnerName == winner && x.XorO == XorO){
                x.numberOfWins = x.numberOfWins + 1;
                shouldPushEntry = false;
            }
        })
        // if(leaderBoardRecord.length == 3){
        //     leaderBoardRecord.pop();
        // }
        shouldPushEntry ? leaderBoardRecord.push({WinnerName : winner, XorO : XorO, numberOfWins: 1, timeTaken:timeTaken}) : '';
        this.updateTimeStatistics(winner,timeTaken);
        this.setState({
            leaderBoard:leaderBoardRecord.reverse()
        });
    }

    updateTimeStatistics = (winner,timeTaken) =>{
        console.log("timeTaken" + timeTaken);
        var fastestTime = this.state.fastestTime;
        var slowestTime = this.state.slowestTime;
        if( fastestTime === 0 || fastestTime > timeTaken ){
            this.setState({
                fastestTime: timeTaken
            });
        }
        if( slowestTime === 0 ||slowestTime < timeTaken ){
            this.setState({
                slowestTime: timeTaken
            });
        }
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
                {this.state.isGamePageVisible ? (
                    <div className={'row'}>
                        <div className={'col-md-8'}>
                            <GamePage gameOver={this.gameOver}
                                      player1Name={this.state.player1Name}
                                      player2Name={this.state.player2Name}
                                      getLandingPage={this.gameOver}
                                      addRecordToLeaderBoard={this.addRecordToLeaderBoard}/>
                        </div>
                        <div className={'col-md-3'}>
                            <h3><strong>Statistics</strong></h3>
                            {this.state.leaderBoard.map( (x,index) => (
                                <div>
                                    {index+1}. <span>{x.WinnerName}({x.XorO}): {x.numberOfWins} {x.numberOfWins == 1 ? 'game' : 'games'} won</span>
                                </div>
                            ))}
                            <br/>
                            <br/>
                            <div>
                                <span><strong>Fastest time</strong>: </span>
                                {this.state.fastestTime+' secs'}
                            </div>
                            <div>
                                <span><strong>Slowest time</strong>: </span>
                                {this.state.slowestTime+' secs'}
                            </div>
                            <RaisedButton
                                label="Start Over"
                                className={"mb-3 mt-3"}
                                onClick={this.gameOver}/>

                        </div>
                    </div>): ''}

            </div>
        );
    }
}

export default LandingPage;
