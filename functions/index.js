const functions = require("firebase-functions");
const admin =  require('firebase-admin');
const cors = require('cors')({origin: true})
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


exports.addAdmin = functions.https.onRequest(async (req, res) => {
  cors(req, res, async() => {
      try {
        const newAdmin = {
            email: req.body.email,
            password: req.body.password,
        }

        const adminRecord = await admin
            .auth()
            .createUser(newAdmin);

        const userId = adminRecord.uid;

        await admin.firestore().collection("users").doc(userId).set({
          email: req.body.email,
          name: req.body.name,
          userType: 'Admin',
          password: req.body.password,
          phone: req.body.phone,
        });
  
        return { result: 'The new admin has been successfully created.' };
    } catch (error) {
      console.log(error)
    }
  })
})