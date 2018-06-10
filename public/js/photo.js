$(function() {
  $(document).ready( function(){
  });

  // アップロードするファイルを選択
  $('input[type=file]').change(function() {
    //画像を一旦消去
    $('.contentBoxImage').html("");
    $('.resultArea').fadeOut(600);
    //エラーメッセージ初期化

    var file = $(this).prop('files')[0];

    // 画像表示
    var reader = new FileReader();
    reader.onload = function() {
      var img_src = $('<img class="inputImg">').attr('src', reader.result);

      $(".contentBoxImage").html(img_src);
    }
    reader.readAsDataURL(file);

    //4MB以上の場合Cloud Visionを叩けないので終了
    if(this.files[0].size > 4194304){
      $('.contentBoxImage').html("");
      //TODO エラーメッセージ出す
      alert("4MB以上です");
      return;
    }
    $('.fadeArea').fadeIn(600);
    $('.loadingArea').html("<img src='./img/loading_blue.gif'/>");
    exeCloudVision();
  });

});
