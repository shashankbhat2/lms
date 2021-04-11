import React,{useState} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Container, Input,Row, Col, Button} from 'reactstrap'
import CustomModal from '../../../Components/Modal/'
import AssignmentContainer from '../../../Components/Containers/AssignmentContainer'
import AddAssignmentForm from '../../../Components/Forms/AddAssignmentForm'


const Assignments = ({branches, profile}) => {
    const [selectedBranch, setSelectedBranch] = useState('All');
    const [isOpen, setIsOpen] = useState(false)

    const student = profile.userType  === 'Student' ? profile : false;

    const toggle = () => setIsOpen(!isOpen);

    const handleBranch = (e) => {
        setSelectedBranch(e.target.value)
    }

    return(
        <Container className="mt-4 mb-4">
        <h1 className="table-title mt-3 mb-3">Assignments</h1>
        <Col md='2'>
                <h3 className="branch">Branch: <span>{selectedBranch}</span></h3>
            </Col>
        <Row className='m-3'>

            <Row md='12'>
                <Col md='3'>
                    <p>Select Branch</p>
                    </Col>
                <Col >
                    <Input type="select" className="selector" name="select" id="branch" onChange={handleBranch}>
                        <option value='All' defaultValue>All Students</option>
                        {branches && branches.map(branch => (
                        <option key={branch.id} value={branch.name}>{branch.name}</option>
                        ))}           
                    </Input>
                </Col>
                <Col>
                  {student ? undefined : <Button onClick={toggle} color="primary">Add Assignment</Button>}
                </Col>
            </Row>
        </Row>
        <Row>
            <AssignmentContainer branch={selectedBranch}></AssignmentContainer>
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
])) (Assignments);