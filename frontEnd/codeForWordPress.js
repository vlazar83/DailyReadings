/* Add your JavaScript code here.

If you are using the jQuery library, then don't forget to wrap your code inside jQuery.ready() as follows:

jQuery(document).ready(function( $ ){
    // Your code in here
});

--

If you want to link a JavaScript file that resides on another server (similar to
<script src="https://example.com/your-js-file.js"></script>), then please use
the "Add HTML Code" page, as this is a HTML code that links a JavaScript file.

End of comment */ 

/*
  // Call it later in theme options section1 like this:
  <script type="text/javascript">
  <!--
  getDailyReading();
  //--></script>
*/

function getDailyReading(){
  
	var d = new Date();
	var year = d.getFullYear().toString();
    var month = (d.getMonth()+1).toString();
    var day = d.getDate().toString();
    
    // transform to 2 length format
    month = month.padStart(2, '0');
    day = day.padStart(2, '0');
    
    var basePath = 'https://ec2-3-16-163-87.us-east-2.compute.amazonaws.com:50001/dailyReading/';
    var requestURL = basePath.concat(year, '/', month, '/', day);
    
    console.log(requestURL)
  
  jQuery(document).ready(function( $ ){
    // Your code in here
      var promise = $.getJSON(requestURL);

  promise.done(function(data) {
    NewP = document.createElement("p");
    Text = document.createTextNode(data.firstReading);
    NewP.appendChild(Text);
    document.getElementById("section1").appendChild(NewP);
    
    newAnchor = document.createElement("a");
    var link = document.createTextNode("("+data.firstReadingShort+")");
    newAnchor.appendChild(link); 
    newAnchor.title = data.firstReadingShort; 
    newAnchor.href = data.firstReadingLink; 
    document.getElementById("section1").appendChild(newAnchor); 
    
    NewP2 = document.createElement("p");
    Text = document.createTextNode(data.secondReading);
    NewP2.appendChild(Text);
    console.log(Text);
    document.getElementById("section1").appendChild(NewP2);
    
    newAnchor2 = document.createElement("a");
    var link = document.createTextNode("("+data.secondReadingShort+")");
    newAnchor2.appendChild(link); 
    newAnchor2.title = data.secondReadingShort; 
    newAnchor2.href = data.secondReadingLink; 
    console.log(newAnchor2.title);
    document.getElementById("section1").appendChild(newAnchor2); 
    
  		}); 
	});
}


