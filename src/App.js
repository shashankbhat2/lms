import {Redirect, Route, Switch } from 'react-router-dom';
import React from 'react'
import './App.css';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import AdminDashboard from './Dashboards/admin/AdminDashboard'
import StudentDashboard from './Dashboards/student/StudentDashboard'
import TeacherDashboard from './Dashboards/teacher/TeacherDashboard'
import {connect} from 'react-redux';
import './App.css'
import ErrorPage from './Errorpage';
import CustomNavbar from './Components/Navbar/Navbar';
import {ADMIN_ROUTES, STUDENT_ROUTES, TEACHER_ROUTES} from './Routes'
import CustomAlert from './Components/Alert'




class App extends React.Component{
  render(){
    const {profile,auth} = this.props;
    
    var links;

    if(profile.userType === "Admin"){
      links = ADMIN_ROUTES;
    }else if(profile.userType === "Teacher"){
      links = TEACHER_ROUTES;
    }else{
      links = STUDENT_ROUTES;
    }
  
  return(
        <div>
         {auth && !auth.uid ? '' : <CustomNavbar links={links} currentUser={profile}></CustomNavbar>}
         <Switch>
          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/404" component={ErrorPage}></Route>
          {
            auth && !auth.uid && <Redirect to="/login"></Redirect>
          }
          {
            profile.userType === "Admin" && <AdminDashboard></AdminDashboard> 
          }
          {
            profile.userType === "Student" && <StudentDashboard></StudentDashboard>
          }
          {
            profile.userType === "Teacher" && <TeacherDashboard></TeacherDashboard> 
          }
          </Switch>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
      profile: state.firebase.profile,
      auth: state.firebase.auth,
  }
}


export default connect(mapStateToProps)(App);
