import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Button, Input, Table } from 'reactstrap';
import { addMarks } from '../../Store/actions/assignmentActions';

const SubmissionsTable = ({assignment, addMarks}) => {
    const [currentAssigment, setCurrentAssignment] = useState(assignment)
    const [marks, setMarks] = useState('')
    const handleMarks = (assignment, submission, marks) => {
        addMarks(assignment, submission, marks)
    }

    return(
        <React.Fragment>
        <Table responsive bordered className="mt-4 mb-4">
        <thead>
            <tr>
                <th>Name</th>
                <th>SRN</th>
                <th>Submission</th>
                <th>Marks</th>
                <th>Add/Edit Marks</th>
            </tr>
        </thead>
        <tbody>
        {currentAssigment && currentAssigment.submissions.map((submission)=> (
            <tr key={submission.srn}>
            <td>
            {submission.name}
            </td>
            <td>{submission.srn}</td>
            <td>
                <Button>
                    <a className="link" href={submission.url}>
                        View
                    </a>
                </Button>
            </td>
            <td>{submission.marks}</td>
            <td>
                <Input id="marks" type="number" max="10" className="mb-2" onChange={(e) => setMarks(e.target.value)}></Input>
                <Button color="success" className="button" onClick={() => handleMarks(currentAssigment, submission, marks)}>
                    Add Marks
                </Button>
            </td>
            </tr>   
        ))}
        </tbody>
        </Table>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return({
        addMarks: (assignment, submission, marks) => {
            dispatch(addMarks(assignment, submission, marks))
        }
    })
}
export default connect(null, mapDispatchToProps)(SubmissionsTable);