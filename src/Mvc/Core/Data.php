<?php
namespace Mvc\Core;

class Data {
    // 共用的物件
    private $gtPost = NULL;
    // 初始化要執行的動作以及物件
    public function __construct()
    {
        $this->gtPost = $this->getPost();
    }
    //取得資料
    public function getPost()
    {
        foreach ($_POST as $key => $value)
        {
            $_POST[$key] = trim($value);
        }
        $userData = array();
        if (isset($_POST['id'])) {
            $userData['id'] = $_POST['id'];
        }
        if (isset($_POST['name'])) {
            $userData['name'] = $_POST['name'];
        }
        if (isset($_POST['password'])) {
            $userData['password'] = $_POST['password'];
        }
        if (isset($_POST['mobilephome'])) {
            $userData['mobilephome'] = $_POST['mobilephome'];
        }
        if (isset($_POST['address'])) {
            $userData['address'] = $_POST['address'];
        }
        return $userData;
    }
}