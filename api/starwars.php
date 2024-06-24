<?php
require '../classes/API.php';

use Classes\API;

header('Content-Type: application/json');
$page = isset($_GET['page']) ? $_GET['page'] : 1;

$countries = new API('https://swapi.dev/api/people', 10, $page, ['lang' => 'ru']);
echo $countries->info('results');
