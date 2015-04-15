<?php
namespace Mvc\Core;

class Data {
    // 共用的物件
    private $gtPost = NULL;
    private $gtcPost = NULL;
    // 初始化要執行的動作以及物件
    public function __construct()
    {
        $this->gtPost = $this->getPost();
        $this->gtcPost = $this->getCrPost();
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
        return $userData;
    }
    //取得資料
    public function getCrPost()
    {
        foreach ($_POST as $key => $value)
        {
            $_POST[$key] = trim($value);
        }
        $userCrData = array();
        if (isset($_POST['id'])) {
            $userCrData['id'] = $_POST['id'];
        }
        if (isset($_POST['name'])) {
            $userCrData['name'] = $_POST['name'];
        }
        if (isset($_POST['password'])) {
            $userCrData['password'] = $_POST['password'];
        }
        if (isset($_POST['mobilephone'])) {
            $userCrData['mobilephone'] = $_POST['mobilephone'];
        }
        if (isset($_POST['address'])) {
            $userCrData['address'] = $_POST['address'];
        }
        return $userCrData;
    }
}