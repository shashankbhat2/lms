import React, { useState } from 'react'
import {Card, CardBody, CardTitle, Button, Row, Col, CardSubtitle, Container} from 'reactstrap'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import CustomModal from '../../Components/Modal'
import { removeCourse } from '../../Store/actions/courseActions'
import { NavLink } from 'react-router-dom'



const CourseCard = ({courses, branch, sortedByBranch, removeCourse, admin}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const handleCourseRemoval = (course) => {
        removeCourse(course)
    }


    const toggle = () => setIsOpen(!isOpen)

    const sortedCourses =  branch === "All Branches" ? courses : sortedByBranch;

    return(
        <React.Fragment>
        <Row md="12">
            {sortedCourses && sortedCourses.map((c) =>
                    <Col md='6' key={c.id}>
                        <Card className="course-card">
                            <CardBody>
                                <CardTitle className="course-t"><strong>{c.title}</strong></CardTitle>
                                <CardSubtitle className="mb-2 subtitle">{c.teacher}</CardSubtitle>
                                <CardSubtitle className="mb-2 subtitle">{c.branch}</CardSubtitle>
                                <CardSubtitle className="mb-2 subtitle">{c.courseId}</CardSubtitle>
                                <Button  color="primary" className="mr-3">
                                    <a href={`/courses/${c.title}`} className="link">
                                        View
                                    </a>
                                </Button>
                                {admin ? <Button onClick={toggle} color="danger"> Remove </Button> : undefined}
                            </CardBody>
                        </Card> 
                        <CustomModal toggle={toggle} modal={isOpen} title="Remove Course">
                            <Container>
                                <h4>Are you sure?</h4>
                                <Button color="danger" className="card-button w-25" onClick={() => handleCourseRemoval(c)}>Yes</Button>
                                <Button color="primary" className="card-button w-25 ml-2 mr-2" onClick={toggle}>No</Button>
                            </Container>
                        </CustomModal>
                    </Col>
            )}
        </Row>
        </React.Fragment>
    )
}



const mapStateToProps = (state) => {
    console.log(state)
    return{
        courses: state.firestore.ordered.courses,
        sortedByBranch: state.firestore.ordered.sortedByBranch
    }   
}

const mapDispatchToProps = (dispatch) => {
    return({
        removeCourse: (course) => {
            dispatch(removeCourse(course))
        }
    })
}


export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect((props) => [
    {
        collection: 'courses',
        storeAs: 'courses'
    },   
    {
        collection: 'courses',
        where: ['branch', '==', `${props.branch}`],
        storeAs: 'sortedByBranch'
    }
]))(CourseCard);
