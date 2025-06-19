jQuery(function($) {

    // ================================
    // BLOQUE 5: VALIDACIÓN Y ESTADO BOTÓN "REALIZAR EL PEDIDO"
    // ================================

    /**
     * Función para actualizar la visibilidad y estado del botón "Realizar el pedido"
     **/
    window.updatePlaceOrderButtonVisibility = function() {
        var requiredFields = [
            '#billing_email',
            '#billing_first_name',
            '#billing_last_name',
            '#billing_phone',
            '#billing_rut',
            '#shipping_dc',
            '#shipping_numero_ubi',
            '.shipping_state_box',
            '.shipping_city_box'
        ];
    
        var allValid = true;
        var $firstInvalid = null;
    
        requiredFields.forEach(function(selector) {
            var $field = $(selector);
            if ($field.length && !$field.hasClass('campo-valido')) {
                if (!$firstInvalid) {
                    $firstInvalid = $field.first();
                }
                allValid = false;
            } else {
                $field.removeClass('campo-invalido');
            }
        });
    
        const $button = $('#place_order');
    
        if (allValid) {
            $button
                .attr('data-disabled', 'false')
                .removeClass('disabled')
                .addClass('enabled')
                .css({
                    display: 'block',
                    'background-color': '#116FBF',
                    cursor: 'pointer',
                    opacity: '1'
                })
                .removeAttr('disabled');
            $button.find('.btn-icon').remove();
            $button.find('.btn-text').show();
        } else {
            $button
                .attr('data-disabled', 'true')
                .removeClass('enabled')
                .addClass('disabled')
                .css({
                    display: 'block',
                    'background-color': '#36B0E6',
                    cursor: 'not-allowed',
                    opacity: '0.7'
                })
                .removeAttr('disabled');
    
            $button
                .off('click.scrollToFirstInvalid')
                .on('click.scrollToFirstInvalid', function(e) {
                    if ($(this).attr('data-disabled') === 'true') {
                        e.preventDefault();
                        if ($firstInvalid && $firstInvalid.length) {
                            // Si es un div/contenedor, busca el primer input/select dentro
                            var $target = $firstInvalid;
                            if (!$target.is(':input')) {
                                $target = $target.find(':input').first();
                            }
                            // Hace scroll suave al campo con error
                            $target[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                            // Opcional: enfoca el campo
                            setTimeout(function() {
                                $target.focus();
                            }, 400);
                        } else {
                            // fallback: scroll al top
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }
                });
        }
    }

    // Asignar clases iniciales campo-valido/invalido a los Select2 de Región/Comuna tras delay
    setTimeout(function () {
        $('#shipping_state_field .select2-selection--single').addClass('shipping_state_box');
    }, 300);
    setTimeout(function () {
        $('#shipping_city_field .select2-selection--single').addClass('shipping_city_box');
    }, 300);

    // Validación de campos con eventos
    var requiredFields = [
        '#billing_email',
        '#billing_first_name',
        '#billing_last_name',
        '#billing_phone',
        '#billing_rut',
        '#shipping_dc',
        '#shipping_numero_ubi',
        '.shipping_state_box',
        '.shipping_city_box'
    ];

    $(document).on('input change', requiredFields.join(', '), function() {
        validateField($(this));
        updatePlaceOrderButtonVisibility();
    });

    // Región
    $(document).on('change select2:select', '#shipping_state', function () {
        var selectedVal = $(this).val();
        if (selectedVal && selectedVal.trim().length > 0) {
            $('.shipping_state_box').removeClass('campo-invalido').addClass('campo-valido');
        } else {
            $('.shipping_state_box').removeClass('campo-valido').addClass('campo-invalido');
        }
        updatePlaceOrderButtonVisibility();
    });

    // Comuna
    $(document).on('select2:select change', '#shipping_city', function () {
        var $select2Container = $(this).data('select2') ? $(this).data('select2').$selection : null;
        if ($select2Container) {
            if (!$select2Container.hasClass('shipping_city_box')) {
                $select2Container.addClass('shipping_city_box');
            }
            var selectedVal = $(this).val();
            if (selectedVal && selectedVal.trim().length > 0) {
                $select2Container.removeClass('campo-invalido').addClass('campo-valido');
            } else {
                $select2Container.removeClass('campo-valido').addClass('campo-invalido');
            }
        }
        updatePlaceOrderButtonVisibility();
    });

    // Inicializar el estado del botón al cargar
    updatePlaceOrderButtonVisibility();

    // Observer para actualizar el estado del botón ante cambios en el DOM.
    const observer = new MutationObserver(() => {
        updatePlaceOrderButtonVisibility();
    });
    const targetNode = document.querySelector('.woocommerce-checkout');
    if (targetNode) {
        observer.observe(targetNode, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // Captura el clic en el botón "Realizar el pedido"
    $('.woocommerce-checkout').on('click', '#place_order', function(e) {
        if ($(this).attr('data-disabled') === 'true') {
            requiredFields.forEach(function(selector) {
                var $field = $(selector);
                if ($field.length && !$field.hasClass('campo-valido')) {
                    $field.addClass('campo-invalido');
                }
            });
            e.preventDefault();
        }
    });

    // --- Función de validación genérica para campos (requerido por los eventos)
    function validateField($field) {
        // Select2 Región
        if ($field.hasClass('shipping_state_box')) {
            var value = $('#shipping_state').val();
            if (value && value.trim().length > 0) {
                $field.addClass('campo-valido').removeClass('campo-invalido');
            } else {
                $field.removeClass('campo-valido').addClass('campo-invalido');
            }
            return;
        }
        // Select2 Comuna
        if ($field.hasClass('shipping_city_box')) {
            var value = $('#shipping_city').val();
            if (value && value.trim().length > 0) {
                $field.addClass('campo-valido').removeClass('campo-invalido');
            } else {
                $field.removeClass('campo-valido').addClass('campo-invalido');
            }
            return;
        }
        // Otros campos
        var value = $field.val();
        if (value && value.trim().length >= 1) {
            $field.addClass('campo-valido').removeClass('campo-invalido');
        } else {
            $field.removeClass('campo-valido').addClass('campo-invalido');
        }
    }

    // Observer para campo comuna select2 (por si cambia por AJAX)
    $(document).ready(function() {
        var cityRendered = document.getElementById('select2-shipping_city-container');
        if (cityRendered) {
            const observerCity = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    var title = cityRendered.getAttribute('title');
                    if (title && title.trim() !== "" && title.trim().toLowerCase() !== "selecciona una comuna…" && title.trim().toLowerCase() !== "seleciona una comuna…") {
                        $(cityRendered).closest('.select2-selection').removeClass('campo-invalido').addClass('campo-valido');
                    } else {
                        $(cityRendered).closest('.select2-selection').removeClass('campo-valido').addClass('campo-invalido');
                    }
                    updatePlaceOrderButtonVisibility();
                });
            });
            observerCity.observe(cityRendered, { attributes: true, attributeFilter: ['title'] });
        }
    });

});