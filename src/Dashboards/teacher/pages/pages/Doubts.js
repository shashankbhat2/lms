import React from 'react'
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Row } from 'reactstrap'
import './page.css'

const doubts  = [
    {
        'question': "What is the difference between SSR and CSR?",
        'name': 'Anirudh'
    },
    {
        'question': "How does Reactjs work internally?",
        'name': 'Nikhil'
    },
    {
        'question': "What does JSX mean?",
        'name': 'Suman'
    },
]


const Doubts = () => {
    return(
        <Container className="mt-5">
            <h1 className="mt-4 mb-4 title">Student Doubts</h1>
            <Row>
                {doubts.map((d) => (
                    <Col md='5'>
                        <Card className="mt-3 mb-3 q-card">
                        <CardBody>
                            <CardTitle className="question">{d.question}</CardTitle>
                            <CardText className="user">{d.name}</CardText>
                            <Button color="primary">Answer</Button>
                        </CardBody>
                    </Card> 
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Doubts;