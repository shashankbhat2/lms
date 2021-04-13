import React,{useState} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Container, Input,Row, Col, Button} from 'reactstrap'
import CustomModal from '../../../Components/Modal/'
import AssignmentContainer from '../../../Components/Containers/AssignmentContainer'
import AddAssignmentForm from '../../../Components/Forms/AddAssignmentForm'


const MyAssignments = ({profile}) => {
    const teacher = profile.name

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);


    return(
        <Container className="mt-4 mb-4">
        <h1 className="table-title mt-3 mb-3">My Assignments</h1>
        <Row className='mb-3 m-0 mt-3'>
            <Row md='12'>
                <Col>
                    <Button onClick={toggle} color="primary">Add Assignment</Button>
                </Col>
            </Row>
        </Row>
        <Row className="mt-4 mb-4">
            <AssignmentContainer teacher={teacher}></AssignmentContainer>
        </Row>
        <CustomModal modal={isOpen} toggle={toggle} title="Add New Assignment">
            <AddAssignmentForm></AddAssignmentForm>
        </CustomModal>  
     </Container>        
    )
}


const mapStateToProps = (state) => {
    return{
        branches: state.firestore.ordered.branches,
        profile: state.firebase.profile
    }
}



export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'branches'
    }
])) (MyAssignments);