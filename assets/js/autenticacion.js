firebase.auth().onAuthStateChanged(function(user) {
  if (user) {


    // User is signed in.

    var user = firebase.auth().currentUser;
    console.log('usuario autentificado');
    window.location.href = 'home.html';

    if(user != null){

    }

  } else {
    // No user is signed in.

    console.log('usuario no logueado')

  }
});

function login(){

  var userEmail = document.getElementById('campo_email').value;
  var userPwd = document.getElementById('campo_pwd').value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPwd).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function cuentaNueva(){

  var newEmail = document.getElementById('nuevo_email').value;
  var newPwd = document.getElementById('nuevo_pwd').value;

  firebase.auth().createUserWithEmailAndPassword(newEmail, newPwd).catch(function(error) {
  // Handle Errors here.


  var errorCode = error.code;
  var errorMessage = error.message;
  // ...

  window.alert(errorMessage);
});
}


function restablecePwd(){
  var auth = firebase.auth();
  
var correo = document.getElementById('restablece_email').value;

auth.sendPasswordResetEmail(correo).then(function() {
  $('#mensajito').show();
  // Email sent.
}).catch(function(error) {
  // An error happened.
  window.alert(error);
});

}



// Añadir un listener en tiempo real
 //  firebase.auth().onAuthStateChanged( firebaseUser => {
//Si existe autenticación hacer.....
   // if(firebaseUser) {
     //    window.location.href = "form.html";
    //} else {
      //console.log('no logueado');

    //}    
  //});




