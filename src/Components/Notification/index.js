import React from 'react'
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

const Notification = ({notifications, profile}) => {

    return(
        <div className="mt-4 mb-4">
        <ListGroup className="notifications">
        <ListGroupItem className="notif-heading">
            <ListGroupItemHeading>Notifications</ListGroupItemHeading>
        </ListGroupItem>
        {notifications.map((i) => ( 
        <ListGroupItem key={i.id}>
         <ListGroupItemHeading>{i.title}</ListGroupItemHeading>
         <ListGroupItemText>
            {i.desc}
         </ListGroupItemText>
        </ListGroupItem>
        ))
        }
        {
            profile.userType === "Admin" ? 
            <ListGroupItem>
                <Button color="primary" className="add-notif">Add a Notification</Button>
            </ListGroupItem>
            : 
            undefined
        }
        </ListGroup>  
        </div>
    )
}

export default Notification;