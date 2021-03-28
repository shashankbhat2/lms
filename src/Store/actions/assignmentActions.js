import { storage } from "../../config/fbConfig";

export const addNewAssignment = (assignment) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        console.log(assignment)

        firestore
            .add({collection: 'assignments'},
                {
                    question: assignment.question,
                    branch: assignment.branch,
                    teacher: assignment.teacher,
                    course: assignment.course, 
                    questionUrl: assignment.url,
                    submissions: []
                }).catch((err)=> {
                console.log(err)
            })
    }
}


export const removeAssignment = (assignment) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection('assignments')
            .doc(assignment.id)
            .delete()
            .then(() => {
                dispatch({
                    type: 'REMOVED_ASSIGNMENT'
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'REMOVE_ASSIGNMENT_ERR',
                    err
                })
            })
    }
}


export const addMarks = (assignment, submission, marks) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        console.log(assignment, submission, marks)


        firestore
            .collection('assignments')
            .doc(assignment.id)
            .set(  
            { submissions: [{name: submission.name, url: submission.url, marks: marks, srn: submission.srn}] },
            { merge: true }          
            )
            .then(() => {
                dispatch({
                    type: 'REMOVED_ASSIGNMENT'
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'REMOVE_ASSIGNMENT_ERR',
                    err
                })
            })
    }
} 
