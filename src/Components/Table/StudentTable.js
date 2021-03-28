import React, { useEffect, useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import {connect} from 'react-redux'
import { compose } from 'redux'
import {Button, Form, Input, Table} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import {setStudentSuspended} from '../../Store/actions/studentActions'







const StudentTable = ({students, sortedByBranch, branch, setStudentSuspended}) => {
    const branchWise = branch === 'All' ? students : sortedByBranch; 
    let studentData = branchWise;


    const handleSuspend = (student) => {
        setStudentSuspended(student)
    }

    return(
        <React.Fragment>
        <Table responsive bordered className="mt-4 mb-4">
        <thead>
            <tr>
                <th>Name</th>
                <th>Branch</th>
                <th>SRN</th>
                <th>Semester</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Suspend Student</th>
            </tr>
        </thead>
        <tbody>
        {studentData && studentData.map((student)=> (
            <tr key={student.SRN}>
            <td>
                <NavLink to={`/students/${student.name}`}>
                    {student.name}
                </NavLink></td>
            <td>{student.Branch}</td>
            <td>{student.SRN}</td>
            <td>{student.semester}</td>
            <td>{student.email}</td>
            <td>{student.phone}</td>
            <td>
            <Button outline color='danger' className="suspend-button" onClick={() => handleSuspend(student)}>{student.suspended ? 'Unsuspend':'Suspend'}</Button>
            </td>
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
        students: state.firestore.ordered.users || [],
        sortedByBranch: state.firestore.ordered.sortedByBranch || [],
    }   
}

const mapDispatchToProps = (dispatch) => {
    return({
        setStudentSuspended: (student) => {
            dispatch(setStudentSuspended(student))
        }
    })
}





export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect((props) => 
    [ 
    {
      collection: 'users',
      where: [['userType', '==', 'Student']],
    },
    {
        collection: 'users',
        where: [['userType', '==', 'Student'], ['Branch','==',`${props.branch}`]],
        storeAs: 'sortedByBranch'
    },
]))(StudentTable);