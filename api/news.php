<?php
include '../classes/API.php';
use Classes\API;
header('Content-Type: application/json');

// API requests
// query 
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$query = [
  'apiKey' => '532a0595092541efbf6c821412bae86f',
  'q' => 'tesla',
  'from' => '2024-05-24',
  'sortBy' => 'publishedAt',
  'language' => 'ru',
]; 
// req
$news = new API('https://newsapi.org/v2/everything', 10, $page, $query);
echo $news->info('articles');

