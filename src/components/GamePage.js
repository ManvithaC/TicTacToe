import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
export default class GamePage extends Component {

    state = {
        startTime:'',
        counter:0,
        positions:[],
        whoseTurn:this.props.player1Name,
        dialogBoxOpen: false,
        winner:'',
        timeTaken:'',
    }
    componentWillMount () {

        let arr = new Array(3);
        for (let i = 0; i < arr.length; ++i) {
            arr[i] = new Array(3);
        }
        for (let i = 0; i < arr.length; ++i) {
            for (let j = 0; j < arr.length; ++j) {
                arr[i][j] = 'e';
            }
        }
        this.setState({positions:arr})
    }

    handleButtonClick = (event,x,y) =>{
        ((this.state.counter % 2) === 0 ) ? event.target.innerHTML = "X" : event.target.innerHTML = "O";

        let position = this.state.positions;
        position[x][y] = event.target.innerHTML;

        //disable the tile that has been clicked
        event.target.disabled = true;
        let updateCounter = this.state.counter + 1 ;

        if(this.state.counter === 0){ // start the timer on the first click
            this.setState({startTime : new Date()});
        }
        this.setState({
            counter: updateCounter,
            positions: position,
            whoseTurn: event.target.innerHTML === "X" ? this.props.player2Name : this.props.player1Name
        })
        let winner = this.checkForWinner();
        if(winner != null && winner !== ""){

            //calculate the time taken from the first 'X' to the end of the game
            let timeTaken = ((new Date().getTime() - (this.state.startTime).getTime() ) / 1000).toFixed(2);
            this.setState({
                dialogBoxOpen: true,
                winner: winner,
                timeTaken: timeTaken,
                whoseTurn:''
            });
            this.props.addRecordToLeaderBoard(winner,event.target.innerHTML,timeTaken);
        }
    }

    checkForWinner = () =>{
        let winner = '';
        let position = this.state.positions;

        if((position[0][0] === position[0][1]) && (position[0][1] === position[0][2]) && position[0][0] !== 'e')winner = this.state.whoseTurn;
        else if((position[1][0] === position[1][1]) && (position[1][1] === position[1][2]) && position[1][0] !== 'e')winner = this.state.whoseTurn;
        else if((position[2][0] === position[2][1]) && (position[2][1] === position[2][2]) && position[2][0] !== 'e')winner = this.state.whoseTurn;
        else if((position[0][0] === position[1][0]) && (position[1][0] === position[2][0]) && position[0][0] !== 'e')winner = this.state.whoseTurn;
        else if((position[0][1] === position[1][1]) && (position[1][1] === position[2][1]) && position[0][1] !== 'e')winner = this.state.whoseTurn;
        else if((position[0][2] === position[1][2]) && (position[1][2] === position[2][2]) && position[0][2] !== 'e')winner = this.state.whoseTurn;
        else if((position[0][0] === position[1][1]) && (position[1][1] === position[2][2]) && position[0][0] !== 'e')winner = this.state.whoseTurn;
        else if((position[0][2] === position[1][1]) && (position[1][1] === position[2][0]) && position[0][2] !== 'e')winner = this.state.whoseTurn;

        return winner;
    }

    handleDialogClose = () => this.setState({dialogBoxOpen: false});

    render() {
        return (
            <div >
                <h2 style={{'text-align':'center'}}>
                    {this.state.whoseTurn !== '' ? this.state.whoseTurn+" 's Turn" : ''}
                </h2>
                <div style={{'text-align':'center'}}>
                    {
                        [0,1,2].map( x =>
                            (
                                <div>
                                    {
                                        [0,1,2].map( y => (
                                            <button
                                                className={"btn m-1"}
                                                style={{
                                                    'height' : '100px',
                                                    'width' : '100px',
                                                    'background-color':'#00BCD4',
                                                    'border-radius':'0.1px',
                                                    'font-size':'70px',
                                                    'text-align':'center',
                                                    'color':'white',
                                                    'margin':'auto'
                                                }}
                                                onClick={(event)=> this.handleButtonClick(event,x,y)}
                                            />
                                        ))}
                                </div>
                            ))

                    }
                </div>
                <Dialog
                    modal={true}
                    open={this.state.dialogBoxOpen}
                >
                    <div style={{'text-align':'center'}}>
                        <h2>{this.state.winner} won in {this.state.timeTaken} secs!</h2>
                        <RaisedButton
                            label="Start Over"
                            primary={true}
                            className={"mb-3"}
                            onClick={this.props.toggleGameAndNameInputsScreen}
                        />
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            className={"mb-3 ml-3"}
                            onClick={this.handleDialogClose}
                        /><br/>
                    </div>
                </Dialog>
            </div>

        );
    }
}
