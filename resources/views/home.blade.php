@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">画像認識して結果から適当に採点するよ</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>

                    @endif

                    {!! Form::open(['id' => 'photoForm' ,'url' => '/upload', 'method' => 'post', 'files' => true]) !!}

                        {{-- エラーメッセージ --}}
                        @if ($errors->any())
                            <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                            </d
                        @endif

                        <div class="fadeArea">
                            <div class="loadingArea"></div>
                        </div>



                        <div class="form-group">

                            {!! Form::label('file', '画像アップロード', ['class' => 'control-label']) !!}
                            {!! Form::file('file', ['accept' => 'image/*']) !!}
                            <div class="contentBoxImage">

                            </div>
                        </div>

                        <div class="resultArea">
                          <div class="charts">
                            <div class="chart chart--dev">
                                <div class="reflect_body">
                                  <div class="image-analysis-result" title="">

                                  </div>
                                </div>

                                  <ul class="chart--horiz">

                                    <div class="captionArea">
                                      <span class="caption">物体検出点</span>
                                      <span class="percent percentLabel"></span>
                                    </div>
                                    <li class="chart__bar widthLabel" style="width: 10%;"></li>

                                    <div class="captionArea">
                                      <span class="caption">顔認識点</span>
                                      <span class="percent percentFace"></span>
                                    </div>
                                    <li class="chart__bar widthFace" style="width: 10%;"></li>

                                    <div class="captionArea">
                                      <span class="caption">ウェブコンテンツ点</span>
                                      <span class="percent percentWeb"></span>
                                    </div>
                                    <li class="chart__bar widthWeb" style="width: 10%;"></li>

                                  </ul>
                              </div>

                              <ul class="price_lists">
                                <li class="price_list">
                                  <div class="price">
                                    <span class="num">

                                    </span>
                                    <span class="unit">
                                      点
                                    </span>
                                  </div>
                                </li>
                              </ul>
                            </ul>
                          </div>
                        </div>

                    {!! Form::close() !!}
                    </div>

                    <div class="similar-area">

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
