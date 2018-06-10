<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// 初期ページ
Route::get('/', function () {
    return view('home');
});

// Route::get('/basic_request', 'PhotoController@basic_request');
// Route::get('/with_headers', 'PhotoController@with_headers');


//アップロード用
Route::post('/upload', 'HomeController@upload');

Route::get('/home', function () {
    return view('home');
});

Auth::routes();
