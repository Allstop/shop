<?php
namespace Mvc\Controller;

use Mvc\Model\MainModel;
use Mvc\View\View;

class MainController
{
    // 共用的物件
    private $Model = NULL;
    public function __construct()
    {
        $this->Model = new MainModel();
    }
    //session檢查
    public function sessionCheck()
    {
        if (isset($_SESSION['name'])) {
            return View::render(array('status' => $_SESSION));
        }
    }
    //登出
    public function logout()
    {
        session_destroy();
    }

    public function category()
    {
        $status = $this->Model->category();
        if ($status == false) {
            return View::render(array('status' => false));
        }else {
            return View::render(array('status' => $status));
        }
    }

    public function product()
    {
        $status = $this->Model->product();
        if ($status == false) {
            return View::render(array('status' => false));
        }else {
            return View::render(array('status' => $status));
        }
    }
}