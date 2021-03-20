export const setStudentSuspended = (student) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
  
        firestore
            .collection('users')
            .doc(student.id)
            .set({
                ...student,
                suspended: !student.suspended
            })
            .then(() => {
                dispatch({
                    type: 'STUDENT_SUSPENDED',
                    student,
                });
            })
            .catch((err)=> {
                dispatch({
                    type: 'SUSPEND ERROR',
                    err,
                }) 
            })
    }
}

