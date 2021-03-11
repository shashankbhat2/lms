import React from 'react'
// import { Redirect, Route, Switch } from 'react-router';
import { Card, Container, Row } from 'reactstrap';
import Footer from '../../Components/Footer/Footer';
import CustomNavbar from '../../Components/Navbar/Navbar';
import { connect } from 'react-redux';


const links = [
    {
        "link": "Students",
        "url": "/students"
    },
    {
        "link": "Courses",
        "url": "/courses"
    },
    {
        "link": "Assigments",
        "url": "/assignments"
    },
    {
        "link": "Assigment Submissions",
        "url": "/assignmentsubmissions"
    },
    {
        "link": "Student Doubts",
        "url": "/doubts"
    },
]


const StudentDashboard = ({profile}) => {
    return(
        <div>
        <CustomNavbar links={links} currentUser={profile}></CustomNavbar>
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
    console.log(state)
    return {
        profile: state.firebase.profile, 
    }
}

export default connect(mapStateToProps)(StudentDashboard);


