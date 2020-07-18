<?php

global $wpdb;

class TrakingCodes{
    private $file;
    private $wpdb;

    function __construct($file){
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->file = $file;
    }

    function saveTrakingsCodes(){
        $extension = pathinfo($this->file['name'], PATHINFO_EXTENSION);

        if(!empty($this->file) && $extension == 'csv'){
            $tablename = $this->wpdb->prefix."traking_codes";
            $error = false;

            $csvFile = fopen($this->file['tmp_name'], 'r');

            while(($csvData = fgetcsv($csvFile, 0, ';')) !== FALSE){
                $csvData = array_map("utf8_encode", $csvData);

                $ci = trim($csvData[0]);
                $cp = trim($csvData[5]);

                $data = array( 'cp' => $cp, 'ci' => $ci );

                if( !empty($ci) && !empty($cp) ){
                    if( !$this->wpdb->replace($tablename, $data) ){
                        $error = true;
                    }
                }
            }

            return !$error;
        }
    }
}