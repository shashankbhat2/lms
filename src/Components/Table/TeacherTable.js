import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import {connect} from 'react-redux'
import { compose } from 'redux'
import {Table} from 'reactstrap'
import { NavLink } from 'react-router-dom'


const TeacherTable = ({teachers, sortedByBranch, branch}) => {

    const branchWise = branch === 'All' ? teachers : sortedByBranch; 
    let teacherData = branchWise;

    return(
        <React.Fragment>
        <Table responsive bordered className="mt-4 mb-4">
        <thead>
            <tr>
                <th>Name</th>
                <th>SRN</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
        {teacherData && teacherData.map((teacher)=> (
            <tr key={teacher.SRN}>
            <td>
                <NavLink to={`/teachers/${teacher.name}`}>
                    {teacher.name}
                </NavLink>
            </td>
            <td>{teacher.Branch}</td>
            <td>{teacher.SRN}</td>
            <td>{teacher.semester}</td>
            <td>{teacher.email}</td>
            <td>{teacher.phone}</td>
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
        teachers: state.firestore.ordered.users || [],
        sortedByBranch: state.firestore.ordered.sortedByBranch || [],
    }   
}


export default compose(connect(mapStateToProps), firestoreConnect((props) => 
    [ 
    {
      collection: 'users',
      where: [['userType', '==', 'Teacher']],
    },
    {
        collection: 'users',
        where: [['userType', '==', 'Teacher'], ['Branch','==',`${props.branch}`]],
        storeAs: 'sortedByBranch'
    },
]))(TeacherTable);