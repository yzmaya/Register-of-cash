
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
  
  

  var tabla = document.getElementById('tabla');
  var tabla2 = document.getElementById('tabla2');


console.log('epale');


  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
         var f=new Date();
         var fecha = (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());

         var MesyAño = (meses[f.getMonth()] + " " + f.getFullYear());
         var dia = (f.getDate());

  var storage = firebase.storage();

var storageRef = storage.ref();

$('#List').find('tbody').html('');
var i = 0;

var i = 0;



storageRef.child('mis_fotos/').listAll().then(function(result){
  
  result.items.forEach(function(imageRef){
   // console.log('imagen de referncia' + imageRef.toString());

   i++;
   displayImage(i, imageRef);
  });
});


function displayImage(row, images){
  images.getDownloadURL().then(function(url){
    console.log(url);
     // var img = document.getElementById('myimg');
      //img.src = url;

      let new_html = '';
      new_html +='<tr>';
      new_html +='<td>';
      new_html += row;
      new_html += '</td>';
      new_html +='<td>';
      new_html += '<a href="'+ url +'" target="_blank">Descargar</a>';
      new_html += '</td>';
      new_html +='</tr>';
    $('#List').find('tbody').append(new_html);
  });
}



 

  
db.collection("NestorYzmaya").doc(MesyAño).collection(""+dia+"").get().then(function(querySnapshot) {
  tabla.innerHTML = '';

    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
      //  console.log(doc.id, " => ", doc.data().concepto);
       tabla.innerHTML += `
                  <tr>
                    <td>${doc.data().fconcepto}</td>
                    <td>${doc.data().fmonto}</td>
                    <td>${doc.data().fimagen}</td>
                  </tr>
       `
    });
});



