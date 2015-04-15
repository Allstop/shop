//全域變數
var BASE_URL = location.protocol + '//' + location.hostname;
$('.welcome').hide();

//登入
$(".Login").click(function(){
    var touch=$(this).attr("id");
    login(touch);
});
//點選logout
$(document).on("click",".logout",function(){
  logout();
});
//點選Login/New
$(document).on("click","#login button",function(){
    var touch=$(this).attr("class"),
        touchEvent = touch.split('_'),
        ln = touchEvent[0],
        cu = touchEvent[1];
    if (ln == 'log'){
        if ($(".name").val() == '' || $(".password").val() == '') {
            alert("帳號、密碼不得為空值！");
        } else {
            var nameValue = $(".name").val();
            var passwordValue = $(".password").val();
            var list = {
                "name" : nameValue,
                "password" : passwordValue
            }
            if (cu == 'customer'){
                loginCustomerCheck(list);
            }else{
                loginUserCheck(list);
            }
        }
    }else if(ln == 'new'){
        var $Div = $('<div class="create"></div>');
        $Div.append('建立帳號：<input type="text" class="name" name="name"><br/>');
        $Div.append('建立密碼：<input type="password" class="password" name="password"><br/>');
        $Div.append('建立手機：<input type="text" class="mobilephone" name="mobilephone"><br/>');
        if (cu=='customer'){
            $Div.append('建立地址：<input type="text" class="address" name="address"><br/>');
        }
        $Div.append('<br/><button class="create_'+cu+'">GO</button>');
        $('#m').html('<h1>Shop_Car</h1><div id="category"></div><div id="login"></div><div id="create"></div><div id="product"></div><div id="upload"></div>');
        $('#create').append($Div);
    }
});
//點選create
$(document).on("click",".create button",function(){
    var nameValue = $(".name").val();
    var passwordValue = $(".password").val();
    var mobilephoneValue = $(".mobilephone").val();
    var addressValue = $(".address").val();
    var crlist = {
        "name" : nameValue,
        "password" : passwordValue,
        "mobilephone" : mobilephoneValue,
        "address" : addressValue
    }
    var touch=$(this).attr("class"),
    touchEvent = touch.split('create_');
    if (touchEvent[1] == 'customer'){
        createCustomerCheck(crlist);
    }else{
        createUserCheck(crlist);
    }
});
//點選logout
$(document).on("click","#submit",function(){
  console.log(this.files);
  upload();
});

