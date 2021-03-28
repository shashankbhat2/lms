import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import { updateStudentInfo } from '../../Store/actions/studentActions'
import CustomAlert from '../Alert'

const EditStudentForm = ({student, updateStudentInfo, edited}) => {

    const updateStudent = () => {
       updateStudentInfo(inputs)
    }    
    
    const {inputs, handleInputChange, handleSubmit} = useForm({
          id:student.id, 
          name: student.name, 
          email: student.email, 
          father: student.father, 
          mother: student.mother, 
          srn:student.SRN, 
          dob:student.dob, 
          sslc:student.sslc, 
          puc: student.puc, 
          rank:student.rank, 
          address: student.address,
          branch: student.Branch,
          semester: student.semester,
    }, updateStudent);


    return(
        <Form onSubmit={handleSubmit}>
            <Container>
            <Row md="12">
                <Col md="5">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" value={inputs.name} onChange={handleInputChange} disabled></Input>
                </Col>
                <Col md="5">
                    <Label htmlFor="srn">SRN</Label>
                    <Input type="text" id="srn" value={inputs.srn} onChange={handleInputChange} disabled></Input>
                </Col>
            </Row>
            <Row md="12" className='mt-4 mb-4'>
                <Col md="5">
                    <Label htmlFor="branch">Branch</Label>
                    <Input type="text" id="branch" value={inputs.branch} onChange={handleInputChange}></Input>
                </Col>
                <Col md="5">
                    <Label htmlFor="semester">Semester</Label>
                    <Input type="text" id="semester" value={inputs.semester} onChange={handleInputChange}></Input>
                </Col>
            </Row>
            <Row md="12" className='mt-4 mb-4'>
                <Col md="5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" value={inputs.email} onChange={handleInputChange}></Input>
                </Col>
                <Col md="5">
                    <Label htmlFor="dob">DOB</Label>
                    <Input type="text" id="dob" value={inputs.dob} onChange={handleInputChange}></Input>
                </Col>
            </Row>
            <Row md="12" className='mt-4 mb-4'>
                <Col md="5">
                    <Label htmlFor="father">Father's Name</Label>
                    <Input type="text" id="father" value={inputs.father} onChange={handleInputChange}></Input>
                </Col>
                <Col md="5">
                    <Label htmlFor="mother">Mother's Name</Label>
                    <Input type="text" id="mother" value={inputs.mother} onChange={handleInputChange}></Input>
                </Col>
            </Row>
            <Row md="12" className='mt-4 mb-4'>
                <Col md="5">
                    <Label htmlFor="sslc">SSLC</Label>
                    <Input type="text" id="sslc" value={inputs.sslc} onChange={handleInputChange}></Input>
                </Col>
                <Col md="5">
                    <Label htmlFor="puc">PUC</Label>
                    <Input type="text" id="puc" value={inputs.puc} onChange={handleInputChange}></Input>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Label htmlFor="sslc">Address</Label>
                    <Input type="textarea" id="address" value={inputs.address} onChange={handleInputChange}></Input>
                </Col>
            </Row>
            <Button type="submit" className="mt-3 mb-3" color="primary">Edit Student</Button>
            {edited && <CustomAlert alert={edited}></CustomAlert>}
            </Container>
        </Form>
    )
}


const mapStateToProps = (state) => {
    console.log(state)
    return{
        edited: state.student.edited
    }
}


const mapDispatchToProps = (dispatch) => {
    return({
        updateStudentInfo: (student) => {
            dispatch(updateStudentInfo(student))
        }
    })
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(EditStudentForm);


