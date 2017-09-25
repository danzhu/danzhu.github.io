$(document).ready(function () {
    // Greet based on time of day
    var hour = new Date().getHours();
    var greet = 'Hi.';
    if (hour < 5) {
        // use default
    } else if (hour < 13) {
        greet = 'Good morning.';
    } else if (hour < 17) {
        greet = 'Good afternoon.';
    } else if (hour < 21) {
        greet = 'Good evening.';
    }
    $('#greetings').text(greet);

    // Animation based on scrolling position
    $(window).scroll(function () {
        var windowPos = $(window).scrollTop() + $(window).height();
        $('div[data-animation]').each(function () {
            var itemPos = $(this).offset().top;
            if (windowPos < itemPos + 50)
                return;
            $(this).addClass('animated ' + $(this).data('animation')).removeAttr('data-animation');
        });
    });

    // Smooth link scrolling
    $('a').smoothScroll();

    // Update navbar on scrolling
    $('body').scrollspy({
        target: '.navbar-fixed-top'
    });

    // Load projects using GitHub API
    $.ajax('https://api.github.com/users/danzhu/repos').then(function (data) {
        $('#projectLoading').hide();

        var menu = $('#projectMenu');
        var list = $('#projectList');
        menu.append(
            $('<li/>', { 'role': 'separator', 'class': 'divider' })
        );
        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            // Add project to menu
            menu.append(
                $('<li/>').append(
                    $('<a/>', { 'href': item.html_url }).text(item.name)
                )
            );

            // Use clearfix to clear project list
            // so different heights won't be a problem
            if (i % 2 === 0 && i !== 0) {
                list.append($('<div/>', { 'class': 'clearfix visible-sm-block' }));
            }
            if (i % 3 === 0 && i !== 0) {
                list.append($('<div/>', { 'class': 'clearfix visible-md-block visible-lg-block' }));
            }

            // Add project to project list
            list.append(
                $('<div/>', { 'class': 'col-sm-6 col-md-4', 'data-animation': 'fadeInDown' }).append(
                    $('<h3/>').append(
                        $('<a/>', { 'href': item.html_url }).text(item.name),
                        $('<br/>'),
                        $('<small/>').text(item.language)
                    ),
                    $('<p/>').text(item.description)
                )
            );
            $('#projectLoaded').show();
        }
    }, function () {
        $('#projectLoading').hide();
        $('#projectFailed').show();
    });
});
