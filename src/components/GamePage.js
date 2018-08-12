import React, { Component } from 'react';

class GamePage extends Component {

    state = {
        timerSet: true,
        startTime:'',
        endTime:'',
        counter:0
    }

    checkForWin = (event,x,y) =>{
        ((this.state.counter % 2) == 0 ) ? event.target.innerHTML = "X" : event.target.innerHTML = "O";
        event.target.disabled = true;
        var updateCounter = this.state.counter + 1 ;
        if(this.state.timerSet){
            this.setState({
                timerSet : false,
                startTime : new Date(),
                counter: updateCounter ,
            })
        } else{
            this.setState({
                counter: updateCounter,
            })
        }
        
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
