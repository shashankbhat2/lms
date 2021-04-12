import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import {connect} from 'react-redux'
import { compose } from 'redux'
import {Table} from 'reactstrap'

const AdminTable = ({admins}) => {

    return(
        <React.Fragment>
        <Table responsive bordered className="mt-4 mb-4">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
        {admins && admins.map((admin, i)=> (
            <tr key={i}>
            <td>
            {admin.name}
            </td>
            <td>{admin.email}</td>
            <td>{admin.phone}</td>
            </tr>   
        ))}
        </tbody>
        </Table>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    console.log(state)
    return{
        admins: state.firestore.ordered.users || [],
    }   
}


export default compose(connect(mapStateToProps), firestoreConnect( 
    [ 
    {
      collection: 'users',
      where: [['userType', '==', 'Admin']],
    },
]))(AdminTable);