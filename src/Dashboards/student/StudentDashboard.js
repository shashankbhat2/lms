import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import { connect } from 'react-redux';
import Home from './pages/Home'
import ErrorPage from '../../Errorpage';
import StudentForum from '../forum/StudentForum';
import Courses from '../admin/pages/Courses'
import Course from '../admin/pages/Course'
import Assignments from '../admin/pages/Assignments'

const StudentDashboard = ({profile, auth}) => {
    if(!auth.uid) return <Redirect to="/login"></Redirect>   
    if(profile && profile.userType !== 'Student') return (<ErrorPage></ErrorPage>)

    return(
        <div>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/courses" component={Courses}></Route>
                        <Route exact path="/courses/:course" component={Course}></Route>
                        <Route exact path="/assignments" component={Assignments}></Route>
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
    }
}

export default connect(mapStateToProps)(StudentDashboard);


