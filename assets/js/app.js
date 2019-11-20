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


    // User is signed in.

    var user = firebase.auth().currentUser;
    console.log('usuario autentificado');
   

    if(user != null){

    }

  } else {
    // No user is signed in.

    console.log('usuario no logueado')

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
      var resultado 

      // Vigilar selección archivo
      fileButton.addEventListener('change', function(e) {
        //Obtener archivo
        var file = e.target.files[0];
     

        // Crear un storage ref
        var storageRef = firebase.storage().ref('mis_fotos/' + file.name);
        resultado =  file.name

        // Subir archivo
        var task = storageRef.put(file);

        // Actualizar barra progreso
        task.on('state_changed',

          function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
          },

          function error(err) {
            alert(err);

          },

          function complete() {
            console.log("archivo enviado");


          }
        )
      });
  

//esta función guarda los campos junto con la imagen
  function guardar(){

console.log(resultado);
   var uploader = document.getElementById('uploader');
      var fileButton = document.getElementById('fileButton');
  
  var concepto = document.getElementById("concepto").value;
  var monto = document.getElementById("monto").value;
  

 // var imagen = document.getElementById("imagen").value;

  
     db.collection("NestorYzmaya").doc(MesyAño).collection(""+dia+"").add({
          fconcepto: concepto,
          fmonto: monto
        
          
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          document.getElementById("concepto").value = '';
          document.getElementById("monto").value = '';
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

  }



//se pinta la fecha actual en el DOM
document.getElementById("demo").innerHTML = "Mis Gastos: " + fecha;

//Esta función agrega las filas con las que se obtienen los demas objetos
         function agregarConcepto(){

            res = document.getElementById("contador1");
             res.value = parseInt(res.value);
     
          document.getElementById("tablaGastos").insertRow(-1).innerHTML = '<td><input type=text name=name id='+ '' +'  /></td><td><input type=text name=name id='+ '' +' /></td><td><input type=file class="button primary fit small" name=adjunto accept=.jpg,.png ></td><td></td>';
          res.value++;
          console.log(res);
         }



