export const addQuestion = (newQuestion) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();

        firestore
            .add({collection: 'studentquestions'},
                {
                    question: newQuestion.question,
                    user: newQuestion.user,
                    topic: newQuestion.topic,
                    answers: []
                })
                .then((dispatch)=>{
                    dispatch({type:'CREATE_COURSE'});
                }).catch((err)=>{
                    dispatch({type:'CREATE_COURSE_ERROR'});
                });   
            
    }
}

export const removeQuestion = (question) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection('studentquestions')
            .doc(question.id)
            .delete()
            .then(() => {
                console.log("Deleted Question")
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


export const addComment = (question, comment, user) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        firestore
            .collection('studentquestions')
            .doc(question.id)
            .update({
                answers: firebase.firestore.FieldValue.arrayUnion({
                    user: user,
                    comment:comment 
                })
            })
            .catch((err)=> {
                console.log(err)
            })
    }
}


export const removeComment = (question, comment, user) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        firestore
            .collection('studentquestions')
            .doc(question.id)
            .update({
                answers: firebase.firestore.FieldValue.arrayRemove({
                    user: user,
                    comment:comment 
                })
            })
            .catch((err)=> {
                console.log(err)
            })
    }
}