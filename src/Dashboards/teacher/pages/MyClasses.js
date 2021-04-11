import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Container,Row, Col, Button} from 'reactstrap'
import CustomModal from '../../../Components/Modal/'
import ClassesContainer from '../../../Components/Containers/ClassesContainer'
import AddClassForm from '../../../Components/Forms/AddClassForm'


const MyClasses = ({profile}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);

    const teacher = profile.name;

    return(
        <Container className="mt-4 mb-4">
        <h1 className="table-title mt-3 mb-3">My Classes</h1>
        <Row className='m-0'>
            <Row md='12'>
                <Col>
                    <Button onClick={toggle} color="primary">Add A Class</Button>
                </Col>
            </Row>
        </Row>
        <Row>
            <ClassesContainer teacher={teacher}></ClassesContainer>
        </Row>
        <CustomModal modal={isOpen} toggle={toggle} title="Add A New Class">
            <AddClassForm></AddClassForm>
        </CustomModal>  
     </Container>        
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(MyClasses);