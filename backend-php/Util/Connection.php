<?php

//Il namespace deve essere uguale alla cartella che contiene il file
namespace Util;
use PDO;

//Include il file con i parametri di connessione
require_once '../conf/config.php';
/**
 * Classe per gestire la connessione al database
 */

class Connection
{

    //statico perchè è un attributo di classe istanziato una sola volta
    private static PDO $pdo;

    /**
     * Costruttore privato per evitare la creazione di oggetti
     */
    private function __construct()
    {

    }

    public static function getInstance(): PDO
    {
        if (!isset($pdo)) {
            $DSN = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHAR;
            $pdo = new PDO($DSN, DB_USER, DB_PASSWORD);
        }
        return $pdo;
    }
}