import React from 'react'
import { Button, CardBody, CardTitle, Card} from 'reactstrap'

const AssignmentCard = ({assignment, handleAssignmentRemove, profile, uploadToggle, submissionsToggle, mySubmissionToggle}) => {
     const isStudent =  profile.userType === "Student" ? true : false
    return(
        <Card className="a-card">
        <CardBody>
            <CardTitle className="a-title mb-4">
            <span className="m-2">{assignment.question}</span> 
            <p className="a-subtitle">{assignment.teacher}</p>
            <p className="a-subtitle">{assignment.course}</p>
            <p className="a-subtitle">{assignment.branch}</p>
            </CardTitle>
            <Button className="a-btn" color="primary">
                <a href={assignment.questionUrl} className="link">
                View 
                </a>
            </Button>
            {isStudent ? undefined : 
                <Button className="ml-2 edit a-btn" onClick={() => handleAssignmentRemove(assignment)}>
                    Remove
                </Button>
            }
            {isStudent ? undefined : 
                <Button className="ml-2 a-btn view" onClick={() => submissionsToggle(assignment)}>
                    View Submissions
                </Button>
            }
            {isStudent ? 
                <Button className="ml-2 a-btn view" onClick={() => uploadToggle(assignment)}>
                    Upload Submission
                </Button>
                :
                undefined
            }
            {isStudent ? 
                <Button className="a-btn ml-2" color="info" onClick={()=> mySubmissionToggle(assignment)}>
                    View My Submission
                </Button>
                :
                undefined
            }
        </CardBody>
    </Card>
    )
}


export default AssignmentCard;