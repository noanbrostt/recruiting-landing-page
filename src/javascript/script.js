$(document).ready(function() {
    // Inicio menu responsivo
    $('#mobile-btn').on('click', function () {
        $('#mobile-btn').toggleClass('active');
        $('#mobile-menu').toggleClass('active');
    });
  
    $('#mobile-menu').on('click', function () {
        $('#mobile-btn').removeClass('active');
        $('#mobile-menu').removeClass('active');
    });
    // Fim menu responsivo

    // Check requisito
    $('.toggle').on('click', function() {
        $(this).toggleClass('active');
        $(this).parent().find('i').toggleClass('color-p5');

        if ($('.toggle').length == $('.toggle.active').length) {
            // Mostra
            $('#contratacao_content .section-subtitle').html('Deixe seu nome e whatsapp que entraremos em contato!');
            $('#contratacao_content .form').css({'display': 'flex'});
            $('#btn-contratacao').show();
            $('#btn-checar').hide();
        } else {
            // esconde
            $('#contratacao_content .section-subtitle').html('É preciso possuir todos os requisitos para continuar..');
            $('#contratacao_content .form').hide();
            $('#btn-contratacao').hide();
            $('#btn-checar').show();
        }
    })

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.card', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    $('#ano-atual').html(anoAtual);
});