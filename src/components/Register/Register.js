import React, {Component} from "react";



class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:''
        }
    }
    onNameChange=(event)=>{
        this.setState({name:event.target.value}) ;
    };

    onPasswordChange=(event)=>{
        this.setState({password:event.target.value})

    };
    onEmailChange=(event)=>{
        this.setState({email:event.target.value})
    };
     onSubmitRegister=()=>{
         const {name,email,password}=this.state;

        fetch('http://localhost:3000/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                name:name,
                email:email,
                password:password
            })

        }).then(response=>response.json()).then(user=>{
            console.log(user);

            if(user.id){
               this.props.loadUser(user);
                this.props.onRouteChange('home');

            }


        }).catch(console.log);


     };

    render(){

        return<div>
            <article className="br3 ba shadow-5  b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <form className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>

                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="text" name="Name" id="Name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   onClick={this.onSubmitRegister}   type="submit" value="Register"/>
                        </div>

                    </form>
                </main>
            </article>
        </div>
    }

};
export default Register;