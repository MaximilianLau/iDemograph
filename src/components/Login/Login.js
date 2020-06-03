import React, {Component} from 'react';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            signInEmail:'',
            signInPassword:''
        }
    }
    onEmailChange = (event) => {
        this.setState ({
            signInEmail: event.target.value
        })
    }
    onPasswordChange = (event) => {
        this.setState ({
            signInPassword: event.target.value
        })
    }

    onSubmitSignIn = (event) => {
        event.preventDefault();
        fetch('https://protected-ravine-28114.herokuapp.com/signin', {
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email:this.state.signInEmail,
                password:this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }


    render() {
    return (
        <article className="br3 ba dark-gray b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 white-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="center f1 fw6 ph0 mh0">Login</legend>
                        <div className="mt3">
                            <label className="center db fw6 lh-copy f3" htmlFor="email-address">Email</label>
                            <input 
                            onChange={this.onEmailChange}
                            className="pa2 input-reset ba bg-transparent hover-bg-dark-gray hover-white w-100 f3" type="email" name="email-address" id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="center db fw6 lh-copy f3" htmlFor="password">Password</label>
                            <input
                            onChange={this.onPasswordChange}
                            className="b pa2 input-reset ba bg-transparent hover-bg-dark-gray hover-white w-100 f3" type="password" name="password" id="password"/>
                        </div>
                    </fieldset>
                    <div className="center">
                        <input onClick={this.onSubmitSignIn} className="b white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f3 dib" type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3 center">
                        <a onClick={() => this.props.onRouteChange('register')} href="#0" className="f3 link dim white db">Register</a>
                    </div>
                </form>
            </main>
        </article>
        )
    }
}

export default Login;