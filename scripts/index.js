
const guideList = document.querySelector('.guides');

const LogInLinks = document.querySelectorAll('.logged-in');

const LogOutLinks = document.querySelectorAll('.logged-out');


const accountDetails = document.querySelector('.account-details');

const adminItems = document.querySelectorAll('.admin');


//set up UI When log in and log out
const setUpUI = (user) => {

    if (user) {
        if (user.admin) {
            adminItems.forEach(items => items.style.display = 'block ');

        }
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
        <div>Logged in as ${user.email}  </div>
        <div>${doc.data().bio}</div>
        <div class  ="pink-text">${user.admin ? 'Admin' : ''}</div>
  
        `;

            accountDetails.innerHTML = html;


        });


        //user info




        LogOutLinks.forEach(items => items.style.display = 'none');

        LogInLinks.forEach(items => items.style.display = 'block ');



    }
    else {
        adminItems.forEach(items => items.style.display = 'none ');
        LogOutLinks.forEach(items => items.style.display = 'block');

        LogInLinks.forEach(items => items.style.display = 'none');
        accountDetails.innerHTML = '';

    }
}


//set up guide
const setUpGuides = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            console.log(guide);
            var downloadLink = guide.download;
            console.log(downloadLink);
            console.log(typeof (downloadLink));




            //   <a href="https://firebasestorage.googleapis.com/v0/b/daproject-e907d.appspot.com/o/da%2Fu1_DA.pptx?alt=media&token=762d1255-7ceb-45a8-862a-34ba32f58c30>Download file</a>
            // https://firebasestorage.googleapis.com/v0/b/daproject-e907d.appspot.com/o/hpc%2Fhill%20cipher.pdf?alt=media&token=de821c4a-8367-45fd-8779-a7ac443e7a58
            const li = `
        
        <li>
         <div class="collapsible-header grey lighten-4">${guide.title}</div>
         <div class="collapsible-body white">${guide.content}</div>
         <div class="collapsible-body white" >
        
         <a href = ${guide.download}>download</a>
          

         </div>
        </li>
        `;
            html += li;

        });
        guideList.innerHTML = html;
    }
    else {
        guideList.innerHTML = `<h5 class = "center-allign" style = "  color: white;" >Login To view File List Uploaded</h5>`;

    }



}


document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');

    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});

