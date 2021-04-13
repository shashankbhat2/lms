import React from 'react'
import { useParams } from 'react-router'
import { Container } from 'reactstrap'
import TeacherInfo from '../../../Components/Info/TeacherInfo';


const Teacher = () => {
    
    const {teacher} = useParams();
 
 
    return(
        <Container className="mb-5">
            <h2 className="table-title mt-3 mb-3 p-3">Teacher Details</h2>
            <TeacherInfo name={teacher}></TeacherInfo>
        </Container>
    )
}


export default Teacher;