
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

            var downloadLink = guide.download;


            const li = `
            
        
        <li class = 'container'>
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
        guideList.innerHTML = `<div class= 'container'>
        <h3 class = "center #ff9800 orange" style = "  color: white;" >Login To view </h3>
        <p class = 'white-text'>The student-Teacher interface was designed and configured to connect to Database to access Storage feature. The interface consists of feature to access course and download PDFs, PPTs and Word Docs for assignments and study material. 
        </div>`;

    }



}


document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');

    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});

