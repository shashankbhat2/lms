export const setStudentSuspended = (student) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
  
        firestore
            .collection('users')
            .doc(student.id)
            .set({
                ...student,
                suspended: !student.suspended
            }
            )
            .then(() => {
                dispatch({
                    type: 'SUSPEND_STUDENT_SUCESSS',
                    suspend: 'Student Suspended Successfully',
                });
            })
            .catch((err)=> {
                dispatch({
                    type: 'SUSPEND_ERROR',
                    err,
                }) 
            })
    }
}


export const updateStudentDisplayPic = (student, url) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        firestore
            .collection('users')
            .doc(student.id)
            .update({
                img: url
            })
            .then(() => {
                dispatch({
                    type: 'IMAGE_UPLOADED',
                    success: 'Image Uploaded SuccessFully',
                });
            })
            .catch((err)=> {
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
            })
    }
}


export const updateStudentInfo = (student) => {
    return(dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        
        console.log(student)
        
        firestore
            .collection('users')
            .doc(student.id)
            .set({
                father: student.father || '',
                mother: student.mother  || '',
                dob: student.dob || '',
                email: student.email || '',
                sslc: student.sslc || '',
                puc: student.puc || '',
                rank: student.rank || '',
                Branch: student.branch || '',
                semester: student.semester || '',
                address: student.address || ''
            },
            {merge: true}
            )
            .then(() => {
                dispatch({
                    type: 'STUDENT_UPDATED',
                    success: 'Student Info Updated'
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'STUDENT_UPDATE_FAILED',
                    error: err
                })
            })
    }
}