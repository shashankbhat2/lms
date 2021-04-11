import React, { useState } from 'react'
import {Row, Container, Col} from 'reactstrap'

const ViewSubmissionContainer = ({assignment, profile}) => {
    const [currentAssigment, setCurrentAssignment] = useState(assignment);
    const submission = currentAssigment.submissions.find((s) => s.name === profile.name)
    return(
        <Container>
            { submission ? 
            <>
                <Row>
                    <p className="info-label">Student Name: <span className="s-name ml-3">{submission.name} </span></p>
                </Row>
                <Row>
                    <p className="info-label">Submission Url: <a className="btn btn-primary ml-3" href={submission.url}>View</a></p>
                </Row>
                <Row>
                    <p className="info-label">Marks: <span className="s-name ml-3">{submission.marks}</span></p>
                </Row>
            </> 
            : 
            <p className="m-auto s-name">No Submission</p>  }
        </Container>
    )
}

export default ViewSubmissionContainer;