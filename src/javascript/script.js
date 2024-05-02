$(document).ready(function() {
    // Input Masks
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };

    $('#input_nome').keyup(function () { 
        this.value = this.value.replace(/[^a-zA-Z ]/g,'');
    });
    $('#input_whats').mask(SPMaskBehavior, spOptions);

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

    $('.card').appear(function() {
        setTimeout(() => {
            $(this).find('.toggle').click();
        }, 1200);
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

    // Checando se o usuário preencheu todas as informações
    $('#btn-contratacao').on('click', function() {
        // Validação inputs
        if (!$('#check1-61').is(':checked')) {
            triggerSweetAlert('warning', 'Aceite os Termos e Condições');
            return;
        }

        var nome = $('#input_nome').val().trim();
        if (nome.length == 0) {
            triggerSweetAlert('warning', 'Informe seu Nome Completo');
            return;
        }

        var telefone = $('#input_whats').val().trim();
        if (telefone.length == 0) {
            triggerSweetAlert('warning', 'Informe seu Whatsapp');
            return;

        } else if (telefone.length < 14) {
            triggerSweetAlert('warning', 'Informe um Whatsapp válido');
            return;
        }

        // Caso todos os campos sejam validados

        Swal.fire({
            title: "Obrigado!",
            text: "Mandaremos mensagem assim que possível!",
            icon: "success"
        });

        $('#check1-61').prop('checked', false);
        $('#input_nome').val('');
        $('#input_whats').val('');

        // var link = "https://servicodados.ibge.gov.br/api/v1/pesquisas/" + valor1;
        // $.ajax({
        //     url: link,
        //     type: 'GET',
        //     dataType: 'json',

        //     })
        //     .done(function() {
        //         console.log("success");
        //         console.log(valor1);
        //         document.getElementById("demo").innerHTML = valor1;
        //     })
        //     .fail(function() {
        //         console.log("error");
        //     })
        //     .always(function() {
        //         console.log("complete");
        //     });
    })

    function triggerSweetAlert(icon, title) {
        Swal.fire({
            toast: true,
            timerProgressBar: true,
            width: 'fit-content',
            position: "top-end",
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: 2000
        });
    }

    $('.btn-documentos').on('click', function() {

    })

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    $('#ano-atual').html(anoAtual);
});