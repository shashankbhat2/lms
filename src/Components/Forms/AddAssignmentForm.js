import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import { addNewAssignment } from '../../Store/actions/assignmentActions'


const AddAssignmentForm = ({branches, teachers, addNewAssignment, courses, profile}) => {

    const teacher = profile.userType === "Teacher" ? profile.name : ""

    const handleAssignment = () => {
        addNewAssignment(inputs)
    }


    const { inputs, handleInputChange, handleSubmit} = useForm({question:'', branch: "All", url: '', course: "Web Technology" , teacher: teacher, lastDate: ''}, handleAssignment)

    return(
        <Form onSubmit={handleSubmit}>
        <Container>
            <Col>
                <Row className="mt-2">
                    <Label htmlFor="question">Assignment Question</Label>
                    <Input  type="text" id="question" onChange={handleInputChange}></Input>
                </Row>
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
                    <Label htmlFor="url">URL</Label>
                    <Input type="url"  id="url" onChange={handleInputChange}></Input>
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
                    <Input type="select" className="selector" name="select" id="teacher" onChange={handleInputChange}>
                        {teachers && teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
                        ))}           
                    </Input>
                </Row>
                <Row className="mt-2">
                    <Label htmlFor="lastDate">Submission Last Date</Label>
                    <Input type="date" id="lastDate" value={inputs.lastDate} onChange={handleInputChange}></Input>
                </Row>
            </Col>
            <Button color="primary" type="submit" className="mt-4">
                Add Assignment 
            </Button>
        </Container>
     </Form>
    )
}


const mapStateToProps = (state) => {
    return{
        branches: state.firestore.ordered.branches,
        teachers: state.firestore.ordered.teachers,
        courses: state.firestore.ordered.courses,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        addNewAssignment: (assignment) => {
            dispatch(addNewAssignment(assignment))
        }
    })
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
        {
            collection: 'branches'
        },
        {
            collection: 'users',
            where: ["userType", "==", "Teacher"],
            storeAs: 'teachers'
        },
        {
            collection: 'courses',
        }
    ])
)(AddAssignmentForm);
