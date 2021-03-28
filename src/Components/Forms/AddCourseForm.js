import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import {addCourse} from '../../Store/actions/courseActions'


const AddCourseForm = ({addCourse, branches}) => {
    
    const handleCourse = () => {
        addCourse(inputs)
    }


    const { inputs, handleInputChange, handleSubmit} = useForm({title:'', branch:'All', teacher: ''}, handleCourse)

    return(
        <Form onSubmit={handleSubmit}>
            <Container>
                <Col>
                    <Row className="mt-2">
                        <Label htmlFor="title">Title</Label>
                        <Input  type="text" id="title" onChange={handleInputChange}></Input>
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
                        <Label htmlFor="teacher">Teacher</Label>
                        <Input type="text"  id="teacher" onChange={handleInputChange}></Input>
                    </Row>
                </Col>
                <Button color="primary" type="submit" className="mt-4">
                    Add Course 
                </Button>
            </Container>
        </Form>
    )
}


const mapStateToProps = (state) => {
    return{
        branches: state.firestore.ordered.branches
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        addCourse: (course) => {
            dispatch(addCourse(course))
        }
    })
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
        {
            collection: 'branches'
        }
    ])
)(AddCourseForm);

