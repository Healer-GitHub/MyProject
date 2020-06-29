<?php
$servername = "127.0.0.1:3306";
$username = $_GET['name'];//$_GET['']内是小程序发送的参数
$password = $_GET['password'];
$database = $_GET['database'];
$openid = $_GET['openid'];
$code = $_GET['code'];
// 创建连接
$conn = new mysqli($servername, $username, $password,$database);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
    
} 

//向数据库中插入数据
$sql = "INSERT INTO list (openid, code) VALUES ('".$openid."', '" .$code ."')";
/*
('".$openid."', '" .$code ."')"中，格式应如VALUES ('XXX', 'XXX')"，XXX
外面是要有引号的,所以，改成参数后，拼接语句要格外注意，笔者在调试时因为这个小问题困扰了很久
*/
if ($conn->query($sql) === TRUE) {
    echo "succeed";
} else {
    echo "Error creating database: " . $conn->error;
    
}

$conn->close();
?>
