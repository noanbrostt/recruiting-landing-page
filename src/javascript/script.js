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
        this.value = this.value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ ]/g,'');
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

    // Check requisito
    $('.card').on('click', function() {
        $(this).find('.toggle').toggleClass('active');
        $(this).find('.toggle').parent().find('i').toggleClass('color-p5');
    })



    function deviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) || /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)){
            $('.card').appear(function() {
                setTimeout(() => {
                    $(this).find('.toggle').addClass('active');
                    $(this).find('.toggle').parent().find('i').addClass('color-p5');
                }, 800);
            });
        } else {
            $('.card').one('mouseover', function() {
                setTimeout(() => {
                    $(this).find('.toggle').addClass('active');
                    $(this).find('.toggle').parent().find('i').addClass('color-p5');
                }, 600);
            });
            return "desktop";
        }
    };
    deviceType();

    ScrollReveal().reveal('#contratacao-img', {
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
        const estaNoPeriodoDias = diaDaSemana >= 1 && diaDaSemana <= 5;
    
        // Verifique se a hora atual está entre 8h e 18h
        const estaNoPeriodoHoras = horaAtual >= 8 && horaAtual <= 16;
    
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

    $('input[name="site-value"]').on('change', function() {
        if ($('input[name="site-value"]:checked').val() == 'colombo') {
            // $('#sobre-left img').attr('src', './src/images/plansul-colombo.jpg');
            $('#contato h2').html('Plansul Colombo');
            $('.informacoesRight .telefone p').html('(41) 3087-2560');
            $('.informacoesRight .whats p').html('(41) 99143-0950');
            $('.informacoesRight .whats a').attr('href', 'https://wa.me//5541991430950?text=Olá, estou entrando em contato por conta da vaga de emprego.');
            $('.informacoesRight .endereco p').html('Estr. Da Ribeira - Br-476, 3001 - Guarani, Colombo - PR, 83408-460');
            $('#contato .map').hide();
            $('#contato .map.map-colombo').show();
            $('#contratacao-continuacao').show();

        } else if ($('input[name="site-value"]:checked').val() == 'curitiba') {
            // $('#sobre-left img').attr('src', './src/images/plansul-curitiba.webp');
            $('#contato h2').html('Plansul Curitiba');
            $('.informacoesRight .telefone p').html('(41) 3087-2542');
            $('.informacoesRight .whats p').html('(41) 3087-2545');
            $('.informacoesRight .whats a').attr('href', 'https://wa.me//554130872545?text=Olá, estou entrando em contato por conta da vaga de emprego.');
            $('.informacoesRight .endereco p').html('R. Francisco Derosso, 108 - Xaxim, Curitiba - PR, 81710-000');
            $('#contato .map').hide();
            $('#contato .map.map-curitiba').show();
            $('#contratacao-continuacao').hide();
        }
    })

    // Checando se o usuário preencheu todas as informações
    $('#btn-contratacao').on('click', function() {
        // Validação inputs
        if (!$('#check1-61').is(':checked')) {
            triggerSweetAlert('warning', 'Aceite os Termos e Condições');
            return;
        }

        var nome = $('#input_nome').val().trim().replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ ]/gi,'');
        if (nome.length == 0) {
            triggerSweetAlert('warning', 'Informe seu Nome Completo');
            return;
        }

        var telefone = $('#input_whats').val().trim().replace(/[^0-9]/gi, '');
        if (telefone.length == 0) {
            triggerSweetAlert('warning', 'Informe seu Whatsapp');
            return;
        } else if (telefone.length < 10) {
            triggerSweetAlert('warning', 'Informe um Whatsapp válido');
            return;
        }


        var contrato = $('input[name="site-value"]:checked').val();
        if (contrato == 'colombo') {
            contrato = 1;

        } else if (contrato == 'curitiba') {
            contrato = 2;
        }

        // Caso todos os campos sejam validados
        $.ajax({
            url: '../site-plansul-api/index.php?nome='+nome+'&telefone='+telefone+'&contrato='+contrato+'&origem=1',
            type: 'POST',
            dataType: 'json',

            })
            .done(function() {
                
            })
            .fail(function(result) {
                console.log(result);
            })
            .always(function(result) {

                if (result == "Registro inserido com sucesso!") {
                    Swal.fire({
                            title: "Obrigado!",
                            text: "Você foi pré selecionado, pode comparecer no endereço "+$('.informacoesRight .endereco p').html(),
                            icon: "success"
                    }).then(() => {
                        if ($('input[name="site-value"]:checked').val() == 'colombo') {
                            window.open('https://wa.me//5541991430950?text=Olá, estou entrando em contato por conta da vaga de emprego, meu nome é '+nome+'.');
                
                        } else if ($('input[name="site-value"]:checked').val() == 'curitiba') {
                            window.open('https://wa.me//554130872545?text=Olá, estou entrando em contato por conta da vaga de emprego, meu nome é '+nome+'.');
                        }
                    });

                    $('#check1-61').prop('checked', false);
                    $('#input_nome').val('');
                    $('#input_whats').val('');
                }
            });

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

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    $('#ano-atual').html(anoAtual);
});