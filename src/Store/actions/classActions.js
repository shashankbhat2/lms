export const addClass = (newClass) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();

        firestore
            .add({collection: 'classes'},
                {
                    course: newClass.course,
                    branch: newClass.branch,
                    teacher: newClass.teacher,
                    link: newClass.link,
                    time: newClass.time
                })
                .then((dispatch)=>{
                    dispatch({type:'CREATE_CLASS'});
                }).catch((err)=>{
                    dispatch({type:'CREATE_CLASS_ERROR'});
                });   
            
    }
}

export const removeClass = (selectedClass) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection('classes')
            .doc(selectedClass.id)
            .delete()
            .then(() => {
                dispatch({
                    type: 'CLASS_REMOVED'
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'CLASS_REMOVE_ERR',
                    err
                })
            })
    }
}