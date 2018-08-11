import React, { Component } from 'react';

class GamePage extends Component {

    state = {
        timerSet: true,
        startTime:'',
        endTime:''
    }

    checkForWin = (event,x,y) =>{
        if(this.state.timerSet){
            this.setState({
                timerSet: false,
                startTime:new Date(),
            })
        }
        event.target.innerHTML = "X";
    }

    render() {
        return (
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
                                            onClick={(event)=> this.checkForWin(event,x,y)}
                                        />
                                    ))}
                            </div>
                        ))

                }
            </div>
        );
    }
}

export default GamePage;
