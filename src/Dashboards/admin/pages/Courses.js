import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Container, Row, Col, Input, Button} from 'reactstrap'
import CourseCard from '../../../Components/Cards/CourseCard'
import CustomModal from '../../../Components/Modal'
import AddCourseForm from '../../../Components/Forms/AddCourseForm'

const Courses = ({branches, profile}) => {
 const [branch, setBranch] = useState('All Branches')

 const admin = profile.userType === "Admin" ? true : false;

 const [isOpen, setIsOpen] = useState(false);

 const toggle = () => setIsOpen(!isOpen);


 const handleBranch = (e) => {
    setBranch(e.target.value)
 }


 return(
    <Container className="mt-4 mb-4">
     <h1 className="table-title mt-3 mb-3">Courses</h1>
            <Row className="mt-4 mb-4">
                <Col md='2'>
                    <h3 className="branch">Branch: <span>{branch}</span></h3>
                </Col>
                <Row md='12' className="m-0">
                    <Col md='2'>
                        <p>Select Branch</p>
                        </Col>
                    <Col md="4">
                        <Input type="select" className="selector mb-3 w-auto" name="select" id="branch" onChange={handleBranch}>
                            <option value='All Branches' defaultValue>All Branches</option>
                            {branches && branches.map(branch => (
                            <option key={branch.id} value={branch.name}>{branch.name}</option>
                            ))}           
                        </Input>
                    </Col>
                    <Col md="6">
                         {admin ? <Button color='primary' className="mt-auto w-auto" onClick={toggle}>Add New Course</Button> : undefined}
                    </Col>
                </Row>
            </Row>
            <CourseCard branch={branch} admin={admin}></CourseCard>
            <CustomModal title="Add New Course" modal={isOpen} toggle={toggle}>
                <AddCourseForm></AddCourseForm>
            </CustomModal>
    </Container>
 )
}

const mapStateToProps = (state) => {
    return{
        branches: state.firestore.ordered.branches,
        profile: state.firebase.profile
    }   
}

export default compose(connect(mapStateToProps),  firestoreConnect([
    {
        collection: 'branches'
    },  
])) (Courses);