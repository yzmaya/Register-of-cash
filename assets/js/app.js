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

    //var email_id = user.email;
    //document.getElementById("info").innerHTML = 'Usuario: <strong>' + email_id + '</strong>'; 
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

      
      // Vigilar selección archivo
      fileButton.addEventListener('change', function(e) {
        var rutaaccess = $('#uid').text();
        

        //Obtener archivo
        var file = e.target.files[0];
     

        // Crear un storage ref
var storageRef = firebase.storage().ref();

var agregar = storageRef.child(rutaaccess + '/' + MesyAño + '/' + dia + '/' + file.name);
       

        // Subir archivo
        var task = agregar.put(file);


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

storageRef.child(rutaaccess + '/' + MesyAño + '/' + dia + '/' + file.name).getDownloadURL().then(function(url){
  
  miImagen = url.toString();
  //  console.log(url.toString());


 // i++;
   //displayImage(i, imageRef);
  
});



          }
        )
      });

function habilitar(){
   if($('#checkbox-alpha').prop('checked')) {
        $('#imagenes').show();
    }else{
        $('#imagenes').hide();
    }
};

habilitar();


//esta función guarda los campos junto con la imagen
  function guardar(){

var identifier = $('#uid').text();
   var uploader = document.getElementById('uploader');
      var fileButton = document.getElementById('fileButton');
  
  var concepto = document.getElementById("concepto").value;
  var monto = document.getElementById("monto").value;


if($('#checkbox-alpha').prop('checked')) {
    

if(concepto, monto, uploader.value == ''){
    alert('llena el campo vacio');
  }else{
       db.collection(identifier).doc(MesyAño).collection(""+dia+"").add({
          fconcepto: concepto,
          fmonto: monto,
          fimagen: miImagen
          
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          document.getElementById("concepto").value = '';
          document.getElementById("monto").value = '';
          document.getElementById("uploader").value = '';
          document.getElementById("fileButton").value = '';

          mostrarDatos();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
  }


}else{
  if(concepto, monto  == ''){
    alert('llena el campo vacio');
  }else{
       db.collection(identifier).doc(MesyAño).collection(""+dia+"").add({
          fconcepto: concepto,
          fmonto: monto
          
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          document.getElementById("concepto").value = '';
          document.getElementById("monto").value = '';
         

          mostrarDatos();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
  };



}

  }



//se pinta la fecha actual en el DOM
document.getElementById("demo").innerHTML = "Registra tus gastos al : " + fecha;


function logout(){
  firebase.auth().signOut();
}


function mostrarDatos(){

  var identifiertable = $('#uid').text();
  var suma = 0;

db.collection(identifiertable).doc(MesyAño).collection(""+dia+"").get().then(function(querySnapshot) {
  tabla.innerHTML = '';

    querySnapshot.forEach(function(doc) {

      suma+= parseFloat(doc.data().fmonto);
    //  console.log(suma);
      
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

        // doc.data() is never undefined for query doc snapshots
      //  console.log(doc.id, " => ", doc.data().concepto);
      
    });

    tabla.innerHTML += `<tr><td><strong>Total</strong></td><td colspan="2"><span id="ey"></span></td></tr>` 
   document.getElementById("ey").innerHTML = suma;



db.collection(identifiertable).doc(MesyAño + ' total').collection(""+dia+"").doc('total').set({

    total: suma
})

   //agregarTotal(identifiertable, MesyAño, dia, suma);
    
});



};


