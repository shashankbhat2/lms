export const updateTeacherDisplayPic = (teacher, url) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        firestore
            .collection('users')
            .doc(teacher.id)
            .update({
                img: url
            })
            .catch((err)=> {
                console.log(err)
            })
    }
}



export const updateTeacherInfo = (teacher) => {
    return(dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
                
        firestore
            .collection('users')
            .doc(teacher.id)
            .set({
                father: teacher.father || '',
                mother: teacher.mother  || '',
                dob: teacher.dob || '',
                email: teacher.email || '',
                sslc: teacher.sslc || '',
                puc: teacher.puc || '',
                rank: teacher.rank || '',
                Branch: teacher.branch || '',
                bachelor: teacher.bachelors || '',
                master: teacher.master || '',     
                semester: teacher.semester || '',
                address: teacher.address || ''
            },
            {merge: true}
            )
            .catch((err) => {
                console.log(err)
            })
    }
}