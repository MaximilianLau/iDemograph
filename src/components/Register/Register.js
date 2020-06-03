import React, { Component } from 'react';
import './Register.css'

class  Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name:''
        }
    }

    onNameChange =(event) => {
        this.setState({
            name:event.target.value
        })
    }
    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onSubmitSignIn = (event) => {
        event.preventDefault();
        fetch('https://protected-ravine-28114.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
    }



render() {
        return (
            <article className="br3 ba dark-gray b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 white-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="center f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="center db fw6 lh-copy f3" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f3" type="text" name="name" id="name" />
                            </div>
                            <div className="mt3">
                                <label className="center db fw6 lh-copy f3" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f3" type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="center db fw6 lh-copy f3" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f3" type="password" name="password" id="password" />
                                <p className="center f3">bcypt encrypted passwords!</p>
                            </div>
                        </fieldset>
                        <div className="center">
                            <input onClick={this.onSubmitSignIn} className="white b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f3 dib" type="submit" value="Register" />
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}
export default Register;