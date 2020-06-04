import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from 'clarifai';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
const app=new Clarifai.App({
    apiKey:'86511659890d4d389ed08b9471114250'
});
const params={
  particles:{
      number:{
          value:80,
          density:{
              enable:true,
              value_area:800
          }
      }
  }
};
class App extends Component{
    constructor(){
        super();
        this.state={
            input:'',
            imgUrl:''
        }
    }
     onInputChange=(event)=>{
        this.setState({
            input:event.target.value
        })
    };
    onButtonSubmit=()=>{
        this.setState({imgUrl:this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
            function(response) {
                // do something with response
                console.log(response)

            },
            function(err) {
                // there was an error
            }
        );
    };
  render (){
      return (<div className="App">
          <Particles className={'particles'}
                     params={params} />
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition imgUrl={this.state.imgUrl} />
      </div>)

  }


}

export default App;
