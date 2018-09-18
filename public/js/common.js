function getFileSize(file_size)
{
 // test
 var str;

 // 単位
 var unit = ['byte', 'KB', 'MB', 'GB', 'TB'];

 for (var i = 0; i < unit.length; i++) {
   if (file_size < 1024 || i == unit.length - 1) {
     if (i == 0) {
       // カンマ付与
       var integer = file_size.toString().replace(/([0-9]{1,3})(?=(?:[0-9]{3})+$)/g, '$1,');
       str = integer +  unit[ i ];
     } else {
       // 小数点第2位は切り捨て
       file_size = Math.floor(file_size * 100) / 100;
       // 整数と小数に分割
       var num = file_size.toString().split('.');
       // カンマ付与
       var integer = num[0].replace(/([0-9]{1,3})(?=(?:[0-9]{3})+$)/g, '$1,');
       if (num[1]) {
         file_size = integer + '.' + num[1];
       }
       str = file_size +  unit[ i ];
     }
     break;
   }
   file_size = file_size / 1024;
 }

 return str;
}

function exeCloudVision(){
  // フォームデータを取得
  var formdata = new FormData($('#photoForm').get(0));
  $.ajaxSetup({
  　　headers: {
  　　　'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  　　}
  　});

  $.ajax({
    url: '/upload',
    type : "POST",
    　　　//なければ不要(data)
    　　　data: formdata,
    　　　dataType : "json",
         timeout: 50000,
         contentType: false,
         processData: false,
  }).done(function (data) {
    $('.fadeArea').fadeOut(600);
    $('.loadingArea').html("");
    $('.resultArea').fadeIn(600);
    //データをコンソールに表示
    viewResultLog(data);
  }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
      $('.fadeArea').fadeOut(400);
      $('.loadingArea').html("");
　　　　alert("エラーが発生しました：" + textStatus + ":\n" + errorThrown);
　});
}

function viewResultLog(result){
  console.log(result.responses[0]);

  var viewFlag = [];
  var type = "";
  var totalscore = 0;

  type = "Label";
  //カテゴリ検出
  //最高得点 100点
  if(result.responses[0].labelAnnotations){
    console.log("---物体検出---");

    totalscore += getScore(result.responses[0].labelAnnotations, type);;
    viewFlag[type] = true;
  }
  else{
    viewFlag[type] = false;
  }

  type = "Face";
  //顔検出
  //最高特典 30点
  if(result.responses[0].faceAnnotations){
    console.log("---顔検出---");

    totalscore += getScore(result.responses[0].faceAnnotations, type);;
    viewFlag[type] = true;
  }
  else{
    viewFlag[type] = false;
  }

  type = "Web";
  //Webでの一致した画像検出
  //最高得点 100点
  if(result.responses[0].webDetection){
    console.log("---Web類似コンテンツ検出---");

    //画像情報を表示
    $('.image-analysis-result').html(result.responses[0].webDetection.bestGuessLabels[0].label);
    totalscore += getScore(result.responses[0].webDetection, type);;
    viewFlag[type] = true;
  }
  else{
    viewFlag[type] = false;
  }

  //非表示
  Object.keys(viewFlag).forEach(function(key){
    if(viewFlag[key] == true){
      $('.width' + key).prev().show();
      $('.width' + key).show();
    }
    if(viewFlag[key] == false){
      $('.width' + key).prev().hide();
      $('.width' + key).hide();
    }
  });

  $('.num').html(totalscore);

}


