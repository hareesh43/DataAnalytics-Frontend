
//add admin 
const adminform = document.querySelector('.admin-actions');
adminform.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).then(result => {
        console.log(result);

    });


});



//sign up state change
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            //set up UI When log in and log out
            setUpUI(user);

        });


        //database firestone

        db.collection('guides').onSnapshot(snapshot => {
            setUpGuides(snapshot.docs);

        }, err => {
            console.log(err.message);
        });

    }
    else {
        setUpUI(user);
        console.log('user logout:', user);
        setUpGuides([]);

    }

});
//upload new guide instance 

const createForm = document.querySelector('#create-form');
var downloadURLForIndexjs;


createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const file = document.querySelector('#file_upload').files[0];

    // const file = e.target.files[0];
    const uploadTask = storageRef.child(createForm['title'].value + '/' + file.name).put(file);

    // console.log('file uploaded');


    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {

        switch (error.code) {
            case 'storage/unauthorized':
                //console.log("User doesn't have permission to access the object");

                // User doesn't have permission to access the object
                break;

            case 'storage/canceled':
                //console.log("User canceled the upload");

                // User canceled the upload
                break;



            case 'storage/unknown':
                // console.log(" Unknown error occurred, inspect error.serverResponse");
                // Unknown error occurred, inspect error.serverResponse
                break;
        }
        // Handle unsuccessful uploads
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            // console.log('File available at', downloadURL);
            downloadURLForIndexjs = downloadURL;



            // db.collection('guides').add(
            //     {
            //         title: createForm['title'].value,
            //         content: createForm['content'].value,
            //         download: downloadURL

            //     }).then(() => {


            //         const modals = document.querySelector('#modal-create');

            //         M.Modal.getInstance(modals).close();
            //         createForm.reset();

            //     }).catch((err) => {
            //         console.log(err.message);

            //     })

        });
    });


    // console.log("listing uploaded documents in the firebase")
    // // Create a reference under which you want to list
    // var listRef = storageRef.child(createForm['title'].value + '/' + file.name);

    // // Find all the prefixes and items.
    // listRef.listAll().then(function (res) {
    //     res.prefixes.forEach(function (folderRef) {
    //         console.log(folderRef);

    //         console.log("hello");


    //         // All the prefixes under listRef.
    //         // You may call listAll() recursively on them.
    //     });
    //     res.items.forEach(function (itemRef) {
    //         console.log(itemRef);
    //         console.log("hello hii");

    //         // All the items under listRef.
    //     });
    // }).catch(function (error) {
    //     console.log(error);

    //     // Uh-oh, an error occurred!
    // });







    db.collection('guides').add(
        {
            title: createForm['title'].value,
            content: createForm['content'].value,
            download: downloadURLForIndexjs

        }).then(() => {
            // console.log('uploded to the database');



            const modals = document.querySelector('#modal-create');

            M.Modal.getInstance(modals).close();
            createForm.reset();

        }).catch((err) => {
            console.log(err.message);

        })


});



//sign up


const signup = document.querySelector('#signup-form');

signup.addEventListener('submit', (e) => {
    e.preventDefault();


    //user info

    var email = signup['signup-email'].value;
    var pass = signup['signup-password'].value;




    //sign up user
    auth.createUserWithEmailAndPassword(email, pass).then(cred => {
        return db.collection('users').doc(cred.user.uid).set(
            {
                bio: signup['bio'].value

            });


        // console.log(cred.user);
    }).then(() => {
        const modals = document.querySelector('#modal-signup');



        M.Modal.getInstance(modals).close();
        signup.reset();
        signup.querySelector('.error').innerHTML = '';

        // console.log("seccessfully signup");
    }).catch((err) => {
        signup.querySelector('.error').innerHTML = err.message;

    });

});


//logout 


const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();

});


//login 

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // console.log(cred.user);


        const modals = document.querySelector('#modal-login');

        M.Modal.getInstance(modals).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
        // console.log("seccessfully login");



    }).catch((err) => {
        loginForm.querySelector('.error').innerHTML = err.message;

    });
    ;

});

