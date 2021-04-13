import React from 'react'
import {Row, Col, Container, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import '../App.css'
import {ReactComponent as Logo} from '../Assets/Logo.svg'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import {signUp} from '../Store/actions/authActions';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Footer from '../Components/Footer/Footer'
import CustomAlert from '../Components/Alert'

class Signup extends React.Component{
 constructor(props){
     super(props);

     this.state={
        input:{
         email: '',
         name: '',
         password: '',
         branch: 'CSE',
         type: 'Student',
         phone: '',
         semester: 'First',
        },
        errors: {}
    }
 }

 handleChange  = (e) => {
     const input = this.state.input
     const errors = this.state.errors
     input[e.target.name] = e.target.value.trim();
     errors[e.target.name] = "";
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
      if(!input["phone"]){
          isValid = false;
          errors["phone"] = "Please add your phone number"
      }


     this.setState({
         errors: errors
     })

     return isValid;
 }


    
 render(){
    const {auth, branches, semesters, authError} = this.props;
    if(auth.uid) return (<Redirect to="/"></Redirect>)
    return(
     <Row>
         <Col md="4" className="signup-background">
             <div className="signup-box">
                    <div className="logo-container">
                        <Logo className="logo"></Logo>
                    </div>
             </div>
         </Col>
         <Col md="8">
                <Form onSubmit={this.handleSubmit}>
                <Container className="signup-container">
                <h1 className="heading m-auto p-auto">Signup</h1>
                <Row className="mt-4 mb-4">
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
                    <Col md='5' className="mt-3">
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} />                        
                            {this.state.errors.password && <p className="error">{this.state.errors.password}</p>}
                        </FormGroup>
                    </Col>
                    <Col md='5' className="mt-3">
                        <FormGroup>
                            <Label>Phone</Label>
                            <Input type="text" name="phone" id="phone" placeholder="Phone" onChange={this.handleChange} />                        
                            {this.state.errors.phone && <p className="error">{this.state.errors.phone}</p>}
                        </FormGroup>
                    </Col>
                    <Col md='5' className="mt-3">
                        <FormGroup>
                        <Label for="exampleSelect">Select Your Branch</Label>
                                <Input type="select" name="branch" id="branch" onChange={this.handleChange}>
                                {branches && branches.map(branch => (
                                    <>
                                        <option key={branch.name} value={branch.name}>{branch.name}</option>
                                    </>
                                ))
                                }
                                </Input>
                        </FormGroup>
                    </Col>
                    <Col md='5' className="mt-0 mb-0"> 
                        <Row>
                        <Col>
                            <FormGroup check>
                            <Input type="radio" name="gender" value="male" id="male" onChange={this.handleChange}/>
                            <Label check for="male">
                                Male
                            </Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup check>
                            <Input type="radio" name="gender" value="female" id="female" onChange={this.handleChange}/>
                            <Label check for="female">
                                Female
                            </Label>
                            </FormGroup>
                        </Col>
                        </Row>
                    </Col>
                    <Col md='5' className="mt-0 mb-0"> 
                        <Row>
                        <Col>
                            <FormGroup check>
                            <Input type="radio" name="type" value="Student" id="student" onChange={this.handleChange}/>
                            <Label check for="student">
                                Student
                            </Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup check>
                            <Input type="radio" name="type" value="Teacher" id="teacher" onChange={this.handleChange}/>
                            <Label check for="teacher">
                                Teacher
                            </Label>
                            </FormGroup>
                        </Col>
                        </Row>
                    </Col>
                    {this.state.input.type === "Teacher" ? '' : <Col md='5' className="mt-3">
                        <FormGroup>
                        <Label for="exampleSelect">Select Your Semester</Label>
                                <Input type="select" name="select" id="semester" onChange={this.handleChange}>
                                {semesters && semesters[0].sems.map(sem => (
                                    <>
                                        <option key={sem} value={sem}>{sem}</option>
                                    </>
                                ))
                                }
                                </Input>
                        </FormGroup>
                    </Col>}
                </Row>
                <Button color="primary" className="signup-button" type="submit">Submit</Button>
                <p className="login-helper">Have an account already? <Link to="/login">Login</Link></p>
                {authError && <CustomAlert authError alert={authError}></CustomAlert>}
                </Container> 
                </Form> 
         </Col>
         <Footer/>
     </Row>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile, 
        branches: state.firestore.ordered.branches,
        semesters: state.firestore.ordered.semesters,
        authError: state.auth.authError,
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
firestoreConnect([{collection: 'branches'},     {
    collection: 'semesters',
    doc: 'SemesterDoc',
}]))(Signup);

