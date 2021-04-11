import React from 'react'
import { Card, Button, CardTitle, CardText } from 'reactstrap'

const ClassCard = ({teacherClass, handleClassRemove}) => {
    return(
        <Card className="class-card mt-2 mb-2"> 
        <CardTitle className="class-course">Subject: {teacherClass.course}</CardTitle>
        <CardText className="class-time">Time: {teacherClass.time}</CardText>
            <Button className="class-btn mb-3">
                <a href={teacherClass.link} className="class-link">
                    Go to Class
                </a>
            </Button>
            <Button color="danger" onClick={() => handleClassRemove(teacherClass)}>
                    Remove
            </Button>
        </Card> 
    )
}

export default ClassCard;