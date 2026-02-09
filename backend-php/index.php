<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use League\Plates\Engine;
use Util\Connection;

require './vendor/autoload.php';
require './conf/config.php';

$pdo = Connection::getInstance();

//crea l'engine dei template
$templates = new Engine('templates', 'tpl');

$app = AppFactory::create();
//$app->setBasePath('/prova_DB');

$app->get('/', function (Request $request, Response $response, $args): Response {
    global $templates, $pdo;

    $pagina = $templates->render('routes', []);
    $response->getBody()->write($pagina);

    return $response;
});

$app->get('/park', function (Request $request, Response $response, $args): Response {
    global $templates, $pdo;

    $pagina = $templates->render('park', []);
    $response->getBody()->write($pagina);

    return $response;
});

$app->get('/park/{park_id}', function (Request $request, Response $response, $args): Response {
    global $templates, $pdo;

    $park_id = $args['park_id'];

    $pagina = $templates->render('park', []);
    $response->getBody()->write($pagina);

    return $response;
});

$app->post('/reservation/{park_id}', function (Request $request, Response $response, $args): Response {
    global $templates, $pdo;

    $park_id = $args['park_id'];

    $pagina = $templates->render('park', []);
    $response->getBody()->write($pagina);

    return $response;
});

$app->put('/reservation/{reservation_id}', function (Request $request, Response $response, $args): Response {
    global $templates, $pdo;

    $reservation_id = $args['reservation_id'];

    $pagina = $templates->render('park', []);
    $response->getBody()->write($pagina);

    return $response;
});

$app->delete('/reservation/{reservation_id}', function (Request $request, Response $response, $args): Response {
    global $templates, $pdo;

    $reservation_id = $args['reservation_id'];

    $pagina = $templates->render('park', []);
    $response->getBody()->write($pagina);

    return $response;
});

$app->run();
