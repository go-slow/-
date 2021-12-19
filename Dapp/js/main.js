/*=================================================================

Template name: NFT Digital Asset Marketplace HTML Template
Version: 1.0.0
Author: BlackGallery     
Author url: https://themeforest.net/user/blackgallery 


[Table of Content]

01: Hero slider
02: Menu Page Menu Sticky
03: Category Section
04: Feedback Section 
05: live Auctions Section
06: Client Section
07: Collection slider 
08: Gallery and Slider animated
09: Preloader
10: Document Ready 
11: Window Load
12: Window Scroll
 
====================================================================*/
 
 (function($) {
    'use strict';

    /* =======================================
       01: Hero slider
    =======================================*/

    function heroSlider() {
        $(".slider_owl").owlCarousel({
            items: 1,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000, // Default is 5000
            smartSpeed: 1500, // Default is 250
            loop: true,
            navText: ["<i class='fal fa-chevron-left'></i>", "<i class='fal fa-chevron-right'></i>"],
            mouseDrag: true,
            touchDrag: true,
            nav: true,
        });
    }

    // Hero slider home two
     function heroSliderTwo() {
        $("#slider_owl2").owlCarousel({
            items: 4,
            nav: false,
            dots: true,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 5000, // Default is 5000
            smartSpeed: 1500, // Default is 250
            loop: true,
            navText: ["<i class='fal fa-long-arrow-left'></i>", "<i class='fal fa-long-arrow-right'></i>"],
            mouseDrag: true,
            touchDrag: true,
            nav: true,
            center: true,
            responsive: {
                1400: {
                    items: 4
                },
                992: {
                    items: 2
                },
                768: {
                    items: 2
                }, 
                320: {
                    items: 1
                } 
            }
        });
    }
 
    /*-------------------------------------
       02: Menu Page Menu Sticky
    -------------------------------------*/ 

    function stickyHeader() {      
        var scroll = $(window).scrollTop();
        if (scroll > 70)
          $('.menu_wrapper').addClass('menu_sticky');
        else
          $('.menu_wrapper').removeClass('menu_sticky');
    }

    /*=======================================
        03: Category Section  
    =======================================*/
    function achieveCarousel() {
        $("#achieve_cur").owlCarousel({
            autoplayTimeout: 5000, //Set AutoPlay to 5 seconds
            autoplay: true,
            smartSpeed: 2000, // Default is 250
            items: 1,   
            loop: true,
            touchDrag: true,
            mouseDrag: true,
            pagination: false,
            dots: true,
            nav: true,
            navText: ["<i class='arrow_left'></i>", "<i class='arrow_right '></i>"]
        }); 
    }

    /*=======================================
        04: Feedback Section  
    =======================================*/
    function feedbackCarousel() {
        $("#lfeedback_cur").owlCarousel({
            autoplayTimeout: 5000, //Set AutoPlay to 5 seconds
            autoplay: true,
            smartSpeed: 2000, // Default is 250
            items: 1,   
            loop: false,
            touchDrag: true,
            mouseDrag: true,
            pagination: false,
            dots: true,
            nav: false,
            navText: ["<i class='logo-nav-icon'></i>", "<i class='logo-nav-icon'></i>"]
        });    
    }
 
    /*=======================================
        05: live Auctions Section
    =======================================*/
    function liveauctionsCarousel() {
        $("#liveauctions").owlCarousel({
            autoplayTimeout: 5000, //Set AutoPlay to 5 seconds
            autoplay: true,
            smartSpeed: 2000, // Default is 250
            items: 3,   
            margin: 30,
            loop: false,
            touchDrag: true,
            mouseDrag: true,
            pagination: false,
            dots: true,
            nav: false,
            navText: ["<i class='logo-nav-icon'></i>", "<i class='logo-nav-icon'></i>"],
            responsive: {
                1200: {
                    items: 3
                },
                992: {
                    items: 3
                },
                768: {
                    items: 2
                },
                480: {
                    items: 1
                },
                320: {
                    items: 1
                },
                280: {
                    items: 1
                }
            }

        });    
    }

    /*=======================================
        06: Client Section
    =======================================*/

    function clientCarousel() {
        $('#client_carousel').slick({
            centerMode: false,
            centerPadding: '0px',
            slidesToShow: 7,
            slidesToScroll: 2,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 4000,
            prevArrow: '<i class="fal fa-long-arrow-left"></i>',
            nextArrow: '<i class="fal fa-long-arrow-right"></i>',
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 7,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }
            ]
        });  
    }
 
 
    /*=======================================
        07: Collection slider
    =======================================*/

    function collectionCarousel() {
        $('#collection_cur').slick({
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 4000,
            prevArrow: '<i class="fal fa-long-arrow-left"></i>',
            nextArrow: '<i class="fal fa-long-arrow-right"></i>',
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    /*=======================================
        08: Gallery and Slider animated        
    ======================================= */
    function projectClick() { 
        /*  For Gallery  */
        $(".projects-titles li").on('click', function() {
            $(".projects-titles li").removeClass("active");
            $(this).addClass("active");
            var selector = $(this).attr('data-filter');
            $(".projects-list").isotope({
            filter: selector 
            });
        }); 

        /*  slider Section  */
        $(".slider_owl").on("translate.owl.carousel", function () {
            $(".hero_text h2, .hero_text h5, .hero_text p").removeClass("animated fadeInUp").css("opacity", "0");
            $(".hero_text .more-link").removeClass("animated fadeInDown").css("opacity", "0");
        }); 
        $(".slider_owl").on("translated.owl.carousel", function () {
            $(".hero_text h2, .hero_text h5, .hero_text p").addClass("animated fadeInUp").css("opacity", "1");
            $(".hero_text .more-link").addClass("animated fadeInDown").css("opacity", "1");
        }); 
    }

    /*=======================================
        09: Preloader                     
    ======================================= */
    function preloader() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
        $(".slides__preload_wrapper").fadeOut(1500);
        $(".projects-list").isotope();
    }

    /*---------------------
        10: Document Ready 
    ----------------------*/
    $(document).ready(function () { 
        collectionCarousel();
        clientCarousel();
        liveauctionsCarousel();
        feedbackCarousel();
        achieveCarousel();
        heroSlider();
        heroSliderTwo();
        projectClick();
    });
 
    /*------------------
        11: Window Load
    --------------------*/
    $(window).on('load', function () {
        preloader(); 
    });

    /*--------------------
     12: Window Scroll
    ----------------------*/
    $(window).on("scroll", function() {    
        stickyHeader();
     });
 
})(jQuery);