import React, {useState} from 'react'
import { Container, Button,Row, Col} from 'reactstrap'
import AddAdminForm from '../../../Components/Forms/AddAdminForm'
import CustomModal from '../../../Components/Modal'
import AdminTable from '../../../Components/Table/AdminTable'

const Admins = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);

    return(
        <Container className="mt-4 mb-4">
        <h1 className="table-title">Admins</h1>
        <Row>
            <Row md='12'>
                <Col>
                    <Button color='primary' className="mt-auto ml-3 w-auto" onClick={toggle}>Add Admin</Button>
                </Col>
            </Row>
        </Row>
        <AdminTable></AdminTable>
        <CustomModal title="Add New Admin" modal={isOpen} toggle={toggle}>
            <AddAdminForm></AddAdminForm>
        </CustomModal>
    </Container>   
    )
}


export default Admins