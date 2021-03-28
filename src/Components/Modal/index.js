import React from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap'

const CustomModal = ({modal, toggle, title, close, children}) => {
    return(
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody> 
                {children}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    )
}

export default CustomModal;