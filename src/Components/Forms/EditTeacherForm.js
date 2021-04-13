import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import { updateTeacherInfo } from '../../Store/actions/teacherActions'

const EditTeacherForm = ({teacher, updateTeacherInfo}) => {

    const updateTeacher = () => {
        updateTeacherInfo(inputs)
    }    
    
    const {inputs, handleInputChange, handleSubmit} = useForm({
          id:teacher.id, 
          name: teacher.name, 
          email: teacher.email, 
          father: teacher.father, 
          mother: teacher.mother, 
          srn:teacher.SRN, 
          gender: teacher.gender,
          dob:teacher.dob, 
          sslc:teacher.sslc, 
          puc: teacher.puc, 
          bachelor: teacher.bachelor,
          master: teacher.master,
          address: teacher.address,
          branch: teacher.Branch
    }, updateTeacher);


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
                    <Label htmlFor="gender">Gender</Label>
                    <Input type="text" id="gender" value={inputs.gender} onChange={handleInputChange} disabled></Input>
                </Col>
                <Col md="5">
                    <Label htmlFor="branch">Branch</Label>
                    <Input type="text" id="branch" value={inputs.branch} onChange={handleInputChange}></Input>
                </Col>
            </Row>
            <Row md="12" className='mt-4 mb-4'>
                <Col md="5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" value={inputs.email} onChange={handleInputChange}></Input>
                </Col>
                <Col md="5">
                    <Label htmlFor="dob">DOB</Label>
                    <Input type="date" id="dob" value={inputs.dob} onChange={handleInputChange}></Input>
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
                <Col md="5">
                    <Label htmlFor="bachelor">Bachelor's Degree</Label>
                    <Input type="text" id="bachelor" value={inputs.bachelor} onChange={handleInputChange}></Input>
                </Col>
                <Col md="5" className="mt-2">
                    <Label htmlFor="master">Master's Degree</Label>
                    <Input type="text" id="master" value={inputs.master} onChange={handleInputChange}></Input>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Label htmlFor="sslc">Address</Label>
                    <Input type="textarea" id="address" value={inputs.address} onChange={handleInputChange}></Input>
                </Col>
            </Row>
            <Button type="submit" className="mt-3 mb-3" color="primary">Edit Teacher</Button>
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
        updateTeacherInfo: (teacher) => {
            dispatch(updateTeacherInfo(teacher))
        }
    })
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(EditTeacherForm);


