$(function(){
  var title = document.title;
  $('#maker_header h1').text(title);

  
  $("#html_input_submit").on('click', function() {

    var file = $("#html_input").get(0).files[0];
    
    var filereader = new FileReader();
    filereader.addEventListener('load',function(e) {
      var src = e.target.result;

      var is_str_script = src.indexOf("script");

      if(is_str_script !== -1){
        if(!confirm('ソースにscriptタグが含まれています。スクリプトが実行されてしまうかもしれませんが、本当に実行しますか？')){
          return false;
        }else{
          $("article.blomaga").html(src);
        }
      }else{
        $("article.blomaga").html(src);
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