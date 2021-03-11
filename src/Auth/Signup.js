import React from 'react'
import {Row, Col, Container, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import './Auth.css'
import {ReactComponent as Logo} from '../Assets/Logo.svg'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import {signUp} from '../Store/actions/authActions';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class Signup extends React.Component{
 constructor(props){
     super(props);

     this.state={
        input:{
         email: '',
         name: '',
         password: '',
         branch: 'CSE',
         srn:'',
         type: 'Student',
        },
        errors: {}
    }
 }

 handleChange  = (e) => {
     const input = this.state.input
     const errors = this.state.errors
     input[e.target.id] = e.target.value;
     errors[e.target.id] = "";
     this.setState({input})
     this.setState({errors})
 }

 handleSubmit = (e) => {
     e.preventDefault();
      if(this.validate()){
        this.props.signUp(this.state.input);
    }
 }

 validate = () => {
     let input = this.state.input;
     let errors = {};
     let isValid = true;

     if(!input["email"]){
         isValid = false;
         errors["email"] = "Please enter your email address"
     }

     if (typeof input["email"] !== "undefined") {
            
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }
  
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }

      if (!input["name"]) {
        isValid = false;
        errors["name"] = "Please enter your name.";
      }
      if (!input["srn"]) {
        isValid = false;
        errors["srn"] = "Please enter your SRN.";
      }

     this.setState({
         errors: errors
     })

     return isValid;
 }


    
 render(){
    const {auth, branches} = this.props;
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
         <Col>
                <Form onSubmit={this.handleSubmit}>
                <Container className="signup-container">
                <h1 className="heading mt-5 mb-5">Signup</h1>
                <Row>
                    <Col md='5'>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Your Name" onChange={this.handleChange}/>
                            {this.state.errors.name && <p className="error">{this.state.errors.name}</p>}
                        </FormGroup>
                    </Col>
                    <Col md='5'>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input name="email" id="email" placeholder="Email" onChange={this.handleChange} />
                            {this.state.errors.email && <p className="error">{this.state.errors.email}</p>}
                        </FormGroup>
                    </Col>
                    <Col md='5'>
                        <FormGroup>
                            <Label>SRN</Label>
                            <Input type="text" name="SRN" id="srn" placeholder="SRN"  onChange={this.handleChange}/>
                            {this.state.errors.srn && <p className="error">{this.state.errors.srn}</p>}
                        </FormGroup>
                    </Col>
                    <Col md='5' className="mt-3">
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} />                        
                            {this.state.errors.password && <p className="error">{this.state.errors.password}</p>}
                        </FormGroup>
                    </Col>
                    <Col md='5' className="mt-3">
                        <FormGroup>
                        <Label for="exampleSelect">Select Your Branch</Label>
                                <Input type="select" name="select" id="branch" onChange={this.handleChange}>
                                {branches && branches.map(branch => (
                                    <>
                                        <option key={branch.id} value={branch.name}>{branch.name}</option>
                                    </>
                                ))
                                }
                                </Input>
                        </FormGroup>
                    </Col>
                    <Col md='5' className="mt-4 mb-4"> 
                        <Row>
                        <Col>
                            <FormGroup check>
                            <Input id="radio1-option1" type="radio" name="radio1" value="Student" id="type" onChange={this.handleChange}/>
                            <Label check for="radio1-option1">
                                Student
                            </Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup check>
                            <Input type="radio" name="radio1" id="radio1-option2" value="Teacher" id="type" onChange={this.handleChange}/>
                            <Label check for="radio1-option2">
                                Teacher
                            </Label>
                            </FormGroup>
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <Button color="primary" className="signup-button">Submit</Button>
                <p className="login-helper">Have an account already? <Link to="/login">Login</Link></p>
                </Container> 
                </Form> 
         </Col>
     </Row>
    )
  }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile, 
        branches: state.firestore.ordered.branches,
    }
}


const mapDispatchToProps = (dispatch) => {
    return({
        signUp: (newUser) => {
            dispatch(signUp(newUser))
        }
    })
}



export default compose(connect(mapStateToProps, mapDispatchToProps), 
firestoreConnect([{collection: 'branches'}]))(Signup);

