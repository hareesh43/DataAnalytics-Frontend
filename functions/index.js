const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
exports.addAdminRole = functions.https.onCall((data, context) => {
    //check weather user is admin or not
    if (context.auth.token.admin != true) {
        return { err: "only admin can make others as admin suker" }

    }

    //get user add admin cusom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });

    }).then(() => {
        return {
            message: `user ${data.email} is now admin`
        }

    }).catch(err => {
        return err;

    });

});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
