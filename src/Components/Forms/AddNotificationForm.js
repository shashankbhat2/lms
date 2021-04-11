import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import useForm from '../../Hooks/useForm'
import { addNewNotification } from '../../Store/actions/notificationActions'


const AddNotificationForm = ({addNewNotification}) => {
    
    const handleAddNotification = () => {
        addNewNotification(inputs)
    }


    const { inputs, handleInputChange, handleSubmit} = useForm({title:'', desc: ''}, handleAddNotification)

    return(
        <Form onSubmit={handleSubmit}>
            <Container>
                <Col>
                    <Row className="mt-2">
                        <Label htmlFor="title">Title</Label>
                        <Input  type="text" id="title" onChange={handleInputChange}></Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="desc">Description</Label>
                        <Input type="textarea"  id="desc" onChange={handleInputChange}></Input>
                    </Row>
                </Col>
                <Button color="primary" type="submit" className="mt-4">
                    Add Notification 
                </Button>
            </Container>
        </Form>
    )
}



const mapDispatchToProps = (dispatch) => {
    return({
        addNewNotification: (notification) => {
            dispatch(addNewNotification(notification))
        }
    })
}

export default connect(null, mapDispatchToProps)(AddNotificationForm);
