import React from 'react'
import { useParams } from 'react-router'
import { Container } from 'reactstrap'
import InfoContainer from '../../../Components/Info/Info'


const Student = () => {
    
    const {student} = useParams();
 
 
    return(
        <Container className="mb-5">
            <h2 className="table-title mt-3 mb-3 p-3">Student Details</h2>
            <InfoContainer name={student}></InfoContainer>
        </Container>
    )
}


export default Student;