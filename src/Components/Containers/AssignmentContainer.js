import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, CardBody, CardTitle, Col, Card} from 'reactstrap'
import { compose } from 'redux'
import CustomModal from '../Modal'
import SubmissionsTable from '../Table/SubmissionsTable'
import { removeAssignment } from '../../Store/actions/assignmentActions'

const AssignmentContainer = ({teacher, removeAssignment, assignments,branch, sortedByBranch, sortedByTeacher, profile}) => {
    const branchWise = teacher ?  sortedByTeacher : (branch === "All" ? assignments : sortedByBranch); 
    let sortedAssignments = branchWise;

    const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
    const [isUploadOpen, setUploadOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState('')

    const handleAssignmentRemove = (assignment) => {
        removeAssignment(assignment)
    }

    const submissionsToggle = (a) => 
    {   
        setSelectedAssignment(a)
        setIsSubmissionsOpen(!isSubmissionsOpen);
    }
    const uploadToggle = () => setUploadOpen(!isUploadOpen);



    return(
        <>
        {sortedAssignments && sortedAssignments.map((a) => (
        <Col md="5" className="mb-3" key={a.id}>
            <Card className="a-card">
                <CardBody>
                    <CardTitle className="a-title mb-4">
                    <span className="m-2">{a.question}</span> 
                    <p className="a-subtitle">{a.teacher}</p>
                    <p className="a-subtitle">{a.course}</p>
                    <p className="a-subtitle">{a.branch}</p>
                    </CardTitle>
                    <Button className="a-btn" color="primary">
                        <a href={a.questionUrl} className="link">
                        View 
                        </a>
                    </Button>
                    {profile.userType === "Student" ? undefined : 
                        <Button className="ml-3 edit a-btn" onClick={() => handleAssignmentRemove(a)}>
                            Remove
                        </Button>
                    }
                    {profile.userType === "Student" ? undefined : 
                        <Button className="ml-3 a-btn view" onClick={() => submissionsToggle(a)}>
                            View Submissions
                        </Button>
                    }
                    {profile.userType === "Student" ? 
                        <Button className="ml-3 a-btn view" onClick={uploadToggle}>
                            Upload Submission
                        </Button>
                        :
                        undefined
                    }
                    {profile.userType === "Student" ? 
                        <Button className="ml-3 a-btn view" onClick={uploadToggle}>
                            View My Submission
                        </Button>
                        :
                        undefined
                    }
                </CardBody>
            </Card>
        </Col>
        ))}
            <CustomModal modal={isSubmissionsOpen} toggle={submissionsToggle} title="All Submissions">
                    <SubmissionsTable assignment={selectedAssignment}></SubmissionsTable>
            </CustomModal>
            <CustomModal modal={isUploadOpen} toggle={uploadToggle} title="Add Your Submission">
            </CustomModal>
       </>
    )
}


const mapStateToProps = (state) => {
    return{
        assignments: state.firestore.ordered.assignments,
        sortedByBranch: state.firestore.ordered.sortedByBranch,
        sortedByTeacher: state.firestore.ordered.sortedByTeacher,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        removeAssignment: (assignment) => {
            dispatch(removeAssignment(assignment))
        }
    })
}


export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect((props) => [
    {
        collection: 'assignments',
    },
    {
        collection: 'assignments',
        where: ['branch', '==', `${props.branch}`],
        storeAs: 'sortedByBranch'
    },
    {
        collection: 'assignments',
        where: ['teacher', '==', `${props.teacher}`],
        storeAs: 'sortedByTeacher'
    }
]))(AssignmentContainer)