$(document).ready(function () {

    //Таймер обратного отсчета
    //Документация: http://keith-wood.name/countdown.html
    //<div class="countdown" date-time="2015-01-07"></div>
    var austDay = new Date($(".countdown").attr("date-time"));
    $(".countdown").countdown({
        until: austDay,
        format: 'yowdHMS'
    });

    //Попап менеджер FancyBox
    //Документация: http://fancybox.net/howto
    //<a class="fancybox"><img src="image.jpg" /></a>
    //<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
    $(".fancybox").fancybox();

    //Навигация по Landing Page
    //$(".top_mnu") - это верхняя панель со ссылками.
    //Ссылки вида <a href="#contacts">Контакты</a>
    $(".top_mnu").navigation();

    //Добавляет классы дочерним блокам .block для анимации
    //Документация: http://imakewebthings.com/jquery-waypoints/
    $(".block").waypoint(function (direction) {
        if (direction === "down") {
            $(".class").addClass("active");
        } else if (direction === "up") {
            $(".class").removeClass("deactive");
        };
    }, {
        offset: 100
    });

    //Плавный скролл до блока .div по клику на .scroll
    //Документация: https://github.com/flesler/jquery.scrollTo
    $("a.scroll").click(function () {
        $.scrollTo($(".div"), 800, {
            offset: -90
        });
    });

    //Каруселька
    //Документация: http://owlgraphic.com/owlcarousel/
    var owl = $(".carousel");
    owl.owlCarousel({
        items: 4
    });
    owl.on("mousewheel", ".owl-wrapper", function (e) {
        if (e.deltaY > 0) {
            owl.trigger("owl.prev");
        } else {
            owl.trigger("owl.next");
        }
        e.preventDefault();
    });
    $(".next_button").click(function () {
        owl.trigger("owl.next");
    });
    $(".prev_button").click(function () {
        owl.trigger("owl.prev");
    });

    //Кнопка "Наверх"
    //Документация:
    //http://api.jquery.com/scrolltop/
    //http://api.jquery.com/animate/
    $("#top").click(function () {
        $("body, html").animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    //Аякс отправка форм
    //Документация: http://api.jquery.com/jquery.ajax/
    $("form").submit(function () {
        $.ajax({
            type: "GET",
            url: "mail.php",
            data: $("form").serialize()
        }).done(function () {
            alert("Спасибо за заявку!");
            setTimeout(function () {
                $.fancybox.close();
            }, 1000);
        });
        return false;
    });

});

//Кнопка плюс минус, поп-ап, карта
$(document).ready(function () {
    function e() {
        var e = {
                center: n,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            o = new google.maps.Map(document.getElementById("googleMap"), e),
            l = new google.maps.Marker({
                position: n,
                icon: "images/google-map__icon.png"
            });
        l.setMap(o);
        var a = new google.maps.InfoWindow({
            content: "<p>Welcome to Sedona!</p>"
        });
        google.maps.event.addListener(l, "click", function () {
            a.open(o, l)
        })
    }
    $(".order__btn-search").click(function (e) {
        e.preventDefault(), $(this).toggleClass("order__btn-search--active"), $(".order__popup").slideToggle(500)
    });
    var o = /(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d/;
    $(".order__field-in, .order__field-out").blur(function (e) {
        var l = $(this).val();
        "" === l ? ($(this).val($(this).attr("value")), $(this).css({
            border: "1px solid #F2F2F2"
        })) : $(this).css(-1 != l.search(o) ? {
            border: "1px solid #3bea38"
        } : {
            border: "1px solid red"
        })
    });
    var l = $(".order__field-people--adult"),
        a = $(".order__field-people--child");
    $("#minus-adult").click(function (e) {
        l.val() > 0 && l.val(+l.val() - 1)
    }), $("#plus-adult").click(function (e) {
        l.val() >= 0 && l.val() < 99 ? l.val(+l.val() + 1) : l.val() >= 100 && l.val(99)
    }), $("#minus-child").click(function (e) {
        a.val() > 0 && a.val(+a.val() - 1)
    }), $("#plus-child").click(function (e) {
        a.val() >= 0 && a.val() < 99 ? a.val(+a.val() + 1) : a.val() >= 100 && a.val(99)
    });
    var n = new google.maps.LatLng(34.869946, -111.761156);
    google.maps.event.addDomListener(window, "load", e)
});