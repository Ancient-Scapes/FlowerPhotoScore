<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     $user = User::find(auth()->id());
    //
    //     return view('home', compact('user'));
    // }


    /**
     * ファイルアップロード処理
     */
    public function upload(Request $request)
    {

        // return redirect('/home')->with('success', '保存しました。');
        // APIキー
        $api_key = "APIキー" ;
        // 画像へのパス
        $image_path = $_FILES['file']['tmp_name'] ;

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
                            "maxResults" => 100 ,
                        ) ,
                        array(
                            "type" => "LABEL_DETECTION" ,
                            "maxResults" => 100 ,
                        ) ,
                        array(
                            "type" => "WEB_DETECTION" ,
                            "maxResults" => 100 ,
                        ) ,
                    ) ,
                ) ,
            ) ,
        ) ) ;

        // リクエストを実行
        $curl = curl_init() ;
        curl_setopt( $curl, CURLOPT_URL, "https://vision.googleapis.com/v1/images:annotate?key=" . $api_key) ;
        curl_setopt( $curl, CURLOPT_HEADER, true ) ;
        curl_setopt( $curl, CURLOPT_CUSTOMREQUEST, "POST" ) ;
        curl_setopt( $curl, CURLOPT_HTTPHEADER, array( "Content-Type: application/json" ) ) ;
        curl_setopt( $curl, CURLOPT_SSL_VERIFYPEER, false ) ;
        curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true ) ;
        curl_setopt( $curl, CURLOPT_TIMEOUT, 15 ) ;
        curl_setopt( $curl, CURLOPT_POSTFIELDS, $json ) ;
        $res1 = curl_exec( $curl ) ;
        $res2 = curl_getinfo( $curl ) ;
        curl_close( $curl ) ;

        // 取得したデータ
        $json = substr( $res1, $res2["header_size"] ) ;				// 取得したJSON
        $header = substr( $res1, 0, $res2["header_size"] ) ;		// レスポンスヘッダー
        $success = '保存しました。';

        return $json;
    }
}
