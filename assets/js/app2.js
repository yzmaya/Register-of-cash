  
 // Initialize Firebase
   // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC7kBXyd1LcKq4JJiW-3JlhcBOJPtNucHM",
    authDomain: "reco-2cabc.firebaseapp.com",
    databaseURL: "https://reco-2cabc.firebaseio.com",
    projectId: "reco-2cabc",
    storageBucket: "reco-2cabc.appspot.com",
    messagingSenderId: "775658028653",
    appId: "1:775658028653:web:05fbc136e9d85bb9350964",
    measurementId: "G-Q71KJZLVWE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
 

    if(user != null){

    var email_id = user.email;
     document.getElementById("info").innerHTML = 'Usuario: <strong>' + email_id + '</strong>'; 
     var uid = user.uid;
    document.getElementById("uid").innerHTML = uid;
    mostrarDatos();
    
    // document.getElementById("uid").innerHTML = uid; 

    }

  } else {
    // No user is signed in.

    console.log('usuario no logueado')
    window.location.href = 'index.html';

  }
});




  var db = firebase.firestore();
//obteniendo año mes y dia actual
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
         var f=new Date();
         var fecha = (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());

         var MesyAño = (meses[f.getMonth()] + " " + f.getFullYear());
         var dia = (f.getDate());

//este script sube la información de la imagen al servidor
 // Obtener Elementos
      var uploader = document.getElementById('uploader');
      var fileButton = document.getElementById('fileButton');

      var contador = document.getElementById('contador');
 
      


var miImagen

      
     



//esta función guarda los campos junto con la image



//se pinta la fecha actual en el DOM
document.getElementById("demo").innerHTML = "Mis Gastos: " + fecha;


function logout(){
  firebase.auth().signOut();
}


function mostrarDatos(){

  var identifiertable = $('#uid').text();
  var suma = 0;

db.collection(identifiertable).doc(MesyAño).collection(""+dia+"").get().then(function(querySnapshot) {
  tabla.innerHTML = '';

    querySnapshot.forEach(function(doc) {

      suma+= parseInt(doc.data().fmonto);
      console.log(suma);

      var exist = doc.data().fimagen;
       console.log(exist);

      if(exist === undefined){

           tabla.innerHTML += `
                  <tr>
                    <td>${doc.data().fconcepto}</td>
                    <td>${doc.data().fmonto}</td>
                    <td></td>
                  </tr>
       ` 

      }else{

          tabla.innerHTML += `
                  <tr>
                    <td>${doc.data().fconcepto}</td>
                    <td>${doc.data().fmonto}</td>
                    <td><a href=${doc.data().fimagen} target="_blank">Descargar</a></td>
                  </tr>
       ` 

      };

    });

    tabla.innerHTML += `<tr><td><strong>Total</strong></td><td><span id="ey">esperando</span></td></tr>` 
   document.getElementById("ey").innerHTML = suma;
    
});



};
