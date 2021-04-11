import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Card, Row, Container, Col, CardTitle, CardText, Button } from 'reactstrap';
import { compose } from 'redux';
import Notification from '../../../Components/Notification';
import Slider from '../../../Components/Slider';


const TeacherOverview = ({profile, classes, notifications}) => {
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
            <Card className="welcome-card mt-4">
                <h5>Your Classes</h5>
                <Row>
                {classes && classes.map((c) => (
                            <Col md='4'>
                                <Card className="class-card mt-2 mb-2"> 
                                    <CardTitle className="class-course">{c.course}</CardTitle>
                                    <CardText className="class-time">{c.time}</CardText>
                                    <Button className="class-btn">
                                        <a href={c.link} className="class-link">
                                            Go to Class
                                        </a>
                                    </Button>
                                </Card> 
                            </Col>
                    ))
                }
                </Row>
                {
                 classes.length === 0 && <h6 className="class-helper">No classes</h6>
                }
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
        classes: state.firestore.ordered.classes || [],
        notifications: state.firestore.ordered.notifications || []
    }
}

export default compose(connect(mapStateToProps), firestoreConnect((props) => [
    {
        collection: 'classes',
        where: ["teacher", "==", `${props.profile.name}`]
    },
    {
        collection: 'notifications',
    }
]))(TeacherOverview);