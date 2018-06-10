<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function basic_request() {
        // $base_url = 'http://example.com';
        // $client = new \GuzzleHttp\Client( [
        //   'base_uri' => $base_url,
        // ] );
        // $path = '/index.html';
        // $response = $client->request( 'GET', $path,
        //  [
        //    'allow_redirects' => true,
        //  ] );
        // $response_body = (string) $response->getBody();
        // echo $response_body;
        $base_url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAwF-W_NKWHWWIppnMEBEyu5EXkdgqqoYo";
        $client = new \GuzzleHttp\Client( [
          'base_uri' => $base_url,
        ] );
        $path = '/index.html';

        // 画像へのパス
        $image_path = "/bg.jpg" ;

        // リクエスト用のJSONを作成
        $json = json_encode( array(
            "requests" => array(
                array(
                    "image" => array(
                        "content" => base64_encode( file_get_contents( $image_path ) ) ,
                    ) ,
                    "features" => array(
                        array(
                            "type" => "FACE_DETECTION" ,
                            "maxResults" => 3 ,
                        ) ,
                        array(
                            "type" => "LANDMARK_DETECTION" ,
                            "maxResults" => 3 ,
                        ) ,
                        array(
                            "type" => "LOGO_DETECTION" ,
                            "maxResults" => 3 ,
                        ) ,
                        array(
                            "type" => "LABEL_DETECTION" ,
                            "maxResults" => 3 ,
                        ) ,
                        array(
                            "type" => "TEXT_DETECTION" ,
                            "maxResults" => 3 ,
                        ) ,
                        array(
                            "type" => "SAFE_SEARCH_DETECTION" ,
                            "maxResults" => 3 ,
                        ) ,
                        array(
                            "type" => "IMAGE_PROPERTIES" ,
                            "maxResults" => 3 ,
                        ) ,
                    ) ,
                ) ,
            ) ,
        ) ) ;

        $response = $client->request('GET', $path,
        ['json' =>
            ['foo' => 'bar']
        ]
        );

        //
        // $response = $client->request( 'GET', $path,
        //  [
        //    'allow_redirects' => true,
        //  ] );
        $response_body = (string) $response->getBody();
        echo $response_body;
    }

    public function get_http_status_code() {
        $base_url = 'http://example.com';
        $client = new \GuzzleHttp\Client( [
            'base_uri' => $base_url,
        ] );

        $path = '/index.html';
        $response = $client->request( 'GET', $path,
            [
                'allow_redirects' => true,
            ] );
        $response_body = (string) $response->getStatusCode();
        echo $response_body;
    }

    public function with_headers() {
        $base_url = 'http://example.com';
        $client = new \GuzzleHttp\Client( [
            'base_uri' => $base_url,
        ] );

        $path = '/index.html';
        $headers = [
            'Origin'                    => 'http://www.example.com',
            'Accept-Encoding'           => 'gzip, deflate, br',
            'Accept-Language'           => 'ja,en-US;q=0.8,en;q=0.6',
            'Upgrade-Insecure-Requests' => '1',
            'User-Agent'                => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
            'Content-Type'              => 'application/x-www-form-urlencoded',
            'Accept'                    => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Cache-Control'             => 'max-age=0',
            'Referer'                   => 'http://www.example.com',
            'Connection'                => 'keep-alive'
        ];
        $response = $client->request( 'GET', $path,
            [
                'allow_redirects' => true,
                'headers'         => $headers,
                //'form_params'     => $form_params,
            ] );
        $response_body = (string) $response->getBody();
        echo $response_body;
    }
}
