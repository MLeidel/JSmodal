const JSmodal = {

  closer : 0,  // modal close style: 0=X only|1=Outside Box Or X
              // the value for close is set in JSmodal.open function

  // on document ready
  init : function() {
    document.getElementsByTagName("body")[0].innerHTML += `
      <div id="JSmodal" class="JSmodal">
        <div class="JSmodal-content">
          <span class="JSclose" onclick="JSmodal.close();">&#65336;</span>
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

    if (msg.length > 1800) {  // large text
      document.querySelector(".JSmodal-content p").style = "overflow: auto; height: 250px;";
    }
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
