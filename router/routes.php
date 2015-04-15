<?php

require_once("vendor/autoload.php");
use Pux\Mux;

$mux = new Mux;

$mux->any('/', ['Mvc\Controller\TemplateController', 'index']);
//*session檢查
$mux->post('/sessionCheck', ['Mvc\Controller\MainController', 'sessionCheck']);
//*product
$mux->get('/product', ['Mvc\Controller\MainController', 'product']);
//*category
$mux->get('/category', ['Mvc\Controller\MainController', 'category']);
//*登出
$mux->get('/logout', ['Mvc\Controller\MainController', 'logout']);

//User
//*登入檢查
$mux->post('/loginUserCheck', ['Mvc\Controller\UserController', 'loginCheck']);
//*建立
$mux->post('/createUser', ['Mvc\Controller\UserController', 'create']);
//*建立檢查
$mux->post('/createUserCheck', ['Mvc\Controller\UserController', 'createCheck']);
//*upload
$mux->post('/upload', ['Mvc\Controller\UserController', 'upload']);

//Customer
//*登入檢查
$mux->post('/loginCustomerCheck', ['Mvc\Controller\CustomerController', 'loginCheck']);
//*建立
$mux->post('/createCustomer', ['Mvc\Controller\CustomerController', 'create']);
//*建立檢查
$mux->post('/createCustomerCheck', ['Mvc\Controller\CustomerController', 'createCheck']);

return $mux;