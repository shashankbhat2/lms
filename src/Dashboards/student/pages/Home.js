import React from 'react'
import { connect } from 'react-redux';
import { Card, Row, Container, Col, CardTitle, CardText, Button } from 'reactstrap';
import Notification from '../../../Components/Notification';
import Slider from '../../../Components/Slider';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'


const  notifications = [
    {
        title: 'ESA Schedule',
        desc: 'ESA for Btech & Mtech scheduled from May 10th - 25th'
    },
    {
        title: 'Hacktomorrow',
        desc: 'CSE Dept. Presents Hacktomorrow'
    },
    {
        title: 'CultFest2021',
        desc: 'Inter Dept. Cultural festival'
    },

]


const Home = ({profile,classes}) => {

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
                {
                    profile.suspended ? <h6 className="text-danger class-helper m-5 p-2"><b>You have been suspended for not attending classes regularly. <br></br> Please report to your class coordinator</b></h6>  : classes && classes.map((c) => (
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
        classes: state.firestore.ordered.classes || []
    }
}

export default compose(connect(mapStateToProps),  firestoreConnect(props => [{ collection: 'classes', where: [['branch', '==', `${props.profile.Branch}`]] }]))(Home);