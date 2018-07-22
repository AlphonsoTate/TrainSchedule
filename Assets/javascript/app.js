
 var config = {
    apiKey: "AIzaSyDRXYUX5qQXHQceSsXlXOfAwE0vxOTvuDs",
    authDomain: "train-schedule-8662a.firebaseapp.com",
    databaseURL: "https://train-schedule-8662a.firebaseio.com",
    projectId: "train-schedule-8662a",
    storageBucket: "",
    messagingSenderId: "1063525773968"
  };
  firebase.initializeApp(config);
   
 
 
    $(document).ready(function(){   
        
        
        
    var database = firebase.database(); 

   var tnameInput;
    var destInput ;
    var firstInput; 
    var frequencyInput;
    var trainTimeInput;


    $(".submit").on("click", function(event) {
        event.preventDefault();

        tnameInput = $(".tName").val().trim();
        destInput =  $(".Destination").val().trim();
        firstInput = $(".firstT").val().trim();
        frequencyInput = $(".frequency").val().trim();
        trainTimeInput = moment($(".arrival").val().trim(), "HH:mm").subtract(10, "years").format("X");
        console.log( tnameInput);
    
          // Set the variables for highBidder/highPrice equal to the stored values.
          

        database.ref().push({
            train: tnameInput,
            destination: destInput,
            firstTrain: firstInput,
            frequency: frequencyInput,
            nextarrival: trainTimeInput,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });

          $(".tName").val("");
		  $(".Destination").val("");
		 $(".firstT").val("");
		 $(".frequency").val("");
          $(".arrival").val("");

          return false;

        });

          database.ref().on("child_added", function(childSnapshot) {

            var databasetrain = childSnapshot.val().train;
            var databasefirstTrain = childSnapshot.val().firstTrain;
            var databasedestination = childSnapshot.val().destinantion;
            var databaseTrainTimeInput = childSnapshot.val().nextarrival;
            var databaseFrequency = childSnapshot.val().frequency;
            
            var diffTime = moment().diff(moment.unix(databaseTrainTimeInput), "minutes");
            var timeRemainder = moment().diff(moment.unix(databaseTrainTimeInput), "minutes") % databaseFrequency ;
            var minutes = databaseFrequency - timeRemainder;
    
             var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 



        
            console.log(childSnapshot.val().train);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().firstTrain);
            console.log(childSnapshot.val().frequency);
            
            

           },  function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
    
        
      
        // If Firebase does not have highPrice and highBidder values stored, they remain the same as the
        // values we set when we initialized the variables.
        // In either case, we want to log the values to console and display them on the page.
        console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
         console.log(moment().format("X"));



    // Output all of the new information into the relevant HTML sections
  
    $(".tabl > tbody" ).append( "<tr><td>" + databasetrain + "</td><td>" + databasefirstTrain + "</td><td>"+ databasedestination + "</td><td>" + databaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
    
        });