<?php

$user_phone = htmlspecialchars($_POST['userphone']);


$token = "7213367169:AAEkKxmGSjjgE6Gf3swGm9Xios7cohw52YU";
$chat_id = "-4214926859";

$formData = array(
  "Телефон: " => $user_phone
);

foreach($formData as $key => $value) {
  $text .= $key . "<b>" . urlencode($value) . "</b>" . "%0A" ;
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&text={$text}&parse_mode=html", "r");

if ($sendToTelegram) {
  echo "Success";
} else {
  echo "Error";
}