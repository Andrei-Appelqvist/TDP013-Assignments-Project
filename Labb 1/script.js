var msg_num = 0;

function magic(){
  var str = document.getElementById("text-box").value;
  document.getElementById('text-box').value ='';
  const div = document.createElement('div');
  var first = true;

  if (str.length > 140 || str.length <= 0){
    error(div);
  }

  else{

    div.className = 'msg';
    div.id = msg_num;
    div.setAttribute("name","unread_msg")
    msg_num += 1;
    div.innerHTML = `<input type="button" class="check" name="btn" onclick="read_message(`+(msg_num -1).toString()+`)">
    <label id='lb'for="btn">`+ str +`</label> `;

    if (first == true) {
      var firstdiv;
      firstdiv = div;
      document.getElementById('msgs-box').appendChild(firstdiv);
      first = false;
    }
    var el = document.getElementById('msgs-box');
    el.insertBefore(div, el.firstElementChild);
  }
}


function error(div){
  var errorbox = div;
  errorbox.id = 'errorbox';
  var el = document.getElementById('msgs-box');
  errorbox.innerHTML = "<br>The content of your message has to be less than 140 characters but more than 0.<br><br><input type='button' id='tabort' name='okaybtn' value= 'Ta bort' onclick='removeerror()'> "
  document.getElementById('msgs-box').insertBefore(div, el.firstElementChild);

}

function removeerror(){
  element = document.getElementById('errorbox');
  element.parentNode.removeChild(element);
}

function read_message(id){
  msg = document.getElementById(id);
  msg.className = 'read';
  msg.setAttribute("name", "read_msg")
  //msg.removeChild(msg.childNodes[0]);
  console.log(msg.childNodes);
}
