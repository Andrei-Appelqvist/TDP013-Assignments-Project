var first = true;

function error(){
  const div = document.createElement('div');
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
  $.get('http://localhost:3000/flag?id='+id.toString(), function(res){
    //console.log(res);
    msg = document.getElementById(id);
    msg.className = 'read';

  });
}

var saveMessage = function(){
  var str = document.getElementById("text-box").value;
  document.getElementById('text-box').value ='';
  if (str.length > 140 || str.length <= 0){
    console.log("sadasdasdas");
    error();
  }

  else{
    $.get('http://localhost:3000/save?msg='+str,function(id){
      item = {};
      item["_id"]=id;
      item["msg"]=str;
      item["flag"]="false";
      makeHtmlMsg(item);
    });

  }
}

var makeHtmlMsg = function(item){
  console.log(item);
  //Tar emot ett json meddelande
  //Sätter msg i mongo till string
  var str = item.msg;
  const div = document.createElement('div');
  //Sätter "msg" som class eller read om den är läst
  if (item.flag == "true"){
    div.className = 'read';
  } else{
    div.className = 'msg';
  }
  //Sätter _id till id
  div.id = item._id;
  div.innerHTML = `<input type="button" class="check" name="btn" onclick="read_message('`+div.id+`')">
  <label id='lb'for="btn">`+ str +`</label> `;
  //Hittar 'msgs-box'
  //insertar i 'msgs-box'
  if(first == false){
    var el = document.getElementById('msgs-box');
    el.insertBefore(div, el.firstElementChild);
  }else{
    document.getElementById('msgs-box').appendChild(div);
    first = false;
  }
};

var fillMsgList = function(){
  //Skickar /getall till mongodb
  $.get('http://localhost:3000/getall', function(data, status){
    //Tar emot Json objekt och reversar (senast först)
    //messages_data = data.reverse();
    //console.log(messages_data);
    //Itererar genom Json objekt
    data.forEach(function(item){
      makeHtmlMsg(item);
    });
    //Skapar synligt meddelande för varje i mongodb

  });
};


$(document).ready(function(){
  fillMsgList();
});
