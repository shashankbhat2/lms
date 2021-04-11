import React, {useState} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Container, Col, Row, Button, Card } from 'reactstrap'
import CustomModal from '../../Components/Modal'
import { compose } from 'redux'
import ForumQuestionCard from '../../Components/Cards/ForumQuestionCard'
import AddQuestionForm from '../../Components/Forms/AddQuestionForm'


const StudentForum = ({user, questions}) => {
    let isStudent = user.userType === "Student" ? true : false;
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);

    return(
        <Container>
            <h2 className="table-title mt-3 mb-3">Student Forum</h2>
            <Col md="3" className="mt-3 mb-3">
                {isStudent && <Button color="primary" className="button" onClick={toggle}>Add A Question</Button>}
            </Col>
            <Row className="table-title mt-3 mb-3">
            {questions && questions.map((question) => (
                                    <ForumQuestionCard question={question} profile={user}></ForumQuestionCard>
            ))}
            </Row>
            <CustomModal modal={isOpen} toggle={toggle} title="Add a New Question">
                <AddQuestionForm></AddQuestionForm>
            </CustomModal>
        </Container>
    )
}


const mapStateToProps = (state) => {
    console.log(state)
    return{
        questions: state.firestore.ordered.studentquestions,
        user: state.firebase.profile
    }
}


export default compose(connect(mapStateToProps), firestoreConnect([
        {
            collection: 'studentquestions',
        }
]))(StudentForum);