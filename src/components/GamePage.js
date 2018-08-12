import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
class GamePage extends Component {

    state = {
        startTime:'',
        counter:0,
        positions:[],
        whoseTurn:this.props.player1Name,
        dialogBoxOpen: false,
        winner:'',
        timeTaken:'',
    }

    handleButtonClick = (event,x,y) =>{
        ((this.state.counter % 2) == 0 ) ? event.target.innerHTML = "X" : event.target.innerHTML = "O";

        var position = this.state.positions;
        position.push([x,y,event.target.innerHTML]);

        event.target.disabled = true;
        var updateCounter = this.state.counter + 1 ;
        if(this.state.counter == 0){
            this.setState({
                startTime : new Date(),
            })
        }
        if(event.target.innerHTML == "X"){
            this.setState({
                counter: updateCounter,
                positions: position,
                whoseTurn: this.props.player2Name
            })
        } else {
            this.setState({
                counter: updateCounter,
                positions: position,
                whoseTurn: this.props.player1Name
            })
        }

        var winner = this.checkForWinner();
        if(winner != null && winner != ""){

            var timeTaken = ((new Date().getTime() - this.state.startTime.getTime() ) / 1000).toFixed(2);

            this.setState({
                dialogBoxOpen: true,
                winner: winner,
                timeTaken: timeTaken
            });

            this.props.addRecordToLeaderBoard(winner,event.target.innerHTML);
        }
    }

    checkForWinner = () =>{
        var winner = '';
        if(this.state.counter == 2){
            winner = this.props.player2Name;
        }
        return winner;
    }

    handleDialogClose = () => {
        this.setState({
            dialogBoxOpen: false,
        });
    };

    render() {

        return (
            <div >
                <h2 style={{'text-align':'center'}}><strong>{this.state.whoseTurn}</strong> 's Turn</h2>
                <div style={{'text-align':'center'}}>
                    {
                        [1,2,3].map( x =>
                            (
                                <div>
                                    {
                                        [1,2,3].map( y => (
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
                            onClick={this.props.getLandingPage}
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

export default GamePage;
