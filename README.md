# JSmodal
modal pop-up boxes for Javascript alert, confirm, and prompt

### JSmodal.js

A modal message box, form or dialog box must be processed
before you can continue working with the rest of the
application. Examples in Javascript are the
```alert, confirm, and prompt``` statements.
These commands are very useful but do not permit additional styling.

JSmodal is a small Javascript library and css that 
work with the DOM to make modal dialogs
flexible and attractive.

To use JSmodal it is important to understand that, unlike the Javascript
```alert, confirm, prompt``` commands, JSmodal functions are NON-BLOCKING.
That means execution of the code does NOT stop when the box is displayed.
Because of this JSmodal usually cannot be a simple replacement of the
Javascript methods.

First JSmodal.js and JSmodal.css must be brought into your web page:
```javascript
  <script src="JSmodal.min.js"></script>
  <link rel="stylesheet" href="JSmodalani.css">
```

* __JSmodal.open(_mode, content_)__  
  This opens the modal object over the page dimming the underlying page content.
  A close "X" is always present in the upper right corner of the box. Clicking
  "X" will close the modal object.
  
  If ___mode___ is set to 1 then any click outside of the box will close
  the modal object.  
  If ___mode___ is set to 0 then only the "X" will
  close the modal object.

* __JSmodal.close()__  
  Call this to programatically close the modal object.
  
* __JSmodal.confirm(_commands, content_)__
  This opens a modal 'confirm' box.
  The _commands_ are the Javascript to be executed when the 
  user clicks the 'confirm' button.
  
* __JSmodal.prompt(_commands, content_)__
  This open a modal box with an input field and and 'OK' button.
  The _commands_ are the Javascript to be executed when the 
  user clicks the 'OK' button. 
  The ID of the input text field is "JSid".


### __JSmodal.css__  
  Using this style sheet presents a box without any animation.
  Using _JSmodalani.css_ is the same but WITH animation.

### Demo page for JSmodal  
```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset='UTF-8'>
	<meta name='viewport' content='width=device-width, initial-scale=1'>
	<title>JSmodal All Example</title>

  <script src="JSmodal.min.js"></script>
  <link rel="stylesheet" href="JSmodalani.css">
  <!--<link rel="stylesheet" href="JSmodal.css">-->
  <style>
    a:hover {
      cursor: pointer;
      background: lightyellow;
    }
  </style>
</head>
<body>
<!--
NOTE: JSmodal will usually be called inline rather than from an HTML tag.
For demo purposes it seemed better to use click events.

IMPORTANT NOTE: Unlike the Javascript 'alert, confirm, prompt' statements
JSmodal is NON-BLOCKING - it does not "wait" for user action.
-->

<h2>Modal Boxes: open</h2>

<!-- Triggering the modal boxes -->

<!-- call the modal box within a function -->
<button onclick="myMsg()">Open Example A</button>

<!-- open the modal box in a DOM event -->
<button onclick="JSmodal.open(1,'Hello Modal World')">Open Example B</button>

<!-- open modal box with a long message -->
<button onclick="JSmodal.open(1,`
  Phasellus scelerisque sodales condimentum.<br>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
  Phasellus scelerisque sodales condimentum.<br>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
  Phasellus scelerisque sodales condimentum.`)">Open Example C</button>

<br><br><br><br><br><br><br>
<div id="H"></div>

<script>

function myMsg() {
  JSmodal.open(0,"Phasellus scelerisque sodales condimentum.");
  // JSmodal does not wait for user action like the javascript 'alert' statement.
  document.getElementById('H').innerHTML = "JSmodal is NON-BLOCKING !";
}
</script>

<!-- ////////////////////////////////////////////////////////////////////////// -->
<h2>Modal Boxes: confirm</h2>

<button onclick='JSmodal.confirm("thisConfirm()", "Please confirm this");'>
  JSmodal.confirm Example</button>&nbsp;

<!-- alternatively:
    the 'confirmed' action can be included as shown here -->
<a onclick="JSmodal.confirm(`
  JSmodal.close();
  alert('Confirmed')`,
  'Please confirm this')">anchor JSmodal.confirm</a>

<script>
// User is a user supplied routine to process confirmed response
function thisConfirm() {
  JSmodal.close();  // must call to close the modal box
  // actions to be performed on confirmation
  alert("Confirmed");
}
</script>

<br><br><br><br><br><br><br>
<!-- ////////////////////////////////////////////////////////////////////////// -->
<h2>Modal 'prompt' Example</h2>
<!--
NOTE: This CANNOT be implemented like the javascript 'prompt' statement!
JSmodal is NON-BLOCKING which means that it does
NOT "wait" for user input before proceeding to the next statement.
see "Open Example A"
-->

<button onclick='myPrompt()'>JSmodal.prompt Example</button>

<br><br>
<div id="I"></div>

<script>

function myPrompt() {
  JSmodal.prompt(`
    JSmodal.close();
    let val = document.getElementById('JSid').value;
    alert('prompted input: ' + val);`,
  "Please enter your email");

  // immediately falls through to do this ...
  document.getElementById('I').innerHTML = "Remember JSmodal is Non-blocking!";
}
</script>

</body>
</html>
```
-----

__JSmodal.js__
```javascript
const JSmodal = {

  closer : 0,  // modal close style: 0=X only|1=Outside Box Or X
              // the value for close is set in JSmodal.open function

  // on document ready
  init : function() {
    document.getElementsByTagName("body")[0].innerHTML += `
      <div id="JSmodal" class="JSmodal">
        <div class="JSmodal-content">
          <span class="JSclose" onclick="JSmodal.close();">&times;</span>
          <p></p>
        </div>
      </div>
    `;

    window.onclick = function(event) {
      if (event.target == document.getElementById('JSmodal')) {
        if (JSmodal.closer === 1) {
          document.getElementById('JSmodal').style.display = "none";
        }
      }
    };
  },

  // call this with text to display in 'msg'
  open : function(mode, msg) {
    if (arguments.length < 2) {
      alert("Missing mode arg in JSmodal.open(mode, msg)");
      return;
    }
    JSmodal.closer = mode;
    document.querySelector(".JSmodal-content p").innerHTML = msg;
    document.getElementById('JSmodal').style.display = "block";
  },

  // When the user clicks on <span> (x), close the modal
  close : function() {
    document.getElementById('JSmodal').style.display = "none";
  },

  // confirm uses open always with a 0 open mode
  confirm : function(routine, msg) {
    msg += `
      <br><br>
      <button onclick="${routine}">&nbsp;&nbsp;&nbsp;Confirm&nbsp;&nbsp;&nbsp;</button>
    `;
    JSmodal.open(0, msg);
  },

  // prompt uses open always with a 0 open mode
  prompt : function(routine, msg) {
    msg += `
      <br><br>
      <input type="text" id="JSid" size="32"><br><br>
      <button onclick="${routine}">&nbsp;&nbsp;&nbsp; OK &nbsp;&nbsp;&nbsp;</button>
    `;
    JSmodal.open(0, msg);
  }

};

document.addEventListener("DOMContentLoaded", function(event) {
  JSmodal.init();
});

```
-----
__JSmodal.css__
```css
.JSmodal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */

.JSmodal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  border-radius: 5px;
}

/* The Close Button */

.JSclose {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.JSclose:hover,
.JSclose:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

```
