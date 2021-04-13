import React from 'react'
import {Row, Col, Container, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import '../App.css'
import {Redirect} from 'react-router-dom'
import {ReactComponent as Logo} from '../Assets/Logo.svg'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import {signIn} from '../Store/actions/authActions';
import Footer from '../Components/Footer/Footer'
import CustomAlert from '../Components/Alert'

class Login extends React.Component{
    constructor(props){
        super(props)

        this.state={
            input: {
                email: '',
                password: ''
            },
            errors: {}
        }

    }

    handleChange = (e) => {
        const input = this.state.input;
        const errors = this.state.errors;
        input[e.target.id] = e.target.value;
        errors[e.target.id] = '';
        this.setState({input});
        this.setState({errors})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validate()){
            this.props.signIn(this.state.input);
        }
    }


    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;


        if(!input["email"]){
            isValid = false;
            errors["email"] = "Please enter your email";
        }

        if(!input["password"]){
            isValid = false;
            errors["password"] = "Please enter the password";
        }

        this.setState({
            errors: errors
        })

        return isValid;
    }


    render(){
        const {auth, authError} = this.props;
        if(auth.uid) return (<Redirect to="/"></Redirect>)

    return(
        <Row>
            <Col md="4">
                <div className="signup-box">
                       <div className="logo-container">
                           <Logo className="logo"></Logo>
                       </div>
                </div>
            </Col>
            <Col md="8">
                   <Form onSubmit={this.handleSubmit}>
                   <Container className="signup-container">
                   <h1 className="heading mt-5 mb-5">Login</h1>
                   <Col>
                       <Row md='8'>
                           <FormGroup>
                               <Label>Email</Label>
                               <Input type="email" name="email" id="email" placeholder="Email" onChange={this.handleChange} />
                               {this.state.errors.email && <p className="error">{this.state.errors.email}</p>}

                           </FormGroup>
                       </Row>
                       <Row md="8">
                           <FormGroup>
                               <Label>Password</Label>
                               <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange}/>
                               {this.state.errors.password && <p className="error">{this.state.errors.password}</p>}
                           </FormGroup>
                       </Row>
                   </Col>
                   <Button  color="primary" className="login-button" type="submit">Submit</Button>
                   <p className="login-helper">Dont have an account? <Link to="/signup">Signup</Link></p>
                   {authError && <CustomAlert color="danger" alert={authError} authError></CustomAlert>}
                   </Container> 
                   </Form> 
            </Col>
            <Footer></Footer>
        </Row>
     )
    }
   }

const mapStateToProps = (state) =>{
    return{
        auth : state.firebase.auth,
        authError: state.auth.authError,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        signIn : (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
