import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import { connect } from 'react-redux';
import ErrorPage from '../../Errorpage';
import TeacherOverview from './pages/TeacherOverview';
import CustomAlert from '../../Components/Alert';
import Courses from '../admin/pages/Courses';
import Course from '../admin/pages/Course';
import MyAssignments from './pages/MyAssignments';
import MyClasses from './pages/MyClasses';
import StudentForum from '../forum/StudentForum';




const TeacherDashboard = ({profile, auth, authSuccess}) => {
    if(!auth.uid) return <Redirect to="/login"></Redirect>   
    if(profile.userType !== 'Teacher') return (<ErrorPage></ErrorPage>)

    return(
        <div>
            {authSuccess && <CustomAlert alert={authSuccess}></CustomAlert>}
            <Switch>
                    <Route exact path="/" component={TeacherOverview}></Route>
                    <Route exact path="/courses" component={Courses}></Route>
                    <Route exact path="/courses/:course" component={Course}></Route>
                    <Route exact path="/myassignments" component={MyAssignments}></Route>
                    <Route exact path="/myclasses" component={MyClasses}></Route>
                    <Route exact path="/forum" component={StudentForum}></Route>
            </Switch>
            <Footer></Footer>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile, 
        authSuccess: state.auth.authSuccess,
    }
}

export default connect(mapStateToProps)(TeacherDashboard);

