  
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


function logout(){
  firebase.auth().signOut();
}


function mostrarDatos(uno, dos, tres){
 // console.log(uno);
  //console.log(dos);
  //console.log(tres);
//if(dos == '11'){
  //dos = 'Noviembre';
//}



switch (dos) { 
  case '11': 
    dos = 'Noviembre'
    break;
  case '12': 
    dos = 'Diciembre'
    break;
  case '01': 
    dos = 'Enero'
    break;
  case '02': 
    dos = 'Febrero'
    break;
  case '03': 
    dos = 'Marzo'
    break;
  case '04': 
    dos = 'Abril'
    break;
  case '05': 
    dos = 'Mayo'
    break;
  case '06': 
    dos = 'Junio'
    break;
  case '07': 
    dos = 'Julio'
    break;
  case '08': 
    dos = 'Agosto'
    break;
  case '09': 
    dos = 'Septiembre'
    break;
  case '10': 
    dos = 'Octubre'
    break;
  
  default:
    console.log('hay un error en el mes');
}


  var identifiertable = $('#uid').text();
  var suma = 0;

db.collection(identifiertable).doc(dos + ' ' + tres).collection(""+uno+"").get().then(function(querySnapshot) {
  tabla.innerHTML = '';

    querySnapshot.forEach(function(doc) {

      suma+= parseFloat(doc.data().fmonto);

      var exist = doc.data().fimagen;
      // console.log(exist);

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
   agregarTotal(identifiertable, dos, tres, suma, uno);
    
});



};


function agregarTotal(id, mduno, mddos, total, mmdday){


var param1 = id;
var param2 = mduno.toString() + ' ' + mddos.toString();
var param3 = total;
var param4 = mmdday.toString();





var suma = 0;

var i
for(i=1;i<31;i++){



db.collection(param1).doc(param2 + ' total').collection(""+i+"").get().then(function(querySnapshot) {
  

    querySnapshot.forEach(function(doc) {

      suma+= parseFloat(doc.data().total);
      
 
      
    });

     console.log(suma);
 document.getElementById("ey2").innerHTML = 'Has gastado $' + suma + ' en el mes de ' + mduno;


    
});


}




};