import React from 'react'
import { Container, Button,Row, Col} from 'reactstrap'
import AdminTable from '../../../Components/Table/AdminTable'

const Admins = () => {
    return(
        <Container className="mt-4 mb-4">
        <h1 className="table-title">Admins</h1>
        <Row>
            <Row md='12'>
                <Col>
                    <Button color='primary' className="mt-auto ml-3 w-auto">Add Admin</Button>
                </Col>
            </Row>
        </Row>
        <AdminTable></AdminTable>
    </Container>   
    )
}


export default Admins