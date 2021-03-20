import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import { Card, Container, Row } from 'reactstrap';
import Footer from '../../Components/Footer/Footer';
import { connect } from 'react-redux';
import ErrorPage from '../../Errorpage';




const TeacherDashboard = ({profile, auth}) => {
    if(!auth.uid) return <Redirect to="/login"></Redirect>   
    if(profile.userType !== 'Teacher') return (<ErrorPage></ErrorPage>)

    return(
        <div>
            <Container className="mt-4 mb-4">
                <Row>
                    <Card className="welcome-card">
                        <h2>Welcome</h2>
                        <h4 className="username">{profile.name}</h4>
                    </Card>
                </Row>
                <Row>
                    <div>Hello</div>
                </Row>
            </Container>
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

export default connect(mapStateToProps)(TeacherDashboard);

