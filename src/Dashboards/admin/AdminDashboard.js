import React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import Overview from './pages/Overview'
import Students from './pages/Students'
import Student from './pages/Student';
import CustomAlert from '../../Components/Alert';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Teachers from './pages/Teachers';
import Assignments from './pages/Assignments';
import Admins from './pages/Admins';
import Teacher from './pages/Teacher';




const AdminDashboard = ({auth, upload, authSuccess}) => {

    if(!auth.uid) return <Redirect to="/login"></Redirect>   

    
    return(
        <div>
            {authSuccess && <CustomAlert alert={authSuccess}></CustomAlert>}
            <Switch>
                    <Route exact path="/" component={Overview}></Route>
                    <Route exact path="/students" component={Students}></Route>
                    <Route exact path="/teachers" component={Teachers}></Route>
                    <Route exact path="/students/:student" component={Student}></Route>
                    <Route exact path="/teachers/:teacher" component={Teacher}></Route>
                    <Route exact path="/courses" component={Courses}></Route>
                    <Route exact path="/courses/:course" component={Course}></Route>
                    <Route exact path="/assignments" component={Assignments}></Route>
                    <Route exact path="/admins" component={Admins}></Route>
            </Switch>
            <Footer></Footer>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authSuccess: state.auth.authSuccess,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(AdminDashboard);