//タイプ別にデータからスコアを取得する
function getScore(contents, type){
  var label_judge_array = {
    "FLOWER" : {
      "use" : false,
      "score" : 10
    },
    "ROSE" : {
      "use" : false,
      "score" : 10
    },
    "BLUE" : {
      "use" : false,
      "score" : 10
    },
    "RED" : {
      "use" : false,
      "score" : 5
    },
    "YELLOW" : {
      "use" : false,
      "score" : 3
    },
    "SAKURA" : {
      "use" : false,
      "score" : 15
    },
    "HANAMI" : {
      "use" : false,
      "score" : 10
    },
    "HANAMIZUKI" : {
      "use" : false,
      "score" : 20
    },
    "PLANT" : {
      "use" : false,
      "score" : 5
    },
    "ADULT" : {
      "use" : false,
      "score" : 10
    },
    "GARDEN" : {
      "use" : false,
      "score" : 10
    },
    "INSECT" : {
      "use" : false,
      "score" : -10
    },
    "AMARYLLIS" : {
      "use" : false,
      "score" : 50
    },
    "FOOD" : {
      "use" : false,
      "score" : 10
    },
    "LOTUS" : {
      "use" : false,
      "score" : 30
    },
    "FIORA" : {
      "use" : false,
      "score" : 10
    },
    "BLACK" : {
      "use" : false,
      "score" : 20
    },
  };

  var web_judge_array = {
    "twitter" : {
      "use" : false,
      "score" : -5
    },
    "instagram" : {
      "use" : false,
      "score" : 10
    },
    "facebook" : {
      "use" : false,
      "score" : 10
    },
    "cookpad" : {
      "use" : false,
      "score" : 10
    },
    "xvideos" : {
      "use" : false,
      "score" : 50
    },
    "fc2adult" : {
      "use" : false,
      "score" : 50
    },
    "rakuten" : {
      "use" : false,
      "score" : 10
    },
    "github" : {
      "use" : false,
      "score" : 30
    },
    "pbs.twimg" : {
      "use" : false,
      "score" : -5
    },
    "sod" : {
      "use" : false,
      "score" : 30
    },
    "tenga-group" : {
      "use" : false,
      "score" : 50
    },
    "nintendo" : {
      "use" : false,
      "score" : 5
    },
    "youtube" : {
      "use" : false,
      "score" : 10
    },
    "amazon" : {
      "use" : false,
      "score" : 3
    },
  };

  var web_matching_judge_array = {
    "あざらし" : {
      "use" : false,
      "score" : -50
    },
    "彼岸花" : {
      "use" : false,
      "score" : 30
    },
    "NAVERまとめ" : {
      "use" : false,
      "score" : -10
    },
  };

  var score = 0;

  switch (type) {
    case "Label":
      score += contents.length;
      score += contents ? getIncludeScoreLabel(contents, label_judge_array, "description") : 0;
      break;
    case "Face":
      score += contents.length * 5;
      score += contents[0] ? getIncludeScoreFace(contents[0]) : 0;
      break;
    case "Web":
      score += contents.webEntities.length;
      score += contents.fullMatchingImages ? getIncludeScoreWeb(contents.fullMatchingImages, web_judge_array, "url") : 30;
      score += contents.pagesWithMatchingImages ? getIncludeScoreWeb(contents.pagesWithMatchingImages, web_matching_judge_array, "pageTitle") : 0;

      break;
  }
  gaugeSetting(type, String(score));

  return score;
}

//その要素が含まれていたら◯点
function getIncludeScoreLabel(data, judge_array, check_key){
  var get_score = 0;
  console.table(data);
  for (var i = 0; i < data.length; i++) {
    //説明キーが定義されていれば実行する
    if(data[i][check_key] != undefined){
      var search_target = data[i][check_key].toUpperCase();

      //検索して点数加点ループ
      Object.keys(judge_array).forEach(function(key){
        //検出フラグが立ってるか検索対象が見つからなかった場合処理を行わない
        if(judge_array[key]["use"] || search_target.indexOf(key) == -1){
          return;
        }

        //検出フラグを立てる
        judge_array[key]["use"] = true;
        //関連度があればスコアに掛ける なければそのままスコアを加点
        get_score += data[i]["score"] ? data[i]["score"] * judge_array[key]["score"] : judge_array[key]["score"];
        console.log(key + "を発見、" + get_score + "点ゲット");
      });
    }
  }

  return Math.ceil(get_score);
}

//その要素が含まれていたら◯点
function getIncludeScoreFace(data){
  var get_score = 0;
  if(data["angerLikelihood"] == "VERY_LIKELY" ||
     data["angerLikelihood"] == "LIKELY" ||
     data["sorrowLikelihood"] == "VERY_LIKELY" ||
     data["sorrowLikelihood"] == "LIKELY"){
    console.log("怒ってたり悲しんでたりしてるので減点です");
    get_score += -15;
  }
  if(data["joyLikelihood"] == "VERY_LIKELY" ||
     data["joyLikelihood"] == "LIKELY" ||
     data["surpriseLikelihood"] == "VERY_LIKELY" ||
     data["surpriseLikelihood"] == "LIKELY"){
    console.log("喜んでるので点数です");
    get_score += 15;
  }

  return Math.ceil(get_score);
}

//その要素が含まれていたら◯点
function getIncludeScoreWeb(data, judge_array, check_key){
  var get_score = 0;
  console.table(data);
  for (var i = 0; i < data.length; i++) {
    //説明キーが定義されていれば実行する
    if(data[i][check_key] != undefined){
      var search_target = data[i][check_key];

      //検索して点数加点ループ
      Object.keys(judge_array).forEach(function(key){
        //検出フラグが立ってるか検索対象が見つからなかった場合処理を行わない
        if(judge_array[key]["use"] || search_target.indexOf(key) == -1){
          return;
        }
        console.log(key | search_target);
        //検出フラグを立てる
        judge_array[key]["use"] = true;
        //関連度があればスコアに掛ける なければそのままスコアを加点
        get_score += judge_array[key]["score"];
        console.log(key + "を発見、" + get_score + "点ゲット");
      });
    }
  }
  return Math.ceil(get_score);
}

function gaugeSetting(type, percentage){
  $('.width' + type).css('width',  percentage + '%');
  $('.percent' + type).text(percentage + "点");
}
