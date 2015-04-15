<?php
namespace Mvc\Controller;

use Mvc\Model\CustomerModel;
use Mvc\View\View;
use Mvc\Sys\Controller;

class customerController extends Controller
{
    // 共用的物件
    private $Model = NULL;
    private $gtPost = NULL;
    // 初始化要執行的動作以及物件
    public function __construct()
    {
        Controller::init();
        $this->Model = new CustomerModel();
        $this->gtPost = self::$app->getPost();
        $this->gtcPost = self::$app->getCrPost();
    }
    //登入檢查
    public function loginCheck()
    {
        $_SESSION['customername'] = $this->gtPost['name'];
        $_SESSION['name'] = $this->gtPost['name'];
        $_SESSION['password'] = $this->gtPost['password'];
        $status = $this->Model->loginCheck($_SESSION);
        if ($status == false) {
            session_destroy();
            return View::render(array('status' => false));
        }else {
            return View::render(array('status' => $status));
        }
    }
    //建立
    public function create()
    {
        $status = $this->Model->create($_SESSION);

        return View::render(array('status' => $status));
    }
    //建立檢查
    public function createCheck()
    {
        $inspectps=strlen($this->gtcPost['password']);

        $_SESSION['name'] = $this->gtcPost['name'];
        $_SESSION['password'] = $this->gtcPost['password'];
        $_SESSION['mobilephone'] = $this->gtcPost['mobilephone'];
        $_SESSION['address'] = $this->gtcPost['address'];
        $status = $this->Model->createCheck($_SESSION['name']);
        if(!preg_match("/^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i",$this->gtcPost['password'])||$inspectps<6){
            return View::render(array('status' => 'errorps'));
        }elseif (!preg_match("/09[0-9]{2}[0-9]{6}/",$this->gtcPost['mobilephone'])) {
            return View::render(array('status' => 'errormo'));
        }elseif ($status == 'success') {
            return View::render(array('status' => false));
        }else {
            return View::render(array('status' => 'success'));
        }
    }
}
