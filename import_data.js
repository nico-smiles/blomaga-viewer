const regEmoji = new RegExp(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/, 'g');

$(function(){
  var title = document.title;
  $('#maker_header h1').text(title);

  
  $("#html_input_submit").on('click', function() {

    var file = $("#html_input").get(0).files[0];
    
    var filereader = new FileReader();
    filereader.addEventListener('load',function(e) {
      var src = e.target.result;
      src = src.replace(regEmoji, "blomaga-ng-word-Emoji");

      var is_str_script = src.indexOf("<script");

      var arr_str_ng = [];
      if(src.indexOf("<style")){ arr_str_ng.push("styleタグは利用できません") };
      if(src.indexOf("<h1") || src.indexOf("<h2") || src.indexOf("<h3") || src.indexOf("<h4") || src.indexOf("<h5") || src.indexOf("<h6")){ arr_str_ng.push("見出しタグは利用できません") };
      if(src.indexOf("blomaga-ng-word-Emoji")){ arr_str_ng.push("Unicode絵文字は利用できません") };

      src = src.replace("blomaga-ng-word-Emoji", " :Emoji: ");


      if(is_str_script !== -1){
        if(!confirm('ソースにscriptタグが含まれています。スクリプトが実行されてしまうかもしれませんが、本当に実行しますか？')){
          $("article.blomaga").text("ファイルの読み込みをキャンセルしました");
          return false;
        }else{
          $("article.blomaga").html(src);
        }
      }else{
        $("article.blomaga").html(src);
      }

      if(arr_str_ng.length){
        arr_str_ng.forEach(element => {
          $(".error_area").append("<p>"+ element +"</p>");
        });
      }
    });
    
    if(!file){
      alert("ファイルが設定されていません");
    }else{
      $("article.blomaga").text("読込中です");
      $(".close-modal").click();
      filereader.readAsText(file);
    }
  });

});