//session檢查
var sessionCheck = function() {
    $.ajax({
        url: BASE_URL + "/sessionCheck",
        type: "POST",
        dataType: "JSON",
        success: function(response) {
            if (response.status != null){
                $('#m').html('<h1>Shop_Car</h1><div id="category"></div><div id="login"></div><div id="create"></div><div id="product"></div><div id="upload"></div>');
                if (response.status.customername != null){
                    var Gust = 'Customer';
                }else{
                    var Gust = 'User';
                    $('#upload').html('');
                    $('#upload').append('<input type="file" id="file" name="file"></br></br>');
                    $('#upload').append('<input type="submit" id="submit" value="上傳">');
                   // $('#upload').append('<img id="myImg" src="#" alt="your image" />');
                }
                $('.Login').hide();
                category();
                welcome(Gust,response.status.name);
                product();
            }
        },
        error: function () {
            product();
        }
    })
};
//welcome
var welcome = function(Gust,name){
    $('.welcome').show();
    $('.welcome').html('');
    $('.welcome').append("Welcome "+Gust+" , "+name+"&nbsp;&nbsp;");

    $('.welcome').append('<a href="#">首頁</a>&nbsp;');

    if (Gust=='User') {
        $('.welcome').append('<a href="#" class="">個人資料</a>&nbsp;&nbsp;');
        $('.welcome').append('<a href="#" class="">商品清單</a>&nbsp;&nbsp;');
        $('.welcome').append('<a href="#" class="">進貨單</a>&nbsp;&nbsp;');
        $('.welcome').append('<a href="#" class="">銷貨單</a>&nbsp;&nbsp;');
        $('.welcome').append('<a href="#" class="">客戶名單</a>&nbsp;&nbsp;');
    }else{
        $('.welcome').append('<a href="#" class="">個人資料</a>&nbsp;&nbsp;');
        $('.welcome').append('<a href="#" class="">購物車</a>&nbsp;&nbsp;');
        $('.welcome').append('<a href="#" class="">訂單明細</a>&nbsp;&nbsp;');
    }
    $('.welcome').append('<a href="#" class="logout">登出</a>&nbsp;&nbsp;');
}
//category
var category = function() {
    $.ajax({
        url: BASE_URL + "/category",
        type: "GET",
        dataType: "JSON",
        success: function (response) {
            if (response.status == false) {
            }else{
                var $table = $('<table Align="Center"></table>');
                var $Tr = $('<tr></tr>');
                for (var key in response.status ) {
                    var $Td = $('<td class="b3"></td>');
                    var $a = $('<a href="#"></a>')
                    $a.text(response.status[key].name);
                    $Td.append($a);
                    $Tr.append($Td);
                    $table.append($Tr);
                }
                $('#category').html('');
                $('#category').append($table);
            }
        }
    })
};
//登入
var login = function(touch){
    var $Div = $('<div></div>');
    $Div.append('帳號：<input type="text" class="name" name="name"><br/>');
    $Div.append('密碼：<input type="password" class="password" name="password"><br/><br/>');
    $Div.append('<button class="log_'+ touch +'">Login</button>&nbsp;');
    $Div.append('<button class="new_'+ touch +'">New</button>');
    $('#m').html('<h1>Shop_Car</h1><div id="category"></div><div id="login"></div><div id="create"></div><div id="product"></div><div id="upload"></div>');
    $('#login').append($Div);
}
//登出,釋放session，回到初始畫面
var logout = function(){
    $.ajax({
        url: BASE_URL + "/logout",
        type: "GET",
        success: function() {
            $('.Login').show();
            $('.welcome').hide();
            $('#upload').hide();
        },
        error: function () {
        }
    })
}
//loginUser檢查
var loginUserCheck = function(list) {
    $.ajax({
        url: BASE_URL + "/loginUserCheck",
        type: "POST",
        dataType: "JSON",
        data: list,
        success: function(response) {
            if (response.status == false) {
                alert("登入失敗，請重新登入！");
            }else{
                sessionCheck();
            }
        },
        error: function () {
        }
    })
};
//loginCustomer檢查
var loginCustomerCheck = function(list) {
    $.ajax({
        url: BASE_URL + "/loginCustomerCheck",
        type: "POST",
        dataType: "JSON",
        data: list,
        success: function(response) {
            if (response.status == false) {
                alert("登入失敗，請重新登入！");
            }else{
                sessionCheck();
            }
        },
        error: function () {
        }
    })
};
//createUser檢查
var createUserCheck = function(crlist) {
    $.ajax({
        url: BASE_URL + "/createUserCheck",
        type: "POST",
        dataType: "JSON",
        data: crlist,
        success: function(response) {
            if (response.status == 'success') {
                createUser(crlist);
            }else if (response.status == 'errorps'){
                alert('密码必须为6位以上的数字和字母的组合');
            }else if (response.status == 'errormo'){
                alert('行動電話號碼格式錯誤,請重新輸入！');
            }else{
                alert('資料已存在,請重新建立！');
            }
        }
    })
};
//建立User
var createUser = function(crlist) {
  $.ajax({
      url: BASE_URL + "/createUser",
      type: "POST",  //POST or GET 大寫
      dataType: "JSON",
      data: crlist,    // 要傳入的json 物件
      success: function (response) {
          $('#create').html('');
          loginUserCheck(crlist);
      },
      error: function () {
      }
  })
};
//createCustomer檢查
var createCustomerCheck = function(crlist) {
  $.ajax({
      url: BASE_URL + "/createCustomerCheck",
      type: "POST",
      dataType: "JSON",
      data: crlist,
      success: function(response) {
          if (response.status == 'success') {
              createCustomer(crlist);
          }else if (response.status == 'errorps'){
              alert('密码必须为6位以上的数字和字母的组合');
          }else if (response.status == 'errormo'){
              alert('行動電話號碼格式錯誤,請重新輸入！');
          }else{
              alert('資料已存在,請重新建立！');
          }
      }
  })
};
//建立Customer
var createCustomer = function(crlist) {
  $.ajax({
      url: BASE_URL + "/createCustomer",
      type: "POST",  //POST or GET 大寫
      dataType: "JSON",
      data: crlist,    // 要傳入的json 物件
      success: function (response) {
          $('#create').html('');
          loginCustomerCheck(crlist);
      },
      error: function () {
      }
  })
};
//登出,釋放session，回到初始畫面
var upload = function(){
  $.ajax({
    url: BASE_URL + "/upload",
    type: "POST",
    success: function() {
    },
    error: function () {
    }
  })
}
//product
var product = function() {
    $.ajax({
        url: BASE_URL + "/product",
        type: "GET",
        dataType: "JSON",
        success: function (response) {
            if (response.status == false) {
            } else {
                var $table = $('<table></table>');
                var $Tr = $('<tr></tr>');
                for (var key in response.status) {
                    var $Td = $('<td class="b3"></td>');
                    var $a = $('<a href="#"></a>')
                    $a.text(response.status[key].name);
                    $Td.append($a);
                    $Tr.append($Td);
                    $table.append($Tr);
                }
                $('#product').html('');
                $('#product').append($table);
            }
            //$('#product').html('');
            //$('#product').append('<img width="200" src="../public/files/cara.jpg"></br></br>');
            //$('#product').append('價格:$200</br></br>');
        }
    })
};
sessionCheck();