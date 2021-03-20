import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import { connect } from 'react-redux';
import Home from './pages/Home';
import ErrorPage from '../../Errorpage';


const StudentDashboard = ({profile, auth}) => {
    if(!auth.uid) return <Redirect to="/login"></Redirect>   
    if(profile && profile.userType !== 'Student') return (<ErrorPage></ErrorPage>)

    return(
        <div>
                    <Switch>
                        <Route path="/" component={Home}></Route>
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


