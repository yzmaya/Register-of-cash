
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
 

  var db = firebase.firestore();

var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
         var f=new Date();
         var fecha = (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());

         var MesyAño = (meses[f.getMonth()] + " " + f.getFullYear());
         var dia = (f.getDate());
  

  function guardar(){
  
  var concepto = document.getElementById("concepto").value;
  var monto = document.getElementById("monto").value;
  var imagen = document.getElementById("imagen").value;

  
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

         document.getElementById("demo").innerHTML = "Mis Gastos: " + fecha;

         function agregarConcepto(){
          document.getElementById("tablaGastos").insertRow(-1).innerHTML = '<td><input type=text name=name id='+ '' +'  /></td><td><input type=text name=name id='+ '' +' /></td><td><input type=file class="button primary fit small" name=adjunto accept=.jpg,.png ></td><td></td>';
                  
         }


