<?php
//echo "Hello";
// 自動載入類別
require 'vendor/autoload.php';

session_start();

use Pux\Executor;
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
//pux
$mux = require "router/routes.php";
$route = $mux->dispatch($_SERVER['DOCUMENT_URI']);
echo Executor::execute($route);

