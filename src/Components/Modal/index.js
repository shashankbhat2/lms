import React from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap'

const CustomModal = ({modal, toggle, title, children}) => {
    return(
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody> 
                {children}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
}

export default CustomModal;