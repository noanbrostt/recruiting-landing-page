$(document).ready(function() {
    $('#input_whats').mask('(00) 00000-0000');

    // Inicio menu responsivo
    $('#mobile-btn').on('click', function () {
        $('#mobile-menu').show();
        
        setTimeout(() => {
            $('#mobile-btn').toggleClass('active');
            $('#mobile-menu').toggleClass('active');
        }, 20);

        setTimeout(() => {
            $('#mobile-menu:not(".active")').hide();
        }, 300);
    });
  
    $('#mobile-menu').on('click', function () {
        $('#mobile-btn').removeClass('active');
        $('#mobile-menu').removeClass('active');

        setTimeout(() => {
            $('#mobile-menu:not(".active")').hide();
        }, 300);
    });
    // Fim menu responsivo

    // Check requisito
    $('.toggle').on('click', function() {
        $(this).toggleClass('active');
        $(this).parent().find('i').toggleClass('color-p5');
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
            const sectionBottom = sectionTop + section.outerHeight();

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

    $('.card').appear(function() {
        setTimeout(() => {
            $(this).find('.toggle').click();
        }, 1200);
    });

    ScrollReveal().reveal('#sobre-right', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.card', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#contratacao-img', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });
    
    ScrollReveal().reveal('.informacoesLeft', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });

    ScrollReveal().reveal('.informacoesRight', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });

    // Inicio Check se está no período de funcionamento
    function estaNoPeriodoDesejado() {
        const agora = new Date();
        const diaDaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, 2 = Terça, ..., 6 = Sábado
        const horaAtual = agora.getHours();
    
        // Verifique se hoje é um dia entre segunda-feira (1) e domingo (0)
        const estaNoPeriodoDias = diaDaSemana >= 1 && diaDaSemana <= 6;
    
        // Verifique se a hora atual está entre 8h e 18h
        const estaNoPeriodoHoras = horaAtual >= 8 && horaAtual <= 17;
    
        if (estaNoPeriodoDias && estaNoPeriodoHoras) {
            $('.aberto').show();
            $('.fechado').hide();
            $('.fa-paper-plane').parent().show();
        } else {
            $('.fechado').show();
            $('.aberto').hide();
            $('.fa-paper-plane').parent().hide();
        }
    
        return;
    }
    
    function fechadoPulse() {
        $('.fechado').addClass('pulse');
        setTimeout(() => {
        $('.fechado').removeClass('pulse');
        }, 3000);
    }
    
    setInterval(() => {
        estaNoPeriodoDesejado();
    }, 60*1000);
    
    estaNoPeriodoDesejado();
    // Fim Check

    $('a').on('click', function() {
        setTimeout(function(){
            history.replaceState("", document.title, window.location.pathname);
        }, 1);
    })

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    $('#ano-atual').html(anoAtual);
});