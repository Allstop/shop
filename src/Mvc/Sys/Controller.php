<?php
namespace Mvc\Sys;

use Mvc\Core\Data;

class Controller
{
    public static $app = null;

    public static function init()
    {
        self::$app = new Data();
        self::$app->getPost();
        self::$app->getCrPost();
    }
}