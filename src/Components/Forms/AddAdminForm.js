import React from 'react'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import useForm from '../../Hooks/useForm'

const AddAdminForm = () => {
    const handleAdminAdd = () => {
        fetch('https://us-central1-elearning-project-5423b.cloudfunctions.net/addAdmin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },       
            body: JSON.stringify({
                email: inputs.email,
                name: inputs.name,
                password: inputs.password,
                phone: inputs.phone,
            })
        })
        .then((res) => (res.json()))
        .then((result) => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    }


    const { inputs, handleInputChange, handleSubmit} = useForm({name: '', email: '', phone: '', password:''}, handleAdminAdd)

    return(
        <Form onSubmit={handleSubmit}>
            <Container>
                <Col>
                    <Row className="mt-2">
                        <Label htmlFor="question">Admin Name</Label>
                        <Input type="text"  id="name" onChange={handleInputChange}></Input>
                    </Row>
                </Col>
                <Col>
                    <Row className="mt-2">
                        <Label htmlFor="email">Admin Email</Label>
                        <Input type="text"  id="email" onChange={handleInputChange}></Input>
                    </Row>
                </Col>
                <Col>
                    <Row className="mt-2">
                        <Label htmlFor="password">Admin Password</Label>
                        <Input type="password"  id="password" onChange={handleInputChange}></Input>
                    </Row>
                </Col>
                <Col>
                    <Row className="mt-2">
                        <Label htmlFor="phone">Admin Phone</Label>
                        <Input type="text"  id="phone" onChange={handleInputChange}></Input>
                    </Row>
                </Col>
                <Button color="primary" type="submit" className="mt-4">
                    Add Admin 
                </Button>
            </Container>
        </Form>
    )
}



export default AddAdminForm;