$(document).ready(function() {
    var loadbutton = $('#journal-loadmore');
    var loadtext = loadbutton.text();
	var url = $('.journal-arrow.ja-forward').attr("href");
    $('#journal-arrows-cont').hide();
    HideIfNoMorePosts();
    function HideIfNoMorePosts() {
        if (url == undefined || url.length == 0) {
            loadbutton.remove();
        } else {
            loadbutton.show();
        }
    }
    loadbutton.click(function() {
        moreposts();
    });
    function moreposts() {
		var next_url = url;
		if (loadbutton.text() != loadtext) return;
        loadbutton.empty().append('Loading...');
		$.get(next_url, function(data,status){
			var articles = $(data).find('#journal-articles-block').children();
            $('<span></span>').appendTo('#journal-articles-block').hide().append(articles).fadeIn(500);
			url = $(data).find('.journal-arrow.ja-forward').attr("href");
            loadbutton.empty().append(loadtext);
			HideIfNoMorePosts();
		});
        HideIfNoMorePosts();
    }
});