export const addNewNotification = (notification) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();

        const date = new Date();

        firestore
            .add({collection: 'adminnotifications'},
                {
                    title: notification.title,
                    desc: notification.desc
                })
                .then((dispatch)=>{
                    console.log('succ')
                }).catch((err)=>{
                    console.log(err)
                });   
            
    }
}
