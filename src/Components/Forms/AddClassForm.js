import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import {addClass} from '../../Store/actions/classActions'
 
const AddClassForm = ({addClass, branches, courses, teacher}) => {
    
    const handleClass = () => {
        addClass(inputs)
    }


    const { inputs, handleInputChange, handleSubmit} = useForm({course:'', branch:'All', teacher: teacher.name, time: '', link: ''}, handleClass)

    return(
        <Form onSubmit={handleSubmit}>
            <Container>
                <Col>
                    <Row className="mt-2">
                        <Label htmlFor="branch">Branch</Label>
                        <Input type="select" className="selector" name="select" id="branch" onChange={handleInputChange}>
                            <option value='All'>All Students</option>
                            {branches && branches.map(branch => (
                            <option key={branch.id} value={branch.name}>{branch.name}</option>
                            ))}           
                        </Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="course">Course</Label>
                        <Input type="select" className="selector" name="select" id="course" onChange={handleInputChange}>
                            {courses && courses.map(course => (
                            <option key={course.id} value={course.title}>{course.title}</option>
                            ))}           
                        </Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="teacher">Teacher</Label>
                        <Input type="text"  id="teacher" value={teacher.name} disabled></Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="link">Class Link</Label>
                        <Input type="url"  id="link" onChange={handleInputChange}></Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="link">Class Timings</Label>
                        <Input type="time" id="time" onChange={handleInputChange}></Input>
                    </Row>
                </Col>
                <Button color="primary" type="submit" className="mt-4">
                    Add Class 
                </Button>
            </Container>
        </Form>
    )
}


const mapStateToProps = (state) => {
    return{
        courses: state.firestore.ordered.courses,
        branches: state.firestore.ordered.branches,
        teacher: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        addClass: (newClass) => {
            dispatch(addClass(newClass))
        }
    })
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
        {
            collection: 'courses'
        },
        {
            collection: 'branches'
        },
    ])
)(AddClassForm);