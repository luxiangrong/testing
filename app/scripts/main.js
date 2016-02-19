jQuery(function($) {
    //初始化icheck插件, 试题测试页面
    $('.swiper-container-ceshi input').iCheck({
        checkboxClass: 'icheckbox_square-orange',
        radioClass: 'iradio_square-orange',
        increaseArea: '20%' // optional
    });

    //复习页面，普通选项的样式
    $('.swiper-container-fuxi .normal input').iCheck({
        checkboxClass: 'icheckbox_square-orange',
        radioClass: 'iradio_square-orange',
        increaseArea: '20%' // optional
    });

    //复习页面，正确选项的样式
    $('.swiper-container-fuxi .correct input').each(function() {
        var self = $(this),
            label = self.next(),
            label_text = label.text();
        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-green',
            radioClass: 'iradio_line-green',
            insert: '<div class="icheck_line-icon"></div>' + label_text
        });
    });

    //复习页面，错误选项的样式
    $('.swiper-container-fuxi .incorrect input').each(function() {
        var self = $(this),
            label = self.next(),
            label_text = label.text();
        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-red',
            radioClass: 'iradio_line-red',
            insert: '<div class="icheck_line-icon"></div>' + label_text
        });
    });


    //同步试题索引和当前试题的现实
    var syncQuestionIndex = function() {
        var answeredQuestion = 0;
        $('.swiper-container-ceshi .swiper-slide').each(function(index, item) {
            if ($(item).find(':checked').length > 0) {
                answeredQuestion++;
                var index = $(item).index();
                $('.btn-index[data-index="' + (index + 1) + '"]').removeClass('btn-default');
                $('.btn-index[data-index="' + (index + 1) + '"]').addClass('btn-warning');
            } else {
                $('.btn-index[data-index="' + (index + 1) + '"]').addClass('btn-default');
                $('.btn-index[data-index="' + (index + 1) + '"]').removeClass('btn-warning');
            }
        });
        if (answeredQuestion >= 30) {
            $('.btn-next').text('提交');
        }
    };

    //选择了每个答题项后，需要同步
    $('input').on('ifChanged', function(event) {
        syncQuestionIndex();
    });

    //初始化试题滚动插件
    var questionSwiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        autoHeight: true,
        onInit: function(swiper) {
            syncQuestionIndex();
        },
        onSlideChangeStart: function(swiper) {
            syncQuestionIndex();
        }
    });

    //点击试题索引
    $('.question-index .btn-index').on('click', function(e) {
        e.preventDefault();
        var index = parseInt($(this).text());
        questionSwiper.slideTo(index - 1);
    });

    //点击下一题
    $('.btn-next').on('click', function(e) {
        e.preventDefault();
        questionSwiper.slideNext();
    });
});
