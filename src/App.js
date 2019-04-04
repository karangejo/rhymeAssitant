import React, { Component } from 'react';
import request from 'request';

const baseUrl = 'https://api.datamuse.com/words?rel_rhy=';
var obj = {};

class App extends Component {
        state = {
                searchTarget: '',
                rhymeObj: '',
                display: false
        }

        getRhymes = (event) => {
                event.preventDefault();
                const url = baseUrl + this.state.searchTarget;
                request(url, function(error,response,body){
                        //console.log('error: ',error);
                        //console.log('response: ', response && response.statusCode);
                        //console.log('body: ',body);
                        obj = JSON.parse(body);
                        this.setState({rhymeObj:obj,display:true});
                }.bind(this));
                console.log("rhyme object: ", this.state.rhymeObj);
        }

        displayRhymes(){
                const rhymeList = Object.keys(this.state.rhymeObj).map((item,index)=>{
                        return <li key={index}>{this.state.rhymeObj[item].word}</li>;
                });
                return (
                        <ul>
                                {rhymeList}
                        </ul>
                )
        }

        render() {
                return (
                         <div className="App">
                                <h1>Rhyme Assitant</h1>
                                <form action="submit" onSubmit={this.getRhymes} >
                                        <input type="text" onChange={event =>{this.setState({searchTarget: event.target.value})}} />
                                        <button type="submit">Get Rhymes</button>
                                </form>
                                {this.state.display && this.displayRhymes()}
                        </div>
                );
        }
}

export default App;
