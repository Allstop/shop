<?php

namespace Mvc\Model;

class MainModel
{

    private static $db = null;

    protected $status = false;

    public function __construct($filename = null, $path = null)
    {
        try {
            self::$db = array();
            if (! $path) {
                $path = dirname(dirname(dirname(__DIR__))).'/config';
            }
            if (! $filename) {
                $filename = 'config.php';
            }
            self::$db = require(implode('/', array($path, $filename)));
            self::$db = new \PDO(self::$db['db']['dsn'], self::$db['db']['user'], self::$db['db']['pwd']);
            self::$db->query('set character set utf8');
            $this->status = true;
        } catch (PDOException $e) {
            $this->status = false;
            return;
        }
    }
    //*category
    public function category()
    {
        if ($this->status !== true) {
            return 'error';
        }
        try {
            $sql = self::$db->prepare("SELECT name FROM category order by id" );
            if ($sql->execute()) {
                $sql=$sql->fetchAll(\PDO::FETCH_ASSOC);
                return $sql;
            }else{
                return false;
            }
        }catch(\PDOException $e){
            return false;
        }
    }
    //*product
    public function product()
    {
        if ($this->status !== true) {
            return 'error';
        }
        try {
            $sql = self::$db->prepare("SELECT * FROM product order by id" );
            if ($sql->execute()) {
                $sql=$sql->fetchAll(\PDO::FETCH_ASSOC);
                return $sql;
            }else{
                return false;
            }
        }catch(\PDOException $e){
            return false;
        }
    }
}