import React, { useState } from 'react'
import { connect } from 'react-redux';
import {TrashCan24} from '@carbon/icons-react'
import { Badge, Button, Card, CardTitle, Col, Input, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { addComment, removeQuestion, removeComment } from '../../Store/actions/forumActions';


const ForumQuestionCard = ({question, profile, removeQuestion, removeComment, addComment}) => {
    let isTeacher = profile.userType === "Teacher" ? true : false;
    const [comment, setComment] = useState('')

    const handleRemove = () => {
        removeQuestion(question)
    }

    const handleComment = (question, comment, user) => {
        addComment(question, comment, user)
    }

    const handleCommentRemove = (question, comment, user) => {
        removeComment(question, comment, user)
    }


    return( 
        <React.Fragment>
        <Col md="4">
        <Card className="question-card mt-2"> 
            <p className="user">{question.user}</p>
            <CardTitle className="forum-question">{question.question}</CardTitle>
            <Row>
                <Col md="8">
                    <Badge className="topic">{question.topic}</Badge>  
                </Col>
                {profile.name === question.user ? <Col>
                    <TrashCan24 className="remove-question" onClick={() => handleRemove(question)}/>                </Col> : undefined}
            </Row>
        </Card>
        {isTeacher && <div className="comment-section">
                <Row>
                <Col>
                    <p className="commenter">{profile.name}</p>
                </Col>
                <Col md="10">
                    <Input type="textarea" onChange={(e) => setComment(e.target.value)}></Input>
                </Col>
                <Col className="mt-2">
                    <Button color="info" onClick={() => handleComment(question, comment, profile.name)}>Answer</Button>
                </Col>    
        </Row></div>}  
        <div className="comments">
        <p className="m-2 answers">{question.answers.length === 0 ? 'No Answers Yet' : 'Answers'}</p>     
        {question.answers.map((a) =>( 
            <ListGroup className="comment">
                <ListGroupItem>
                    <span className="comment-user">{a.user}</span>
                    <h6 className="comment-answer mt-2 mb-2">{a.comment}</h6>
                    {
                        profile.name === a.user ? 
                            <TrashCan24 className="remove-question" onClick={() => handleCommentRemove(question,  a.comment, a.user)}/>
                        : undefined
                    }
                </ListGroupItem>
            </ListGroup>
        ))}
        </div>
        </Col>
       </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        removeQuestion: (question) => {
            dispatch(removeQuestion(question))
        },
        addComment: (question, comment, user) => {
            dispatch(addComment(question, comment, user))
        },
        removeComment: (question, comment, user) => {
            dispatch(removeComment(question, comment, user))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ForumQuestionCard);