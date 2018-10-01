
 var isNameEntered = false;

 src="https://www.gstatic.com/firebasejs/5.5.2/firebase.js"

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAmsoX6fZhVi5RjNT1SHxc6Bx5ZNRcgzVc",
    authDomain: "train-schedular-8ca4c.firebaseapp.com",
    databaseURL: "https://train-schedular-8ca4c.firebaseio.com",
    projectId: "train-schedular-8ca4c",
    storageBucket: "train-schedular-8ca4c.appspot.com",
    messagingSenderId: "335765373401"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();
   // Initial Values
   var trainName = "";
   var destination  = "";
   var frequency = "";
   var nextArrival ="";
   
   var minutes_start="" ;
   var time_converted="";
var  minutes_difference=""
   
   // Capture Button Click
   $("#add-train-info").on("click", function(event) {
    event.preventDefault();
   
 // gets train info
    trainName=$("#trainName").val().trim();  
    destination=$("#destination").val().trim();
    frequency=$("#frequency").val().trim();
    
     minutes_start = $("#first-train-time").val().trim();
     time_converted = moment(minutes_start,"HH:mm").format("HH:mm")
       console.log(minutes_start);
       console.log(time_converted);

       minutes_difference = moment().diff(moment(time_converted,"HH:mm"),"minutes");
       console.log(minutes_difference)
       var time_remaining = frequency-(minutes_difference%frequency);
       console.log(time_remaining);
        var current_time = moment().format("hh:mm")
       var nextArrival= moment().add(time_remaining,"minutes")
       console.log(current_time)
       console.log(moment(nextArrival).format("hh:mm:A"))


   if(trainName !==""){

   // object to hold train data
   var newTrainInfo= {

        nameOfTrain: trainName,
       nameOfDestination: destination,
       nameOfFrequency:  frequency,
       time_remaining,
       dateAdded:  firebase.database.ServerValue.TIMESTAMP
      };     

// push the data into database
dataRef.ref().push(newTrainInfo);

 }else{ dataRef.ref().push(newTrainInfo);
     alert("enter the train name")} 

// clears all the textboxes
$("#trainName").val("")
 $("#destination").val("")
 $("#frequency").val("")
 $("#first-train-time").val("")

 
 });


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
dataRef.ref().on("child_added", function(childSnapshot) {
 console.log(childSnapshot.val());

 //train info

 var trainName = childSnapshot.val().nameOfTrain;
 var trainDestination = childSnapshot.val().nameOfDestination;
 var trainFrequency = childSnapshot.val().nameOfFrequency;
 var timeRemaining = childSnapshot.val().time_remaining;
// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(""),
    $("<td>").text(timeRemaining),
  );
// Append the new row to the table
$("#train-info-display > tbody").append(newRow),


function(errorObject) {
    console.log("The read failed: " + errorObject.code);
} 


});

 
