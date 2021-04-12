const functions = require("firebase-functions");
const admin =  require('firebase-admin');
admin.initializeApp(functions.config().firebase)

const createNotification = ((notification) => {
    return admin.firestore().collection('notifications')
      .add(notification)
      .then(doc => console.log('notification added', doc));
  });
  

exports.newNotificationAdded = functions
    .firestore
    .document('adminnotifications/{adminnotificationId}')
    .onCreate(
    doc =>{
        const newNotification = doc.data();
        return createNotification(newNotification) 
    }
)


exports.addAdminRole = functions.https.onCall((data, context) => {
    // check request is made by an admin
    if ( context.auth.token.admin !== true ) {
      return { error: 'Only admins can add other admins' }
    }
    // get user and add admin custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      })
    }).then(() => {
      return {
        message: `Success! ${data.email} has been made an admin.`
      }
    }).catch(err => {
      return err;
    });
  });
  