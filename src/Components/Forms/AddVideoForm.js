import React, { useState } from 'react'
import { Container,Row, Col, Input, Label, Button, UncontrolledTooltip } from 'reactstrap'
import {storage} from "../../config/fbConfig"
import { addNewVideo } from '../../Store/actions/courseActions'
import { connect } from 'react-redux'

const AddVideoForm = ({course, addNewVideo}) => {
    const [name, setName] = useState('');
    const [video, setVideo] = useState(undefined);

    const handleFile = (e) => {
        setVideo(e.target.files[0])
    }

    const handleFileUpload = (file, course, name) => {
        const currentCourse = course;
        const newVideo = file;
        const title = name;
        var metadata = {
            contentType: 'video/mp4',
        }
        const uploadTask = storage.ref(`/courseVideos/${title}`).put(newVideo, metadata);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("courseVideos")
            .child(title)
            .getDownloadURL()
            .then((url) => {
                addNewVideo(currentCourse, title, url)
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
                <Col md="5">
                    <Label htmlFor="name">Video File</Label>
                    <Input type="file" onChange={handleFile} id="pdfUpload"></Input>
                    <UncontrolledTooltip placement='right' target="pdfUpload">
                        Video Files
                    </UncontrolledTooltip>
                </Col>
            </Row>
            <Button color="primary" className="mt-3 mb-3" onClick={() => {handleFileUpload(video, course, name)}}>Add Video</Button>
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => {
    return({
        addNewVideo: (course, title, url) => {
            dispatch(addNewVideo(course, title, url))
        }
    })
}

export default connect(null, mapDispatchToProps)(AddVideoForm);