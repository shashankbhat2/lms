import React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import Overview from './pages/Overview'
import StudentTable from './pages/Students'
import Student from './pages/Student';
import CustomAlert from '../../Components/Alert';




const AdminDashboard = ({auth, authSuccess}) => {
    if(!auth.uid) return <Redirect to="/login"></Redirect>   

    return(
        <div>
            {authSuccess && <CustomAlert alert={authSuccess}></CustomAlert>}
            <Switch>
                    <Route exact path="/" component={Overview}></Route>
                    <Route exact path="/students" component={StudentTable}></Route>
                    <Route exact path="/students/:student" component={Student}></Route>
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



