

// 1. Initialize Firebase
 var config = {
    apiKey: "AIzaSyAnRg83sy85_HDLB-bqAE0Zf5XEm-yIfj8",
    authDomain: "trains-9c35a.firebaseapp.com",
    databaseURL: "https://trains-9c35a.firebaseio.com",
    projectId: "trains-9c35a",
    storageBucket: "trains-9c35a.appspot.com",
    messagingSenderId: "77904711579"
  };
  
  firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

// 2. Button for adding train
$("#addTrainBtn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
    var trainName = $("#trainInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstTrainInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

  // Creates local "temporary" object for holding train data

  //subtracts the first train time back a year to ensure it's before current time.
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    // the time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");
    
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    var min = childSnapshot.val().min;
    var next = childSnapshot.val().next;

    

  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>"  + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

















