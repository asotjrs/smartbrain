import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/SignIn";
import Register from "./components/Register/Register";

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
const initialState={
    input:'',
    imgUrl:'',
    boxes:[],
    route:'signin',
    isSignedIn:false,
    user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''

    }
};
class App extends Component{
    calculateFacesLocations=(data)=>{
        return data.outputs[0].data.regions.map(face=>{
            const clarifaiFace=face.region_info.bounding_box;

            const image=document.getElementById('inputImage');
            const width=Number(image.width);
            const height=Number(image.height);
            return {
                columnRight:width-(clarifaiFace.right_col * width),
                columnLeft:clarifaiFace.left_col * width,
                rowBottom: height-(clarifaiFace.bottom_row *height),
                rowTop: clarifaiFace.top_row * height
            }
        });

    };
    displayFaceBox=(boxes)=>{
      this.setState({boxes:boxes});

    };


    constructor() {
        super();
        this.state = initialState;
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
        });

    };

    onButtonSubmit=()=>{
        this.setState({imgUrl:this.state.input});
        fetch('https://arcane-sea-29435.herokuapp.com/imageUrl',{
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({input: this.state.input})

        }).then(result=>result.json())
        .then(
           response=> {
               if (response){
                   fetch('https://arcane-sea-29435.herokuapp.com/image', {
                       method: 'put',
                       headers: {'Content-Type': 'application/json'},
                       body: JSON.stringify({id: this.state.user.id})

                   }).then(
                       response => response.json()
                   ).then(count => {

                       this.setState(Object.assign(this.state.user,{entries:count}));

                   }).catch(console.log);
               }

               this.displayFaceBox(this.calculateFacesLocations(response) );
           }
        ).catch(err=>console.log("there has been some error so we cant send your request"));
    };

    onRouteChange=(route)=>{
        if(route==='signout'){
            return this.setState(initialState);


        }
       else if(route==='home'){
            this.setState({isSignedIn:true});

        }
        this.setState({...this.state, route: route});


    };



    render (){
      const {isSignedIn,route,imgUrl,boxes}=this.state;
      return (<div className="App">

          <Particles className={'particles'}
                     params={params} />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}  />
          {
              route==='home' ? <div>
                  <Logo/>
                  <Rank  entries={this.state.user.entries} name={this.state.user.name}  />
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                  <FaceRecognition boxes={boxes} imgUrl={imgUrl} />
                  </div>: (
                    route==='signin' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    :  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}  />

              )
          }

       </div>)

  }


}

export default App;
