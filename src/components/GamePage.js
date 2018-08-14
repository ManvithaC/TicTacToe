import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

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
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(3).fill('e');
        }
        this.setState({positions:arr})
    }

    handleButtonClick = (event,x,y) =>{

        //TODO: change the event.target.innerHTML - DOM load
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
        let winner = '';
        if(this.state.counter >= 4) winner = this.checkForWinner(); //There should be at least 5 turns to decide winner
        if(winner !== ''){

            //calculate the time taken from the first 'X' to the end of the game
            let timeTaken = ((new Date().getTime() - (this.state.startTime).getTime() ) / 1000).toFixed(2);
            this.setState({
                dialogBoxOpen: true,
                winner: winner,
                timeTaken: timeTaken,
                whoseTurn:''
            });
            this.props.addRecordToLeaderBoard(winner,event.target.innerHTML,timeTaken);
        } else if(updateCounter === 9 && winner === '' ){
            console.log('and..that is a draw!');
            this.setState({
                dialogBoxOpen: true,
                winner:''
            });
        }
    }

    checkForWinner = () =>{
        let winner = '';
        let position = this.state.positions;

            if ((position[0][0] === position[0][1]) && (position[0][1] === position[0][2]) && position[0][0] !== 'e') winner = this.state.whoseTurn;
            else if ((position[1][0] === position[1][1]) && (position[1][1] === position[1][2]) && position[1][0] !== 'e') winner = this.state.whoseTurn;
            else if ((position[2][0] === position[2][1]) && (position[2][1] === position[2][2]) && position[2][0] !== 'e') winner = this.state.whoseTurn;
            else if ((position[0][0] === position[1][0]) && (position[1][0] === position[2][0]) && position[0][0] !== 'e') winner = this.state.whoseTurn;
            else if ((position[0][1] === position[1][1]) && (position[1][1] === position[2][1]) && position[0][1] !== 'e') winner = this.state.whoseTurn;
            else if ((position[0][2] === position[1][2]) && (position[1][2] === position[2][2]) && position[0][2] !== 'e') winner = this.state.whoseTurn;
            else if ((position[0][0] === position[1][1]) && (position[1][1] === position[2][2]) && position[0][0] !== 'e') winner = this.state.whoseTurn;
            else if ((position[0][2] === position[1][1]) && (position[1][1] === position[2][0]) && position[0][2] !== 'e') winner = this.state.whoseTurn;
        return winner;
    }

    render() {
        return (
            <div >
                <h2 style={{'textAlign':'center'}}>
                    {this.state.whoseTurn !== '' ? this.state.whoseTurn+" 's Turn" : ''}
                </h2>
                <div style={{'textAlign':'center'}}>
                    {
                        [0,1,2].map( x =>
                            (
                                <div>
                                    {
                                        [0,1,2].map( y => (
                                            <button
                                                className="btn"
                                                style={{
                                                    'height' : '100px',
                                                    'width' : '100px',
                                                    'backgroundColor':'white',
                                                    'borderRadius':'0.1px',
                                                    'border':'solid grey 1px',
                                                    'fontSize':'70px',
                                                    'textAlign':'center',
                                                    'color':'black',
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
                    <div style={{'textAlign':'center'}}>
                        <h2>{this.state.winner !== '' ? this.state.winner +' won in ' + this.state.timeTaken +' secs!' : '..and it is a draw!'}</h2>
                        <RaisedButton
                            label="Start Over"
                            primary={true}
                            className={"mb-3"}
                            onClick={this.props.toggleGameAndNameInputsScreen}
                        />
                    </div>
                </Dialog>
            </div>

        );
    }
}
