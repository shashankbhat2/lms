import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Card, Row, Container, Col } from 'reactstrap';
import { compose } from 'redux';
import Notification from '../../../Components/Notification';
import Slider from '../../../Components/Slider';

// const  notifications = [
//     {
//         id:1,
//         title: 'ESA Schedule',
//         desc: 'ESA for Btech & Mtech scheduled from May 10th - 25th'
//     },
//     {
//         id:2,
//         title: 'Hacktomorrow',
//         desc: 'CSE Dept. Presents Hacktomorrow'
//     },
//     {
//         id:3,
//         title: 'CultFest2021',
//         desc: 'Inter Dept. Cultural festival'
//     },

// ]


const Overview = ({profile, notifications}) => {
    return(
        <Container className="mt-4 mb-4">
        <Row>
            <Slider></Slider>
            <Col md='3'>
                <Notification notifications={notifications} profile={profile}></Notification>        
            </Col>
            <Col md='9'>
            <Card className="welcome-card mt-4">
                <h2>Welcome</h2>
                <h4 className="username">{profile.name}</h4>
            </Card>            
            </Col>
        </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        profile: state.firebase.profile, 
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'notifications',
    }
]))(Overview);
