<?php

if($_POST['name'] && $_POST['email'] && $_POST['company']) {
    $name = $_POST['name'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $interest = $_POST['interest'];

    $fs = fopen("contacts.csv","a");
    fputcsv($fs, array($name,$company,$email,$interest,));
    fclose($fs);
    exit;
} else {
    header("HTTP/1.1 400 Bad Request");
    exit;
}
?>
