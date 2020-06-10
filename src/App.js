import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from 'clarifai';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/SignIn";
import Register from "./components/Register/Register";
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
    calculateFaceLocation=(data)=>{
        const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
        const image=document.getElementById('inputImage');
        const width=Number(image.width);
        const height=Number(image.height);
        return {
           columnRight:width-(clarifaiFace.right_col * width),
           columnLeft:clarifaiFace.left_col * width,
           rowBottom: height-(clarifaiFace.bottom_row *height),
            rowTop: clarifaiFace.top_row * height
        }
    };
    displayFaceBox=(box)=>{
      this.setState({box:box});

    };


    constructor(){
        super();
        this.state={
            input:'',
            imgUrl:'',
            box:{},
            route:'signin',
            isSignedIn:false,
            user:{
                id:'',
                name:'',
                email:'',
                entries:0,
                joined:''

            }
        }
    }
     onInputChange=(event)=>{
        this.setState({
            input:event.target.value
        })
    };
    loadUser=(data)=>{
        this.setState({
            user:{
                id:data.id,
                name:data.name,
                email:data.email,
                entries:data.entries,
                joined:data.joined

            }
        })

    };
    onButtonSubmit=()=>{
        this.setState({imgUrl:this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
           response=> {
               if (response){
                   fetch('http://localhost:3000/image', {
                       method: 'put',
                       headers: {'Content-Type': 'application/json'},
                       body: JSON.stringify({id: this.state.user.id})

                   }).then(
                       response => {response.json()}
                   ).then(data => {

                      this.setState(Object.assign({},this.state.user,data));

                   });
               }

               this.displayFaceBox(this.calculateFaceLocation(response) );
           }
        ).catch(err=>console.log(err));
    };
    onRouteChange=(route)=>{

        if(route==='signout'){
            this.setState({isSignedIn:false});

        }
       else if(route==='home'){
            this.setState({isSignedIn:true});

        }

     this.setState({route:route});


    };
    actualUser=()=>{
      return this.state.user;
    };
    render (){
      const {isSignedIn,route,imgUrl,box}=this.state;
      return (<div className="App">

          <Particles className={'particles'}
                     params={params} />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          {
              route==='home' ? <div>
                  <Logo/>
                  <Rank name={this.state.user.name} entries={this.state.user.entries} />
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                  <FaceRecognition box={box} imgUrl={imgUrl} />
                  </div>: (
                    route==='signin' ?  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                     : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}  />
              )
          }

       </div>)

  }


}

export default App;
