//全域變數
var BASE_URL = location.protocol + '//' + location.hostname;
$('.welcome_user').hide();

//客戶登入
$("#cLogin").click(function(){
  $('div[id^="login_"]').html('');
  var $Div = $('<div></div>');
  $Div.append('u帳號：<input type="text" class="name" name="name"><br/>');
  $Div.append('u密碼：<input type="text" class="password" name="password"><br/><br/>');
  $Div.append('<button class="log">Login</button>&nbsp;');
  $Div.append('<button class="new">New</button>');
  $('#login_customer').html('');
  $('#login_customer').append($Div);
});
//廠商登入
$("#uLogin").click(function(){
  $('div[id^="login_"]').html('');
  var $Div = $('<div></div>');
  $Div.append('c帳號：<input type="text" class="name" name="name"><br/>');
  $Div.append('c密碼：<input type="text" class="password" name="password"><br/><br/>');
  $Div.append('<button class="log">Login</button>&nbsp;');
  $Div.append('<button class="new">New</button>');
  $('#login_user').html('');
  $('#login_user').append($Div);
});
//點選Login
$(document).on("click",".log",function(){
  if ($(".name").val() == '' || $(".password").val() == '') {
    alert("帳號、密碼不得為空值！");
  } else {
    var nameValue = $(".name").val();
    var passwordValue = $(".password").val();
    var list = {
      "name" : nameValue,
      "password" : passwordValue
    }
    loginCheck(list);
  }
});
//點選New registration
$(document).on("click",".new",function(){
  var $Div = $('<div></div>');
  $Div.append('建立帳號：<input type="text" class="name" name="vname"><br/>');
  $Div.append('建立密碼：<input type="text" class="password" name="password"><br/>');
  $Div.append('建立手機：<input type="text" class="mobilephome" name="mobilephome"><br/>');
  $Div.append('<button class="go">GO</button>');
  $('.login').html('');
  $('.create').html('');
  $('.create').append($Div);
});

//login檢查
var loginCheck = function(list) {
  $.ajax({
    url: BASE_URL + "/loginCheck",
    type: "POST",
    dataType: "JSON",
    data: list,
    success: function(response) {
      if (response.status == false) {
        alert("登入失敗，請重新登入！");
      }else{

        $('.Login').hide();
        $('.welcome_user').show();
        $('.welcome_user').html('');
        $('.welcome_user').append("Welcome , "+response.username+"&nbsp;&nbsp;");
        $('.welcome_user').append('<a href="#" class="logout">登出</a>');
        $('div[id^="login_"]').html('');
        $('#product').html('');
        $('#product').append('productList');
      }
    },
    error: function () {
    }
  })
};