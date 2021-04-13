import React from 'react'
import { Button, CardBody, CardTitle, Card} from 'reactstrap'

const AssignmentCard = ({assignment, handleAssignmentRemove, profile, uploadToggle, submissionsToggle, mySubmissionToggle}) => {
     const isStudent =  profile.userType === "Student" ? true : false
     
     var today = new Date().getDate();
     var lastDate = new Date(assignment.lastDate).getDate();
     const deadline = today > lastDate ? true : false    
    
     return(
        <Card className="a-card">
        <CardBody>
            <CardTitle className="a-title mb-4">
            <h5 className="m-2">Question: {assignment.question}</h5> 
            <p className="ml-2 a-subtitle">Teacher: {assignment.teacher}</p>
            <p className="ml-2 a-subtitle">Branch: {assignment.branch}</p>
            <p className="ml-2 a-subtitle">Last Date For Submission: {assignment.lastDate}</p>
            <p className="ml-2 a-subtitle">Course: {assignment.course}</p>
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
            {isStudent ? deadline ? 
                <p className="ml-2 error">
                    Deadline Over
                </p> :
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