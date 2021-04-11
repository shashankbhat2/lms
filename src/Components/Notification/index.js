import React, { useState } from 'react'
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import AddNotificationForm from '../Forms/AddNotificationForm';
import CustomModal from '../Modal/index'

const Notification = ({notifications, profile}) => { 
   
    const [formOpen, setFormOpen] = useState(false);
    
    const formToggle = () => setFormOpen(!formOpen);

    return(
        <div className="mt-4 mb-4">
        <ListGroup className="notifications">
        <ListGroupItem className="notif-heading">
            <ListGroupItemHeading>Notifications</ListGroupItemHeading>
        </ListGroupItem>
        {notifications ? notifications.map((i) => ( 
        <ListGroupItem key={i.id}>
         <ListGroupItemHeading>{i.title}</ListGroupItemHeading>
         <ListGroupItemText>
            {i.desc}
         </ListGroupItemText>
        </ListGroupItem>
        ))
        : <p className="m-auto">Loading Notifications</p>}
        {
            profile.userType === "Admin" ? 
            <ListGroupItem>
                <Button color="primary" className="add-notif" onClick={formToggle}>Add a Notification</Button>
            </ListGroupItem>
            : 
            undefined
        }
        <CustomModal title="Add New Notification" modal={formOpen} toggle={formToggle}>
            <AddNotificationForm></AddNotificationForm>
        </CustomModal>
        </ListGroup>  
        </div>
    )
}

export default Notification;