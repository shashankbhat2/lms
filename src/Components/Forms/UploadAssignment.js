import React,{useState} from 'react'
import { Container,Row, Col, Input, Label, Button} from 'reactstrap'
import {storage} from "../../config/fbConfig"
import { connect } from 'react-redux'
import { addNewSubmission } from '../../Store/actions/assignmentActions'

const UploadAssignmentForm = ({addNewSubmission, assignment, profile}) => {
    const [currentAssigment, setCurrentAssignment] = useState(assignment)
    const student = profile.name;
    const srn = profile.SRN;
    console.log(srn)
    const [file, setFile] = useState(undefined);

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleFileUpload = (file, student,  assignment, srn) => {
        const newFile = file;
        const title = assignment.question;
        var metadata = {
            contentType: 'application/pdf',
        }
        const uploadTask = storage.ref(`/assignmentSubmissions/${title}`).put(newFile, metadata);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("assignmentSubmissions")
            .child(title)
            .getDownloadURL()
            .then((url) => {
                addNewSubmission(assignment, student, url, srn)
            });
        });
    }

    return(
        <Container>
            <Row md="12">
                <Col md="4">
                    <Label htmlFor="name">Assignment</Label>
                    <Input type="" id="name" value={assignment.question} disabled></Input>
                </Col>
                <Col md="4">
                    <Label htmlFor="name">Student Name</Label>
                    <Input type="" id="name" value={profile.name} disabled></Input>
                </Col>
            </Row>
            <Row md="12" className="mt-3">
                <Col md="4">
                    <Label htmlFor="name">Assignment File</Label>
                    <Input type="file" onChange={handleFile} id="pdfUpload"></Input>
                </Col>
            </Row>
            <Button color="primary" className="mt-3 mb-3" onClick={() => {handleFileUpload(file,student, currentAssigment, srn)}}>Upload Assignment</Button>
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => {
    return({
        addNewSubmission: (assignment, student, url, srn) => {
            dispatch(addNewSubmission(assignment, student, url, srn))
        }
    })
}

export default connect(null, mapDispatchToProps)(UploadAssignmentForm);