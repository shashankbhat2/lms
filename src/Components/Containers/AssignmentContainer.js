import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Col} from 'reactstrap'
import { compose } from 'redux'
import CustomModal from '../Modal'
import SubmissionsTable from '../Table/SubmissionsTable'
import { removeAssignment } from '../../Store/actions/assignmentActions'
import AssignmentCard from '../Cards/AssignmentCard'
import UploadAssignment from '../Forms/UploadAssignment'
import ViewSubmissionContainer from './ViewSubmissionContainer'

const AssignmentContainer = ({teacher, removeAssignment, assignments,branch, sortedByBranch, sortedByTeacher, profile}) => {
    const branchWise = teacher ?  sortedByTeacher : (branch === "All" ? assignments : sortedByBranch); 
    let sortedAssignments = branchWise;

    const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
    const [isMySubmissionOpen, setMySubmissionOpen] = useState(false);
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
    const uploadToggle = (a) => {   
            setSelectedAssignment(a)
            setUploadOpen(!isUploadOpen);
    }
    
    const mySubmissionToggle = (a) => {
        setSelectedAssignment(a)
        setMySubmissionOpen(!isMySubmissionOpen)
    }



    return(
        <React.Fragment>
        {sortedAssignments && sortedAssignments.length !== 0 ? sortedAssignments.map((assignment) => (
        <Col md="5" className="mb-3" key={assignment.id}>
            <AssignmentCard assignment={assignment} profile={profile} uploadToggle={uploadToggle} submissionsToggle={submissionsToggle} mySubmissionToggle={mySubmissionToggle} handleAssignmentRemove={handleAssignmentRemove}></AssignmentCard>
        </Col>
        )) : (
            <div className="w-100 mt-2 ml-3 mb-2 empty-div">
                <p className="center-text">You have created 0 Assignments</p>
            </div> 
        
        )}
            <CustomModal modal={isSubmissionsOpen} toggle={submissionsToggle} title="All Submissions">
                    <SubmissionsTable assignment={selectedAssignment}></SubmissionsTable>
            </CustomModal>
            <CustomModal modal={isUploadOpen} toggle={uploadToggle} title="View My Submission">
                    <UploadAssignment assignment={selectedAssignment} profile={profile}></UploadAssignment>
            </CustomModal>
            <CustomModal modal={isMySubmissionOpen} toggle={mySubmissionToggle} title="View My Submission">
                    <ViewSubmissionContainer assignment={selectedAssignment} profile={profile}></ViewSubmissionContainer>
            </CustomModal>
       </React.Fragment>
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