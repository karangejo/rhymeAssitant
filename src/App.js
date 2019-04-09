import React, { Component } from 'react';
import request from 'request';

const baseUrl = 'https://api.datamuse.com/words?rel_rhy=';
const dictUrl = 'https://en.wiktionary.org/wiki/'

class App extends Component {
        _isMounted = false;
        
        state = {
                searchTarget: '',
                rhymeObj: [],
                splitSentence: [],
                display: false
        }

        componentDidMount(){
                this._isMounted = true;
        }

        componentWillUnmount(){
                this._isMounted = false;
        }

        getRhymes = (event) => {
               
                event.preventDefault();
                this.setState({rhymeObj:[],splitSentence:[],display:false});
                var obj = {};
                const words = this.state.searchTarget.split(' ');
                this.setState({splitSentence:words});
                words.map( (word,index) => {
                        var url = baseUrl + word;
               
                        request(url, function(error,response,body){
                                console.log('error: ',error);
                                console.log('response: ', response && response.statusCode);
                                // console.log('body: ',body);
                                obj = JSON.parse(body);
                                console.log("word :",word);
                                console.log("object: ",obj);
                                const rhymeObjects = [...this.state.rhymeObj]
                                rhymeObjects[index]=obj;
                                if(this._isMounted){
                                        this.setState({rhymeObj:rhymeObjects});
                                }
                        }.bind(this));
                })

                this.setState({display:true});
        }

        getMeRandomElements(sourceArray, neededElements) {
                var result = [];
                for (var i = 0; i < neededElements; i++) {
                        var index = Math.floor(Math.random() * sourceArray.length);
                        result.push(sourceArray[index]);
                        sourceArray.splice(index, 1);
                }
                return result;
        }

        makeRhymeList(rhymeListObject){
                
                if(typeof rhymeListObject === "undefined"){
                        return <li key="Undefined">Undefined (error requesting data)</li>;
                } else if (rhymeListObject.length === 0){
                        return <li key="nothing found">No matching words found!</li>;
                }

                if(rhymeListObject.length >= 10){
                        const rhymeList = Object.keys(rhymeListObject).map((item,index)=>{
                                return rhymeListObject[item].word;
                        });
                        const tenRhymeList = this.getMeRandomElements(rhymeList,10);
                        const retRhymeList = tenRhymeList.map((element,index) => {
                                return <li key={index}><a href={dictUrl+element} style={{color:"#00d1cd"}}>{element}</a></li>
                        });

                        return retRhymeList;
                
                }
               
                const rhymeList = Object.keys(rhymeListObject).map((item,index)=>{
                        return (<li key={item+rhymeListObject[item].word}>
                                        <a href={dictUrl+rhymeListObject[item].word} style={{color:"#00d1cd"}}>{rhymeListObject[item].word}</a>
                                </li>);
                });

                return rhymeList;

        }

        displayRhymes(){
                
                console.log("rhyme object: ", this.state.rhymeObj);
                
                const tableRowElements = this.state.rhymeObj.map((element,index) => {
                        return(
                                <td className="card" style={{verticalAlign:"top", backgroundColor:"#eaeaea",paddingLeft:"20px"}}>
                                        <ul key={index}>
                                                {this.makeRhymeList(element)}
                                        </ul>
                                </td>
                        )
                });

                const originalSentence = this.state.splitSentence.map((element,index) => {
                        return(
                                <td className="card" style={{backgroundColor:"#eaeaea",textAlign:"center"}}>
                                        <h5>{element}</h5>
                                </td>
                        );
                });

                return (
                        <table style={{margin:0}} className="collection with-header">
                               <tbody>
                                        <tr className="card" >
                                                {originalSentence}
                                        </tr>
                                        <tr className="card" >
                                                {tableRowElements}
                                        </tr>
                                </tbody>
                        </table>
                )
        }

        render() {
                return (
                        <div style={{backgroundColor:"#eaeaea",textAlign:"center"}}>
                        <nav style={{backgroundColor:"#444444",height:130}}>
                         <div className="nav-wrapper" style={{bottom:"10px",top:"10px"}}>
                                 <a style={{fontFamily:"'Bungee Shade',cursive",fontSize:"33px",color:"#00d1cd"}} 
                                         href="/">Rhyme Assitant</a>
                         </div>
                        </nav>
                        <form style={{textAlign:"center",backgroundColor:"#f30067",margin:0}} className="input-field" 
                                action="submit" onSubmit={this.getRhymes} >
                                <input type="text" style={{fontFamily:"'Vidaloka', serif",textAlign:"center",width:"70%",paddingLeft:25}} 
                                        onChange={event =>{this.setState({searchTarget: event.target.value})}} />
                                        <br/>
                                        <button style={{fontFamily:"'Vidaloka', serif",margin:10,backgroundColor:"#00d1cd"}} 
                                                className="waves-effect waves-light btn" type="submit">Get Rhymes</button>
                                </form>
                                {this.state.display && this.displayRhymes()}
                                <footer className="page-footer" 
                                        style={{textAlign:"center",height:"30px",backgroundColor:"#f30067",
                                                position:"fixed",left:0,bottom:0,right:0,paddingTop:"5px"}}>
                                        <p style={{marginTop:"1px"}}>&copy; Karangejo</p>
                                </footer>
                        </div>
                );
        }
}

export default App;
