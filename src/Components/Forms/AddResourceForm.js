import React, { useState } from 'react'
import { Container,Row, Col, Input, Label, Button, UncontrolledTooltip } from 'reactstrap'
import {storage} from "../../config/fbConfig"
import { addResource } from '../../Store/actions/courseActions'
import { connect } from 'react-redux'

const AddResourceForm = ({course, addResource}) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(undefined);

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleFileUpload = (file, course, name) => {
        const currentCourse = course;
        const newFile = file;
        const title = name;
        var metadata = {
            contentType: 'application/pdf',
        }
        const uploadTask = storage.ref(`/courseResources/${title}`).put(newFile, metadata);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("courseResources")
            .child(title)
            .getDownloadURL()
            .then((url) => {
                addResource(currentCourse, title, url)
            });
        });
    }

    return(
        <Container>
            <Row md="12">
                <Col>
                    <Label htmlFor="name">Title</Label>
                    <Input type="" id="name" value={name} onChange={(e) => setName(e.target.value)}></Input>
                </Col>
            </Row>
            <Row md="12" className="mt-3">
                <Col md="4">
                    <Label htmlFor="name">Resource File</Label>
                    <Input type="file" onChange={handleFile} id="pdfUpload"></Input>
                    <UncontrolledTooltip placement='right' target="pdfUpload">
                        PDF Files only
                    </UncontrolledTooltip>
                </Col>
            </Row>
            <Button color="primary" className="mt-3 mb-3" onClick={() => {handleFileUpload(file, course, name)}}>Add Resource</Button>
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => {
    return({
        addResource: (course, title, url) => {
            dispatch(addResource(course, title, url))
        }
    })
}

export default connect(null, mapDispatchToProps)(AddResourceForm);