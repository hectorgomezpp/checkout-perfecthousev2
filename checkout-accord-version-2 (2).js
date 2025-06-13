jQuery(document).ready(function($) {

    $('input[name="shipping_dc"], select[name="shipping_dc"]').val('');
    
    $("#additional_correo_factura").val($("#billing_email").val());
    $("#additional_telefono_factura").val($("#billing_phone").val()); 
    
    
function replaceWebpay() {
  $('.metodoPagoLuis').remove(); 

  var $orig = $('.wc_payment_method.payment_method_transbank_webpay_plus_rest');
  $orig.show();

  if (!$orig.length) return;

  const html = '\
    <div class="metodoPagoLuis">\
      <img src="https://perfecthouse.cl/wp-content/uploads/2025/04/iconosdepago.webp" \
           alt="Métodos de pago" class="imagen-webpay" \
           style="margin:10px auto 0;max-width:100%;display:block;">\
    </div>';

  $orig.hide();
  $('#couponFormLuis').after(html); // Inserta después del div deseado
}

replaceWebpay();

// Tras cada recarga AJAX de checkout
jQuery(document.body).on('updated_checkout', function() {
  setTimeout(replaceWebpay, 100);
});



  
    
    // Se inyecta el HTML del modal solo si aún no existe
    if ($('#facturaModal').length === 0) {
      $('body').append(`
      <div id="overlayModal" class=""></div>
        <div id="facturaModal" class="factura-modal">
          <div class="factura-modal-content">
            <span id="modalClose" class="modal-close">&times;</span>
            <div class="css-pp5wq7"><svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Group 294"><g id="Group"><g id="Group_2"><path id="Vector" d="M15.4561 1.04312C15.1046 0.881243 14.6905 0.944186 14.403 1.20313L13.0382 2.41158L11.1814 0.750638C10.8084 0.416454 10.2436 0.416454 9.8706 0.750638L8.01533 2.41L6.15961 0.750638C5.78648 0.416454 5.22167 0.416454 4.84855 0.750638L2.99126 2.41158L1.62521 1.20318C1.22214 0.844904 0.604908 0.881243 0.246629 1.28432C0.0862248 1.46479 -0.00164848 1.69831 2.3426e-05 1.93976V20.0602C-0.00317286 20.6003 0.432063 21.0407 0.972137 21.0439C1.21363 21.0453 1.44715 20.9573 1.62767 20.7969L2.99244 19.5884L4.84923 21.2494C5.22227 21.5835 5.78702 21.5835 6.16006 21.2494L8.01533 19.5898L9.8709 21.2492C10.244 21.5833 10.8088 21.5833 11.182 21.2492L13.0393 19.5883L14.4053 20.7967C14.8083 21.155 15.4256 21.1189 15.7839 20.7158C15.9444 20.5353 16.0323 20.3016 16.0306 20.06V1.93976C16.0355 1.55291 15.8095 1.20033 15.4561 1.04312ZM13.6888 18.8517C13.3157 18.5212 12.7541 18.5226 12.3828 18.8551L10.5261 20.516L8.67076 18.8567C8.29768 18.5225 7.73287 18.5225 7.35979 18.8567L5.50428 20.516L3.64674 18.8551C3.27686 18.5227 2.71628 18.5212 2.34457 18.8516L0.983496 20.0597V17.4385L0.978579 1.94L2.34187 3.14815C2.71495 3.47864 3.27651 3.47717 3.64782 3.14466L5.50457 1.48377L7.35989 3.14313C7.73297 3.47732 8.29778 3.47732 8.67086 3.14313L10.5264 1.48377L12.3839 3.14466C12.7538 3.47712 13.3144 3.47864 13.6861 3.1482L15.0472 1.93976V14.396L15.0521 20.0598L13.6888 18.8517Z" fill="#495867"></path></g></g><g id="Group_3"><g id="Group_4"><path id="Vector_2" d="M12.6777 10.5083H3.35502C3.08343 10.5083 2.86328 10.7285 2.86328 11C2.86328 11.2716 3.08343 11.4918 3.35502 11.4918H12.6777C12.9492 11.4918 13.1694 11.2716 13.1694 11C13.1694 10.7285 12.9492 10.5083 12.6777 10.5083Z" fill="#495867"></path></g></g><g id="Group_5"><g id="Group_6"><path id="Vector_3" d="M8.25202 7.55762H3.35502C3.08343 7.55762 2.86328 7.77777 2.86328 8.04935C2.86328 8.32094 3.08343 8.54109 3.35502 8.54109H8.25202C8.52361 8.54109 8.74376 8.32094 8.74376 8.04935C8.74376 7.77777 8.52356 7.55762 8.25202 7.55762Z" fill="#495867"></path></g></g><g id="Group_7"><g id="Group_8"><path id="Vector_4" d="M12.6777 13.4587H3.35502C3.08343 13.4587 2.86328 13.6789 2.86328 13.9505C2.86328 14.2221 3.08343 14.4422 3.35502 14.4422H12.6777C12.9492 14.4422 13.1694 14.2221 13.1694 13.9505C13.1694 13.6789 12.9492 13.4587 12.6777 13.4587Z" fill="#495867"></path></g></g></g></svg><span class="datFact">Datos de Facturación</span></div>
            <div class="woocommerce-additional-fields">
                    <div id="facturaFieldsModal">
                      <!-- div con campos de facturación -->
                    </div>
            </div>
          </div>
        </div>
      `);
    }
    



$('#additional_razon_social_field, #additional_giro_field, #additional_rut_factura_field, #additional_telefono_factura_field, #additional_direccion_factura_field, #additional_ciudad_field, #additional_comuna_field, #additional_correo_factura_field')
  .appendTo('#facturaFieldsModal');
  
  
  
$(document).on('click', '.btnGuar', function() {
  setTimeout(function() {
    $('#facturaModal').removeClass('active');
    $('#overlayModal').removeClass('overlayModal');
  }, 500);
});

 
 
$(document).on('click', '.btn-edit', function() {
  $('#facturaModal').addClass('active');
  $('#overlayModal').addClass('overlayModal');
});

 

$(document).on('click', '#cerrarFacturacion', function() {
  $('#facturaModal').removeClass('active');
  $('#overlayModal').removeClass('overlayModal');
});
  
  
  

$(document).on('click', '#modalClose', function() {
  $('#facturaModal').removeClass('active');
  $('#overlayModal').removeClass('overlayModal');
});


$(document).on('click', '#overlayModal', function() {
  $('#facturaModal').removeClass('active');
  $('#overlayModal').removeClass('overlayModal');
});



$(document.body).on('updated_checkout', function(){
    // Si necesitas que el dropdown se ancle dentro del contenedor (evita overflow:hidden):
    var $fieldWrapper = $('#additional_ciudad_field');

    // Destruye cualquier instancia previa (por si acaso)
    if ($.fn.select2 && $fieldWrapper.find('select').data('select2')) {
      $fieldWrapper.find('select').select2('destroy');
    }

    // Vuelve a inicializar Select2
    if ($.fn.select2) {
      $fieldWrapper.find('select').select2({
        placeholder: 'Selecciona tu región',
        width: '100%',
        dropdownParent: $fieldWrapper // asegura que el dropdown no quede fuera de vista
      });
    }
  });

    //<span class="">Cupón:</span></br>
    // 1) HTML de tu form custom
  var couponFormHTML = `
    <div id="couponFormLuis">
      <form class="checkout_coupon woocommerce-form-coupon" method="post">
        <input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="Código de cupón">
        <button type="submit" class="button boton-apli-cupon" name="apply_coupon" value="Aplicar cupón">Aplicar cupón</button>
      </form>
    </div>
  `;

  // 2) Inserta el form tras Webpay Plus
  function insertCouponForm() {
    $('#couponFormLuis').remove();  // limpia duplicados
    var $pm = $('.place-order');
    if ($pm.length) {
      $pm.last().after(couponFormHTML);
    }
  }

  // 3) Oculta/mostrar el form según exista o no el row del cupón
  function toggleCustomCouponForm() {
    var hasCoupon = $('tr.cart-discount').length > 0;
    $('#couponFormLuis').css('display', hasCoupon ? 'none' : '');
  }

  // 4) Estado inicial al cargar la página
  $(document).ready(function(){
    insertCouponForm();
    toggleCustomCouponForm();
  });

  // 5) Tras cada recarga AJAX de checkout o al aplicar/quitar cupón
  $(document.body).on('updated_checkout applied_coupon removed_coupon', function(){
    insertCouponForm();
    toggleCustomCouponForm();
  });

  // 6) MutationObserver de respaldo para cualquier cambio dinámico
  new MutationObserver(toggleCustomCouponForm)
    .observe(document.body, { childList: true, subtree: true });
    

    var deliveryInfoLuisHTML = `
        <div class="delivery-info-luis">
        <span class="mensajeDelivery">Tiempo de entrega de <b>1 a 4 días hábiles</b> en Región Metropolitana.<br>
        Para Otras Regiones de <b>5 a 7 días hábiles.</b></span>
        </div>
    `;
    
    function deliveryInfoLuis() {
        $('#couponFormLuis').remove();
            var $camposDeEnvio = $('.woocommerce-shipping-fields');
            if ($camposDeEnvio.length) {
            $camposDeEnvio.last().after(deliveryInfoLuisHTML);
        }
    }
    
    // Ejecuta al cargar la página
        $(document).ready(function(){
          deliveryInfoLuis();
        });
    

    // Scroll a la sección 1
    scrollToElement('.woocommerce-billing-fields');

    // Variables para almacenar los valores de cada sección
    let section3Values = {};

    // Guardar el HTML de los campos de facturación
    let section3OriginalHtml = $('.woocommerce-additional-fields').html();
    
    
    
/**************************************************************************
**** Campo de comunas sin opciones hasta que se elija una Región **********
***************************************************************************/    
// Función que bloquea el campo y aplica background al elemento específico.
    function lockSelect2Field2(fieldId) {
    const ciudadSeleccionada = $(fieldId).val();
    localStorage.setItem('shipping_city', ciudadSeleccionada);

    $(fieldId).prop('disabled', true).css('background-color', '#dbdbdb');
    if ($(fieldId).data('select2')) {
        var $customContainer = $(fieldId).data('select2').$container
            .find('span.select2-selection.select2-selection--single.shipping_city_box');
        $customContainer.addClass('select2locked2').css('background-color', '#dbdbdb');
    }
}
    
    // Función que desbloquea el campo y remueve el background del elemento
    function unlockSelect2Field2(fieldId) {
        $(fieldId).prop('disabled', false).css('background-color', '');
        if ($(fieldId).data('select2')) {
            var $customContainer = $(fieldId).data('select2').$container.find('span.select2-selection.select2-selection--single.shipping_city_box');
            $customContainer.removeClass('select2locked2').css('background-color', '');
        }
    }
    
    // Variable para almacenar el ID del interval
    var intervalId = null;
    
    // Esta función comprueba el estado del contenedor Select2 de la región
    function checkRegionState() {
        var regionContainer = $("#select2-shipping_state-container");
        if (!regionContainer.length) {
            console.log("No se encontró el contenedor del select2 de región.");
            return;
        }
        // Si se encuentra el span con la clase 'select2-selection__placeholder', se muestra "Elige una opción…"
        if (regionContainer.find(".select2-selection__placeholder").length) {
            console.log("Se detectó el placeholder en la región: 'Elige una opción…'");
            lockSelect2Field2("#shipping_city");
        } else {
            console.log("Se eligió una región. Desbloqueando campo de comuna y deteniendo monitorización.");
            unlockSelect2Field2("#shipping_city");
            $("#shipping_city").addClass('shipping_city_box');
            // Detener la monitorización eliminando el interval
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            // Opcionalmente se desasocia el evento change para que el código deje de ejecutarse.
            $("#shipping_state").off("change", regionChangeHandler);
        }
    }
    
    // Handler para el evento change del select de región
    function regionChangeHandler() {
        // Pequeño retardo para que Select2 actualice la interfaz (por ejemplo, 100ms)
        setTimeout(checkRegionState, 100);
    }
    
    // Asociar el evento change al select oculto de la región
    $("#shipping_state").on("change", regionChangeHandler);
    
    // Iniciar la comprobación periódica (cada 1 segundo) en caso de cambios asíncronos
    intervalId = setInterval(checkRegionState, 1000);





/*
function reorderOptions() {
    var select = document.getElementById('shipping_state');
    if (!select) {
        console.warn("⚠️ El select #shipping_state no está disponible.");
        return;
    }

    var options = select.getElementsByTagName('option');
    
    if (options.length < 17) {
        console.warn("⚠️ No hay suficientes opciones en #shipping_state.");
        return;
    }

    var rmOption = options[14]; // Región Metropolitana
    var vsOption = options[16]; // Valparaíso

    select.removeChild(rmOption);
    select.removeChild(vsOption);
    select.add(vsOption, 1);
    select.add(rmOption, 1);

    // Si Select2 está activo, recargarlo
    if ($.fn.select2) {
        $(select).select2(); // Reiniciar Select2 para reflejar cambios
    }

    console.log("✅ Opciones reordenadas correctamente.");
}

// 📌 Detectar cuando el select aparece en el DOM
const observer = new MutationObserver(() => {
    if (document.getElementById('shipping_state')) {
        observer.disconnect(); // Detener el observador
        reorderOptions();
    }
});

// 🔍 Observar cambios en el cuerpo del documento
observer.observe(document.body, { childList: true, subtree: true });

*/




/**
 * Función para actualizar la visibilidad y estado del botón "Realizar el pedido"
 **/
function updatePlaceOrderButtonVisibility() {
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
    requiredFields.forEach(function(selector) {
        var $field = $(selector);
        if ($field.length && !$field.hasClass('campo-valido')) {
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
            .off('click.scrollTopIfDisabled')
            .on('click.scrollTopIfDisabled', function(e) {
                if ($(this).attr('data-disabled') === 'true') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
    }
}


// Se asignan las clases iniciales a los elementos renderizados por Select2 después de un breve retraso.
setTimeout(function () {
    $('#shipping_state_field .select2-selection--single').addClass('shipping_state_box');
}, 300);

setTimeout(function () {
    $('#shipping_city_field .select2-selection--single').addClass('shipping_city_box');
}, 300);

/**
 * Función de validación de campos
 */
function validateField($field) {
    // Validación para el select de Región
    if ($field.hasClass('shipping_state_box')) {
        var value = $('#shipping_state').val();
        if (value && value.trim().length > 0) {
            $field.addClass('campo-valido').removeClass('campo-invalido');
        } else {
            $field.removeClass('campo-valido').addClass('campo-invalido');
        }
        return;
    }
    
    // Validación para el select de Ciudad
    if ($field.hasClass('shipping_city_box')) {
        var value = $('#shipping_city').val();
        if (value && value.trim().length > 0) {
            $field.addClass('campo-valido').removeClass('campo-invalido');
        } else {
            $field.removeClass('campo-valido').addClass('campo-invalido');
        }
        return;
    }
    
    // Para otros campos (por ejemplo, texto)
    var value = $field.val();
    if (value && value.trim().length >= 1) {
        $field.addClass('campo-valido').removeClass('campo-invalido');
    } else {
        $field.removeClass('campo-valido').addClass('campo-invalido');
    }
}

// Lista de campos requeridos.
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

// Eventos para el select de "Región" (shipping_state)
$(document).on('change select2:select', '#shipping_state', function () {
    var selectedVal = $(this).val();
    if (selectedVal && selectedVal.trim().length > 0) {
        $('.shipping_state_box').removeClass('campo-invalido').addClass('campo-valido');
    } else {
        $('.shipping_state_box').removeClass('campo-valido').addClass('campo-invalido');
    }
    updatePlaceOrderButtonVisibility();
});

// Eventos para el select de "Ciudad" (shipping_city)
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

// Inicializar el estado del botón "Realizar el pedido" al cargar la página.
updatePlaceOrderButtonVisibility();

$(document).ready(function() {
    var cityRendered = document.getElementById('select2-shipping_city-container');
    if (cityRendered) {
        const observerCity = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var title = cityRendered.getAttribute('title');
                // Se verifica que el valor de title no sea la opción por defecto
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
} else {
    console.error('No se encontró el contenedor .woocommerce-checkout para observar.');
}

// Capturamos el clic en el botón "Realizar el pedido" mediante delegación.
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





















    

    /**
     * Función para formatear el RUT mientras el usuario lo digita
     */
    function formatearRut(value) {
        let rut = value.replace(/\./g, '').replace(/-/g, '');
        if (rut.length > 1) {
            let dv = rut.slice(-1);
            let cuerpo = rut.slice(0, -1);
            cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return `${cuerpo}-${dv}`;
        }
        return value;
    }



    /**
     * Función para crear un popover de notificación 
     */
    function crearPopover(campo, id, texto, clase) {
        if (document.getElementById(id)) {
            return document.getElementById(id);
        }
        let popover = document.createElement('div');
        popover.id = id;
        popover.className = clase;
        popover.innerText = texto;
        document.body.appendChild(popover);
        return popover;
    }



    /**
     * Función para manejar la validación de un campo de RUT
     */
    function manejarValidacionRUT(campo, valor, mensajePopoverId, mensajeValidoId, mensajeVacio) {
        // Quitar popover para 'additional_rut_factura'
        if (campo.id === 'additional_rut_factura') {
            if (valor.trim() === '') {
                $(campo).addClass('campo-invalido').removeClass('campo-valido');
                return;
            }

            let rutFormateado = formatearRut(valor);
            campo.value = rutFormateado;

            if (!validarRut(valor)) {
                $(campo).addClass('campo-invalido').removeClass('campo-valido');

                // Muestra la notificación si el RUT es inválido
                const notificationSpan = document.querySelector('span#' + campo.id);
                if (notificationSpan) {
                    $(notificationSpan).show().text('RUT inválido');
                }
            } else {
                $(campo).addClass('campo-valido').removeClass('campo-invalido');

                // Oculta la notificación si el RUT es válido
                const notificationSpan = document.querySelector('span#' + campo.id);
                if (notificationSpan) {
                    $(notificationSpan).hide();
                }
            }
            return;
        }

        const mensajePopover = crearPopover(campo, mensajePopoverId, mensajeVacio, 'popover-error');
        const mensajeValido = crearPopover(campo, mensajeValidoId, 'RUT válido✅', 'popover-valido');

        // Selecciona el span de notificación correspondiente
        const notificationSpan = document.querySelector('span#' + campo.id);

        function ajustarPosicionPopover() {
            const rect = campo.getBoundingClientRect();
            const offsetTop = window.scrollY + rect.top - mensajePopover.offsetHeight - 5;
            const offsetTopVal = window.scrollY + rect.top - mensajeValido.offsetHeight - 30;
            const offsetLeft = window.scrollX + rect.left;

            mensajePopover.style.top = offsetTop + 'px';
            mensajePopover.style.left = offsetLeft + 'px';
            mensajeValido.style.top = offsetTopVal + 'px';
            mensajeValido.style.left = offsetLeft + 'px';
        }

        ajustarPosicionPopover();

        //  Manejar el redimensionamiento de la ventana para ajustar los popovers
        $(window).off('resize.manejarValidacionRUT').on('resize.manejarValidacionRUT', ajustarPosicionPopover);

        if (valor.trim() === '') {
            $(campo).addClass('campo-invalido').removeClass('campo-valido');
            mensajePopover.innerText = mensajeVacio;
            mensajePopover.classList.add('popover-visible');
            mensajeValido.classList.remove('popover-visible');

            // Muestra la notificación si el campo está vacío
            if (notificationSpan) {
                $(notificationSpan).show().text(mensajeVacio);
            }
            return;
        }

        let rutFormateado = formatearRut(valor);
        campo.value = rutFormateado;

        if (!validarRut(valor)) {
            $(campo).addClass('campo-invalido').removeClass('campo-valido');
            mensajePopover.innerText = 'RUT inválido';
            mensajePopover.classList.add('popover-visible');
            mensajeValido.classList.remove('popover-visible');

            // Muestra la notificación si el RUT es inválido
            if (notificationSpan) {
                $(notificationSpan).show().text('RUT inválido');
            }
        } else {
            $(campo).addClass('campo-valido').removeClass('campo-invalido');
            mensajePopover.classList.remove('popover-visible');
            mensajeValido.classList.add('popover-valido');
            setTimeout(function() {
                mensajeValido.classList.remove('popover-visible');
            }, 1000);

            // Oculta la notificación si el RUT es válido
            if (notificationSpan) {
                $(notificationSpan).hide();
            }
        }
    }




    /**
     * Función para manejar la validación de un campo de Teléfono
     */
    function manejarValidacionTelefono(campo, valor, mensajePopoverId, mensajeValidoId, mensajeVacio) {
        // Quitar popover para 'additional_telefono_factura'
        if (campo.id === 'additional_telefono_factura') {
            if (valor.replace('+56 ', '').trim() === '') {
                $(campo).addClass('campo-invalido').removeClass('campo-valido');
                return;
            }

            // Obtener solo la parte numérica del teléfono sin el prefijo
            let numericValue = valor.replace('+56 ', '').replace(/\D/g, '').trim();

            // Validar formato de teléfono
            const phoneRegex = /^[9][0-9]{4}[0-9]{4}$/; // Chile
            if (!phoneRegex.test(numericValue)) {
                $(campo).addClass('campo-invalido').removeClass('campo-valido');

                // Muestra la notificación si el teléfono es inválido
                const notificationSpan = document.querySelector('span#' + campo.id);
                if (notificationSpan) {
                    $(notificationSpan).show().text('Teléfono inválido');
                }
            } else {
                $(campo).addClass('campo-valido').removeClass('campo-invalido');

                // Oculta la notificación si el teléfono es válido
                const notificationSpan = document.querySelector('span#' + campo.id);
                if (notificationSpan) {
                    $(notificationSpan).hide();
                }
            }
            return;
        }

        const mensajePopover = crearPopover(campo, mensajePopoverId, mensajeVacio, 'popover-error');
        const mensajeValido = crearPopover(campo, mensajeValidoId, 'Teléfono válido✅', 'popover-valido');

        //  Selecciona el span de notificación correspondiente
        const notificationSpan = document.querySelector('span#' + campo.id);

        function ajustarPosicionPopover() {
            const rect = campo.getBoundingClientRect();
            const offsetTop = window.scrollY + rect.top - mensajePopover.offsetHeight - 5;
            const offsetTopVal = window.scrollY + rect.top - mensajeValido.offsetHeight - 30;
            const offsetLeft = window.scrollX + rect.left;

            mensajePopover.style.top = offsetTop + 'px';
            mensajePopover.style.left = offsetLeft + 'px';
            mensajeValido.style.top = offsetTopVal + 'px';
            mensajeValido.style.left = offsetLeft + 'px';
        }

        ajustarPosicionPopover();

        // Manejar el redimensionamiento de la ventana para ajustar los popovers
        $(window).off('resize.manejarValidacionTelefono').on('resize.manejarValidacionTelefono', ajustarPosicionPopover);

        // Obtener solo la parte numérica del teléfono sin el prefijo
        let numericValue = valor.replace('+56 ', '').replace(/\D/g, '').trim();

        if (numericValue === '') {
            $(campo).addClass('campo-invalido').removeClass('campo-valido');
            mensajePopover.innerText = mensajeVacio;
            mensajePopover.classList.add('popover-visible');
            mensajeValido.classList.remove('popover-visible');

            // Muestra la notificación si el campo está vacío
            if (notificationSpan) {
                $(notificationSpan).show().text(mensajeVacio);
            }
            return;
        }

        // Validar formato de teléfono
        const phoneRegexFull = /^[9][0-9]{4}[0-9]{4}$/; // Chile
        if (!phoneRegexFull.test(numericValue)) {
            $(campo).addClass('campo-invalido').removeClass('campo-valido');
            mensajePopover.innerText = 'Teléfono inválido';
            mensajePopover.classList.add('popover-visible');
            mensajeValido.classList.remove('popover-visible');

            // Muestra la notificación si el teléfono es inválido
            if (notificationSpan) {
                $(notificationSpan).show().text('Teléfono inválido');
            }
        } else {
            $(campo).addClass('campo-valido').removeClass('campo-invalido');
            mensajePopover.classList.remove('popover-visible');
            mensajeValido.classList.add('popover-valido');
            setTimeout(function() {
                mensajeValido.classList.remove('popover-visible');
            }, 1000);

            // Oculta la notificación si el teléfono es válido
            if (notificationSpan) {
                $(notificationSpan).hide();
            }
        }
    }



    /**
     * Función para manejar la validación de un campo de Teléfono de Factura
     */
    function manejarValidacionTelefonoFactura(campo, valor, mensajePopoverId, mensajeValidoId, mensajeVacio) {
        manejarValidacionTelefono(campo, valor, mensajePopoverId, mensajeValidoId, mensajeVacio);
    }


    /**
     * Función para manejar la validación de un campo de texto que requiere al menos un carácter
     */
    function manejarValidacionTexto(campo, valor, mensajePopoverId, mensajeValidoId, mensajeVacio) {
        const notificationSpan = document.querySelector('span#' + campo.id);

        if (valor.trim().length < 1) {
            $(campo).addClass('campo-invalido').removeClass('campo-valido');

            if (notificationSpan) {
                $(notificationSpan).show().text(mensajeVacio);
            }
            return;
        }

        $(campo).addClass('campo-valido').removeClass('campo-invalido');

        if (notificationSpan) {
            $(notificationSpan).hide();
        }
    }



    /**
     * Función para manejar la validación de un campo de Correo Electrónico
     */
    function manejarValidacionCorreo(campo, valor, mensajePopoverId, mensajeValidoId, mensajeVacio) {
        const mensajePopover = crearPopover(campo, mensajePopoverId, mensajeVacio, 'popover-error');
        const mensajeValido = crearPopover(campo, mensajeValidoId, 'Correo válido✅', 'popover-valido');
    
        // Selecciona el span de notificación correspondiente
        const notificationSpan = document.querySelector('span#' + campo.id);
    
        function ajustarPosicionPopover() {
            const rect = campo.getBoundingClientRect();
            const offsetTop = window.scrollY + rect.top - mensajePopover.offsetHeight - 5;
            const offsetTopVal = window.scrollY + rect.top - mensajeValido.offsetHeight - 30;
            const offsetLeft = window.scrollX + rect.left;
    
            mensajePopover.style.top = offsetTop + 'px';
            mensajePopover.style.left = offsetLeft + 'px';
            mensajeValido.style.top = offsetTopVal + 'px';
            mensajeValido.style.left = offsetLeft + 'px';
        }
    
        ajustarPosicionPopover();
    
        // Manejar el redimensionamiento de la ventana para ajustar los popovers
        $(window).off('resize.manejarValidacionCorreo').on('resize.manejarValidacionCorreo', ajustarPosicionPopover);
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (valor.trim() === '') {
            $(campo).addClass('campo-invalido').removeClass('campo-valido');
            
            // **Agregar condición para omitir el popover "Ingrese el Correo Factura"**
            if (campo.id !== 'additional_correo_factura') {
                mensajePopover.innerText = mensajeVacio;
                mensajePopover.classList.add('popover-visible');
    
                // Muestra la notificación si el campo está vacío
                if (notificationSpan) {
                    $(notificationSpan).show().text(mensajeVacio);
                }
            } else {
                // **Para 'additional_correo_factura', ocultar el popover y la notificación**
                mensajePopover.classList.remove('popover-visible');
                mensajeValido.classList.remove('popover-visible');
    
                if (notificationSpan) {
                    $(notificationSpan).hide();
                }
            }
    
            // Siempre ocultar el mensaje de validación
            mensajeValido.classList.remove('popover-visible');
            return;
        }
    
        if (!emailRegex.test(valor.trim())) {
            $(campo).addClass('campo-invalido').removeClass('campo-valido');
            mensajePopover.innerText = 'Correo inválido';
            mensajePopover.classList.add('popover-visible');
            mensajeValido.classList.remove('popover-visible');
    
            // Muestra la notificación si el correo es inválido
            if (notificationSpan) {
                $(notificationSpan).show().text('Correo inválido');
            }
        } else {
            $(campo).addClass('campo-valido').removeClass('campo-invalido');
            mensajePopover.classList.remove('popover-visible');
            mensajeValido.classList.add('popover-valido');
            setTimeout(function() {
                mensajeValido.classList.remove('popover-visible');
            }, 1000);
    
            // Oculta la notificación si el correo es válido
            if (notificationSpan) {
                $(notificationSpan).hide();
            }
        }
    }



    /**
     * Función para aplicar validación en tiempo real a un campo de RUT
     */
    function aplicarValidacionEnTiempoRealRUT(campo, mensajePopoverId, mensajeValidoId, mensajeVacio) {
        $(campo).on('input blur', function() {
            manejarValidacionRUT(this, $(this).val(), mensajePopoverId, mensajeValidoId, mensajeVacio);
            checkSection3Fields();
        });
    }


    /**
     * Función para aplicar validación en tiempo real a un campo de Teléfono
     */
    function aplicarValidacionEnTiempoRealTelefono(campo, mensajePopoverId, mensajeValidoId, mensajeVacio) {
        $(campo).on('input blur', function() {
            manejarValidacionTelefono(this, $(this).val(), mensajePopoverId, mensajeValidoId, mensajeVacio);
            checkSection3Fields();
        });
    }



    /**
     * Función para aplicar validación en tiempo real a un campo de texto
     */
    function aplicarValidacionEnTiempoRealTexto(campo, mensajePopoverId, mensajeValidoId, mensajeVacio) {
        $(campo).on('input blur', function() {
            manejarValidacionTexto(this, $(this).val(), mensajePopoverId, mensajeValidoId, mensajeVacio);
            checkSection3Fields();
        });
    }


    
    /**
     * Función para aplicar validación en tiempo real a un campo de Correo Electrónico
     */
    function aplicarValidacionEnTiempoRealCorreo(campo, mensajePopoverId, mensajeValidoId, mensajeVacio) {
        $(campo).on('input blur', function() {
            manejarValidacionCorreo(this, $(this).val(), mensajePopoverId, mensajeValidoId, mensajeVacio);
            checkSection3Fields();
        });
    }



    /**
     * Función para validar el RUT
     */
    function validarRut(rut) {
        var r = rut.replace(/\./g, '').replace(/-/g, '');
        if (r.length < 7) return false;
        var sub_rut = r.slice(0, -1);
        var sub_dv = r.slice(-1).toUpperCase();
        var s = 0;
        var x = 2;
        for (var i = sub_rut.length - 1; i >= 0; i--) {
            s += sub_rut[i] * x;
            x = x === 7 ? 2 : x + 1;
        }
        var dv = 11 - (s % 11);
        if (dv == 11) dv = '0';
        if (dv == 10) dv = 'K';
        return dv == sub_dv;
    }



    /**
     * Función para formatear el teléfono
     */
    function formatearTelefono(value) {
        value = value.replace(/\D/g, '');
        if (value.length > 1) {
            value = value.substring(0, 1) + ' ' + value.substring(1, 5) + ' ' + value.substring(5, 9);
        }
        return value;
    }














/**
 * Funciones para Aplicar Máscaras y Validaciones a los Campos de Teléfono
 */
function validarTelefono(phoneField) {
    const valor = $(phoneField).val().replace(/^\+56\s?/, '').trim();
    // Un dígito (0–9), espacio, 4 dígitos, espacio, 4 dígitos
    const phoneRegex = /^\d \d{4} \d{4}$/;

    if (!phoneRegex.test(valor)) {
        $(phoneField)
            .addClass('campo-invalido')
            .removeClass('campo-valido');
    } else {
        $(phoneField)
            .addClass('campo-valido')
            .removeClass('campo-invalido');
    }
}

function validarTelefonoFactura(phoneField) {
    const valor = $(phoneField).val().replace(/^\+56\s?/, '').trim();
    const phoneRegex = /^\d \d{4} \d{4}$/;

    if (!phoneRegex.test(valor)) {
        $(phoneField)
            .addClass('campo-invalido')
            .removeClass('campo-valido');
    } else {
        $(phoneField)
            .addClass('campo-valido')
            .removeClass('campo-invalido');
    }
}

    
    
    
    
    
    
    
    
    
    
    
    
    
    


    /**
     * Función para aplicar máscara al campo de Teléfono con prefijo fijo '+56 ' y validar en input y blur
     */
    function applyPhoneMaskAndValidation(phoneField, validationFunction) {
    const countryPrefix = '+56 ';
    
    if ($(phoneField).val().trim() === '') {
        $(phoneField).val(countryPrefix);
    }

    $(phoneField).on('focus', function() {
        if ($(this).val().trim() === '') {
            $(this).val(countryPrefix);
        }
    });

    $(phoneField).on('keydown', function(e) {
        const input = this;
        const cursorPosition = input.selectionStart;
        
        const allowedKeys = [37, 38, 39, 40, 46, 8, 9, 13];
        if (allowedKeys.includes(e.keyCode)) {
            if ((e.keyCode === 8 || e.keyCode === 46) && cursorPosition <= countryPrefix.length) {
                e.preventDefault();
            }
            return;
        }

        if (cursorPosition < countryPrefix.length) {
            e.preventDefault();
            setTimeout(() => {
                input.setSelectionRange(countryPrefix.length, countryPrefix.length);
            }, 0);
        }
    });

    $(phoneField).on('input', function() {
        let value = $(this).val();

        if (!value.startsWith(countryPrefix)) {
            value = countryPrefix + value.replace(/\+56\s?/, '');
        }

        let numericPart = value.slice(countryPrefix.length).replace(/\D/g, '').substring(0, 9);

        let formattedNumber = '';
        if (numericPart.length > 0) {
            formattedNumber += numericPart.charAt(0) + ' ';
        }
        if (numericPart.length > 1) {
            formattedNumber += numericPart.substring(1, 5) + ' ';
        }
        if (numericPart.length > 5) {
            formattedNumber += numericPart.substring(5, 9);
        }

        $(this).val(countryPrefix + formattedNumber.trim());

        validationFunction(this);
    });

    $(phoneField).on('blur', function() {
        let value = $(this).val();

        if (value.trim() === countryPrefix.trim()) {
            $(this).val('');
            return;
        }

        validationFunction(this);
    });

    $(phoneField).off('input.phoneValidation blur.phoneValidation').on('input.phoneValidation blur.phoneValidation', function() {
        validationFunction(this);
    });
}




    /**
     * Función para verificar si el dispositivo es móvil
     */
    function isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    /**
     * Función para hacer scroll suave hacia un elemento específico solo en dispositivos móviles
     */
    function scrollToElement(selector) {
        if (!isMobileDevice()) {
            return; 
        }
    
        const checkExist = setInterval(function() {
            const element = document.querySelector(selector);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                clearInterval(checkExist);
            }
        }, 100); 
    }



    /**
     * Función para aplicar validación en tiempo real a campos obligatorios
     */
    function applyRequiredFieldValidation(nameField, lastNameField, emailField) {
        $(nameField).off('input').on('input', function() {
            checkBillingFields();
        });
        $(lastNameField).off('input').on('input', function() {
            checkBillingFields();
        });
        $(emailField).off('input').on('input', function() {
            checkBillingFields();
        });
    }



    /**
     * Inicializar las Validaciones al Cargar la Página
     */
    checkBillingFields();
    // Usar Delegación de Eventos para Elementos Dinámicos
    $(document).on('input', '.woocommerce-billing-fields__field-wrapper input', function() {
        checkBillingFields();
    });

    /**
     * Aplicar Validaciones Específicas a los Campos de RUT
     */
    // Selecciona los campos de RUT de facturación y factura
    let rutInput = document.getElementById('billing_rut');
    let rutFacturaInput = document.getElementById('additional_rut_factura'); // Corregido el ID
    let facturaSelect = document.getElementById('additional_factura');
    let checkoutForm = document.querySelector('form.checkout');

    rutInput.addEventListener('input', function () {
        if (this.value.length > 12) {
            this.value = this.value.slice(0, 12);
        }
    });

    if (rutInput) {
        aplicarValidacionEnTiempoRealRUT(rutInput, 'mensaje-rut-error', 'mensaje-rut-valido', 'Ingrese su RUT');
    }

    if (rutFacturaInput) {
        aplicarValidacionEnTiempoRealRUT(rutFacturaInput, 'mensaje-rut-factura-error', 'mensaje-rut-factura-valido', 'Ingrese RUT empresa');
    }



    /**
     * Función para Verificar los campos de datos del usuario (billing)
     */
    function checkBillingFields() {
        console.log("checkBillingFields ejecutado");
        let allFilled = true;
    
        // Validación del campo de Nombre
        const nameField = $('#billing_first_name');
        if (nameField.val().trim().length > 0) {
            if (nameField.val().trim().length < 1) {
                nameField.removeClass('campo-valido').addClass('campo-invalido');
                allFilled = false;
            } else {
                nameField.removeClass('campo-invalido').addClass('campo-valido');
            }
        } else {
            nameField.removeClass('campo-valido campo-invalido');
            allFilled = false; // Si está vacío, no permite avanzar
        }
    
        // Validación del campo de Apellido
        const lastNameField = $('#billing_last_name');
        if (lastNameField.val().trim().length > 0) {
            if (lastNameField.val().trim().length < 1) {
                lastNameField.removeClass('campo-valido').addClass('campo-invalido');
                allFilled = false;
            } else {
                lastNameField.removeClass('campo-invalido').addClass('campo-valido');
            }
        } else {
            lastNameField.removeClass('campo-valido campo-invalido');
            allFilled = false; // Si está vacío, no permite avanzar
        }
    
        // Validación del campo de Celular
        const phoneField = $('#billing_phone');
        const phoneRegex = /^[0-9]{1} [0-9]{4} [0-9]{4}$/;
        const phoneValue = phoneField.val().trim();
        if (phoneValue.length > 4) {
            if (!phoneValue.startsWith('+56 ') || !phoneRegex.test(phoneValue.replace('+56 ', '').trim())) {
                phoneField.removeClass('campo-valido').addClass('campo-invalido');
                allFilled = false;
            } else {
                phoneField.removeClass('campo-invalido').addClass('campo-valido');
            }
        } else {
            phoneField.removeClass('campo-valido campo-invalido');
            allFilled = false; // Si está vacío o incompleto, no permite avanzar
        }
    
        // Validación del RUT
        const rutField = $('#billing_rut'); 
        if (rutField.val().trim().length > 0) {
            if (!validarRut(rutField.val())) {
                rutField.removeClass('campo-valido').addClass('campo-invalido');
                allFilled = false;
            } else {
                rutField.removeClass('campo-invalido').addClass('campo-valido');
            }
        } else {
            rutField.removeClass('campo-valido campo-invalido');
            allFilled = false; // Si está vacío, no permite avanzar
        }
    
        // Validación del campo de Email
        const emailField = $('#billing_email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.val().trim().length > 0) {
            if (!emailRegex.test(emailField.val().trim())) {
                emailField.removeClass('campo-valido').addClass('campo-invalido');
                allFilled = false;
            } else {
                emailField.removeClass('campo-invalido').addClass('campo-valido');
            }
        } else {
            emailField.removeClass('campo-valido campo-invalido');
            allFilled = false; // Si está vacío, no permite avanzar
        }
    
    }



    $(document).ready(checkBillingFields);


    
    /**
     * Función para Verificar los Campos de Envío
     */
    function checkShippingFields() {
        window.checkShippingFields = function() {
            const shippingDcField = $('#shipping_dc');
            const shippingNumeroUbiField = $('#shipping_numero_ubi');
            const shippingAddress3Field = $('#shipping_address_3');
    
            // Validar shipping_dc: ahora se considera válido si tiene 1 o más caracteres
            const dcValue = shippingDcField.val().trim();
            if (dcValue.length >= 1) {
                shippingDcField.removeClass('campo-invalido').addClass('campo-valido');
            } else {
                shippingDcField.removeClass('campo-valido').addClass('campo-invalido');
            }
    
            // Validar shipping_address_3: al ser opcional, puedes optar por:
            // a) Considerarlo válido si tiene contenido, y si está vacío, quitar las clases (o marcarlo como válido, según lo que necesites)
            const address3Value = shippingAddress3Field.val().trim();
            if (shippingAddress3Field.length) {
                if (address3Value.length > 0) {
                    shippingAddress3Field.removeClass('campo-invalido').addClass('campo-valido');
                } else {
                    // Opcional: si está vacío y es opcional, puedes quitar ambas clases
                    shippingAddress3Field.removeClass('campo-invalido campo-valido');
                    // O, si prefieres considerarlo siempre válido, puedes:
                    // shippingAddress3Field.removeClass('campo-invalido').addClass('campo-valido');
                }
            }
            
            // Nota: El resto de la función que verifica otros campos (shipping_numero_ubi, etc.)
            // se ha eliminado ya que en este ejemplo solo nos centramos en shipping_dc y shipping_address_3.
        };
    
        // Vincular la función a los eventos "input" de los campos de envío
        $('#shipping_dc').on('input', function() {
            localStorage.removeItem('direccion_buscada');
            window.checkShippingFields();
        });
        $('#shipping_address_3').on('input', function() {
            window.checkShippingFields();
        });
        $('#shipping_numero_ubi').on('input', function() {
            window.checkShippingFields();
        });
    }



    // Usar la función `checkShippingFields` en los eventos `input` de `shipping_dc` y `shipping_numero_ubi`
    $(document).on('input', '#shipping_dc', checkShippingFields);
    $(document).on('input', '#shipping_numero_ubi', checkShippingFields)
    $(document).on('input', '#shipping_address_3', checkShippingFields);
    
    // Llamar a `checkShippingFields` al cargar la página para verificar el estado inicial
    $(document).ready(checkShippingFields);


    
    /**
     * Inserta el Botón "Solicitar/X" y Vincula el Manejador de Eventos
     */
    function insertSolicitarButton() {
        if ($('.woocommerce-additional-fields__field-wrapper').find('#solicitar-button').length === 0) {
            const isFacturaSelected = $('#additional_factura').val() === 'Factura';
            const buttonText = isFacturaSelected ? 'X' : 'Solicitar';
            const buttonClass = isFacturaSelected ? 'btn-no' : 'btn-solicitar';
    
            const customButtonHtml = `
                <div class="css-1abozvp">
                    <div data-testid="invoice-request-disabled" class="css-zm0g3d">
                        <p class="chakra-text css-14vrtiu">¿Necesitas factura?</p>
                        <span tabindex="0" class="css-0">
                            <button id="solicitar-button" type="button" class="chakra-button css-91ovut ${buttonClass}">${buttonText}</button>
                        </span>
                    </div>
                </div>
            `;
            $('.woocommerce-additional-fields__field-wrapper').prepend(customButtonHtml);
            
            // **Eliminar cualquier título existente con las clases 'tituloFact' o 'tituloGuar'**
    //        $('.tituloFact, .tituloGuar, .tituloEdit').remove();
    
            // Vincular el manejador de eventos
            bindSolicitarButtonEvents();
        }
    }

    // Llama a la función después de avanzar a la sección 3
    $(document).on('click', '#go-to-section-3', function() {
        insertSolicitarButton();
    });

    // También llama a la función después de editar la sección 3
    $(document).on('click', '#edit-section-3', function() {
        insertSolicitarButton();
    });
    
    
    

    /**
     * Función para agregar la bandera de Chile al campo de Teléfono y ajustar la máscara
     */
    function addChileFlagToPhoneInput(phoneField) {
        // Envolver el input en un contenedor si no existe
        if (!$(phoneField).parent().hasClass('phone-input-wrapper')) {
            $(phoneField).wrap('<div class="phone-input-wrapper"></div>');
            $(phoneField).before(`
                <div class="phone-flag">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg" alt="Chile Flag" style="width: 15px; height: 11px;">
                </div>
            `);
        }
    
        // Agregar un texto de ejemplo debajo del input
        if (!$(phoneField).next('.phone-example').length) {
            $(phoneField).after(`
                <div class="phone-example">Ejemplo: +56 9 9999 9999</div>
            `);
        }
    
        // Ajustar el padding del input para la bandera
        $(phoneField).css({
            'padding-left': '40px'
        });
    }


    /**
     * Aplicar máscara al campo de Teléfono con bandera y texto de ejemplo
     */
    function applyPhoneMaskAndValidationWithFlag(phoneField, validationFunction) {
        const countryPrefix = '+56 ';
    
        addChileFlagToPhoneInput(phoneField);
    
        if ($(phoneField).val().trim() === '') {
            $(phoneField).val(countryPrefix);
        }
    
        $(phoneField).on('focus', function() {
            if ($(this).val().trim() === '') {
                $(this).val(countryPrefix);
            }
        });
    
        $(phoneField).on('keydown', function(e) {
            const input = this;
            const cursorPosition = input.selectionStart;
    
            const allowedKeys = [37, 38, 39, 40, 46, 8, 9, 13];
            if (allowedKeys.includes(e.keyCode)) {
                if ((e.keyCode === 8 || e.keyCode === 46) && cursorPosition <= countryPrefix.length) {
                    e.preventDefault();
                }
                return;
            }
    
            if (cursorPosition < countryPrefix.length) {
                e.preventDefault();
                setTimeout(() => {
                    input.setSelectionRange(countryPrefix.length, countryPrefix.length);
                }, 0);
            }
        });
    
        $(phoneField).on('input', function() {
            let value = $(this).val();
    
            if (!value.startsWith(countryPrefix)) {
                value = countryPrefix + value.replace(/\+56\s?/, '');
            }
    
            let numericPart = value.slice(countryPrefix.length).replace(/\D/g, '').substring(0, 9);
    
            let formattedNumber = '';
            if (numericPart.length > 0) {
                formattedNumber += numericPart.charAt(0) + ' ';
            }
            if (numericPart.length > 1) {
                formattedNumber += numericPart.substring(1, 5) + ' ';
            }
            if (numericPart.length > 5) {
                formattedNumber += numericPart.substring(5, 9);
            }
    
            $(this).val(countryPrefix + formattedNumber.trim());
    
            validationFunction(this);
        });
    
        $(phoneField).on('blur', function() {
            let value = $(this).val();
    
            if (value.trim() === countryPrefix.trim()) {
                $(this).val('');
                return;
            }
    
            validationFunction(this);
        });
    
        $(phoneField).off('input.phoneValidation blur.phoneValidation').on('input.phoneValidation blur.phoneValidation', function() {
            validationFunction(this);
        });
    }
    
    /**
     * Inicializar máscara con bandera y texto en los campos de teléfono
     */
    $(document).ready(function() {
        applyPhoneMaskAndValidationWithFlag($('#billing_phone'), validarTelefono);
        applyPhoneMaskAndValidationWithFlag($('#additional_telefono_factura'), validarTelefonoFactura);
    });



    /**
     * Función para Vincular Eventos al Botón "Solicitar/X"
     */
    function bindSolicitarButtonEvents() {
        $(document).off('click', '#solicitar-button').on('click', '#solicitar-button', function(e) {
            e.preventDefault();
    
            const $button = $(this);
            const isSolicitud = $button.hasClass('btn-solicitar');
            const isNo = $button.hasClass('btn-no');
    
            console.log(`Botón 'solicitar-button' clickeado. Estado - Solicitar: ${isSolicitud}, No: ${isNo}`);
    
            if (isSolicitud) {
                $button
                    .text('Editar')
                    .removeClass('btn-solicitar')
                    .addClass('btn-edit');
    
                // Agregar clases adicionales a los contenedores padre
                //const $parentDiv1 = $button.closest('.css-1abozvp');
                //const $parentDiv2 = $button.closest('.css-zm0g3d');
                
                //$("#additional_correo_factura").val($("#billing_email").val());
                //$("#additional_telefono_factura").val($("#billing_phone").val());
    
                //$parentDiv1.addClass('css-1abozvp2');
                //$parentDiv2.addClass('css-zm0g3d2');
    
                // Ocultar el texto "¿Necesitas factura?"
                //$parentDiv2.find('p.chakra-text.css-14vrtiu').addClass('css-14vrtiu2').text('');
    
                // Reducir opacidad y deshabilitar interacciones en secciones de facturación y envío
                //$('.woocommerce-billing-fields, .woocommerce-shipping-fields').css({ 'opacity': '0.5', 'pointer-events': 'none' });
    
                // Cambiar el valor del select a "Factura"
                $('#additional_factura').val('Factura').trigger('change');
    
                // Mostrar el botón "Guardar información" si no existe, de lo contrario, simplemente mostrarlo
                if ($('#save-section-3').length === 0) {
                  const botonesHtml = `
                    <div class="guardarFacturacion">
                      <button type="button" id="save-section-3" class="button btnGuar">Guardar información</button>
                      <button type="button" class="cerrarFacturacion" id="cerrarFacturacion">Cancelar</button>
                    </div>
                  `;
                  $('#facturaFieldsModal').after(botonesHtml);
                } else {
                    $('#save-section-3').show();
                }
    
                // Eliminar cualquier título existente con las clases 'tituloFact' o 'tituloGuar' para evitar duplicación
                $('.tituloFact, .tituloGuar, .tituloEdit').remove();
    
                // Crear y mostrar el título de la sección 3 con la clase 'tituloFact'
                /*const section3TitleHtml = '<h4 class="titulo-check tituloFact"><span class="numCheck">3</span>Datos de facturación</h4>';
                $('.woocommerce-additional-fields__field-wrapper').prepend(section3TitleHtml);*/
    
                // Activar validaciones solo para los campos prellenados
                manejarValidacionTelefono(
                    document.getElementById('additional_telefono_factura'),
                    $("#additional_telefono_factura").val(),
                    'mensaje-telefono-factura-error',
                    'mensaje-telefono-factura-valido',
                    'Ingrese su teléfono'
                );
    
                manejarValidacionCorreo(
                    document.getElementById('additional_correo_factura'),
                    $("#additional_correo_factura").val(),
                    'mensaje-correo-factura-error',
                    'mensaje-correo-factura-valido',
                    'Ingrese el Correo Factura'
                );
    
                // Vincular las validaciones en tiempo real
                bindSection3Validation();
    
                // Verificar la validez de los campos prellenados
                checkSection3Fields();
                
                $('#facturaModal').addClass('active');
                $('#overlayModal').addClass('overlayModal');
    
            } else if (isNo) {
                // Restablecer la sección 3
                $('#save-section-3').hide();
                $('#section3-summary').show();
                $('.woocommerce-additional-fields__field-wrapper').show();
                $button.text('Editar información');
                
                // Cambiar el valor del select a "Boleta"
                $('#additional_factura').val('Boleta').trigger('change');
            
                // Limpiar section3Values y establecer 'additional_factura' a 'Boleta'
                section3Values = {};
                section3Values['additional_factura'] = 'Boleta';
            
                // Limpiar los valores de los campos de "Factura"
               /* $('#additional_razon_social').val('');
                $('#additional_giro').val('');
                $('#additional_rut_factura').val('');
                $('#additional_telefono_factura').val('');
                $('#additional_direccion_factura').val('');
                $('#additional_comuna').val('');
                $('#additional_correo_factura').val('');*/
            
                // Remover clases de validación
                $('#additional_razon_social, #additional_giro, #additional_rut_factura, #additional_telefono_factura, #additional_direccion_factura, #additional_comuna, #additional_correo_factura').removeClass('campo-valido campo-invalido');
    
                // Restablecer la opacidad y la interactividad de las secciones de facturación y envío
                $('.woocommerce-billing-fields, .woocommerce-shipping-fields').css({ 'opacity': '1', 'pointer-events': 'auto' });
                
                
                $('.woocommerce-additional-fields')
                    .find('input, select, textarea')
                    .prop('disabled', false)
                    .css('background-color', '');
                $('#save-section-3').text('Guardar Información');

                
    
                // Cambiar el texto a 'Solicitar' y ajustar clases
                $button.text('Solicitar').addClass('btn-solicitar').removeClass('btn-no').removeClass('css-91ovut2');
    
                // Eliminar clases adicionales de los contenedores padre
                const $parentDiv1 = $button.closest('.css-1abozvp');
                const $parentDiv2 = $button.closest('.css-zm0g3d');
    
                $parentDiv1.removeClass('css-1abozvp2');
                $parentDiv2.removeClass('css-zm0g3d2');
    
                // Restaurar el texto "¿Necesitas factura?"
                $parentDiv2.find('p.chakra-text.css-14vrtiu').removeClass('css-14vrtiu2').text('¿Necesitas factura?');
    
                // Eliminar cualquier título existente con las clases 'tituloFact' o 'tituloGuar' y 'tituloEdit'
                $('.tituloFact, .tituloGuar, .tituloEdit').remove();
    
                // Verificar la validez de los campos al cambiar a 'Boleta'
                checkSection3Fields();
                
                $('#facturaModal').removeClass('active');
                $('#overlayModal').removeClass('overlayModal');
                
                
            }
    
            // Actualizar la visibilidad del botón "Realizar el pedido"
            updatePlaceOrderButtonVisibility();
        });
    }





function syncSolicitarWithSave() {
  const $save = $('#save-section-3');
  const $sol = $('#solicitar-button');
  if ( $save.hasClass('btnEditarIn') ) {
    $sol.text('Editar').removeClass('btn-solicitar').addClass('btn-edit');
  } else {
    $sol.text('Solicitar').removeClass('btn-edit').addClass('btn-solicitar');
  }
}



/**
 * Manejar el Click en el Botón "Guardar Información" de la Sección 3
 */
$(document).on('click', '#save-section-3', function(e) {
  e.preventDefault();
  var $btn = $(this);
  var text = $btn.text().trim();

  if (text === "Guardar información") {
    // 1) Deshabilitar todos los campos de facturación
    $('.woocommerce-additional-fields')
      .find('input, select, textarea')
      .prop('disabled', true)
      .css('background-color', '#dcecdc');

    // 2) Cambiar el botón a "Editar información"
    $btn
      .css({ 'background-color': '#fff', cursor: 'pointer' })
      .text("Editar información")
      .removeClass("btnGuar")
      .addClass("btnEditarIn");

    // 3) Mostrar toast de confirmación
    $('<div class="mi-toast">✅ Datos guardados</div>')
      .css({
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 15px',
        background: '#116FBF',
        color: '#fff',
        borderRadius: '4px',
        zIndex: 9999991
      })
      .appendTo('body')
      .fadeIn(300)
      .delay(2000)
      .fadeOut(300, function() { $(this).remove(); });

    // 4) Capturar valores de Razón Social y RUT Factura
    var razon      = $('#additional_razon_social').val() || '—';
    var rutFactura = $('#additional_rut_factura').val()  || '—';

    // 5) Eliminar resumen previo si existe
    $('.info-factura-resumen').remove();

    // 6) Construir y mostrar el resumen justo después de "¿Necesitas factura?"
    var resumenHtml = '\
      <div class="info-factura-resumen">\
        <p><strong>Razón Social:</strong> ' + razon + '</p>\
        <p><strong>RUT Factura:</strong> ' + rutFactura + '</p>\
      </div>';
    $('[data-testid="invoice-request-disabled"]').before(resumenHtml);

    // 7) Cerrar el modal tras un pequeño retraso
    setTimeout(function() {
      $('#facturaModal, #overlayModal').removeClass('active overlayModal');
    }, 500);

  } else {
    // 8) Volver a habilitar todos los campos de facturación
    $('.woocommerce-additional-fields')
      .find('input, select, textarea')
      .prop('disabled', false)
      .css('background-color', '');

    // 9) Cambiar el botón de vuelta a "Guardar información"
    $btn
      .text("Guardar información")
      .removeClass("btnEditarIn")
      .addClass("btnGuar");

    // 10) Eliminar el resumen de factura si existe
    $('.info-factura-resumen').remove();
  }

  // 11) Actualizar el estado del botón "Realizar el pedido"
  updatePlaceOrderButtonVisibility();
});




$(document).on('click', '#cerrarFacturacion', function() {
    
    $('.info-factura-resumen').remove();
    $('#additional_razon_social, #additional_giro, #additional_rut_factura, #additional_telefono_factura, #additional_direccion_factura, #additional_comuna, #additional_correo_factura')
    .val('')                                   // vacía valor
    .removeClass('campo-valido campo-invalido'); // quita clases de validación
    
    $('#save-section-3').removeClass('btnEditarIn');
    $('#save-section-3').addClass('btnGuar');
    $('#save-section-3').text('Guardar Información');
    
});




// Cuando cancelas desde el modal
$(document).on('click', '#cerrarFacturacion, #modalClose, #overlayModal', function() {
  $('#facturaModal, #overlayModal').removeClass('active overlayModal');
  // Asegúrate de que el botón de guardar haya vuelto a “Guardar información”
  //$('#save-section-3').text("Guardar información").removeClass("btnEditarIn");
  
  
    
    
    
    $('.woocommerce-additional-fields')
                    .find('input, select, textarea')
                    .prop('disabled', false)
                    .css('background-color', '');
                    
    
    
    
    //$('#save-section-3').text('Guardar Información');
  
  syncSolicitarWithSave();
});

// Y cuando abres el modal con “Editar”
/*$(document).on('click', '.btn-edit', function() {
  $('#facturaModal, #overlayModal').addClass('active overlayModal');
  syncSolicitarWithSave();
});
*/

    


    

    /**
     * Función para Mostrar/Ocultar Campos Basados en el Tipo de Documento Seleccionado
     */
    function toggleFields() {
        const selectedOption = $('#additional_factura').val();
        const fieldsToToggle = [
            'additional_razon_social',
            'additional_razon_social_field',
            'additional_giro',
            'additional_giro_field',
            'additional_rut_factura_field',
            'additional_telefono_factura_field',
            'additional_direccion_factura',
            'additional_direccion_factura_field',
            'additional_ciudad_field',
            'additional_comuna',
            'additional_comuna_field',
            'additional_correo_factura',
            'additional_correo_factura_field'
        ];
    
        if (selectedOption === 'Factura') {
            // Mostrar los campos
            fieldsToToggle.forEach(function(fieldId) {
                const field = $('#' + fieldId);
                if (field.length) {
                    field.show();
                }
            });
    
            // Aplicar validaciones específicas para "Factura"
            applyPhoneMaskAndValidation($('#additional_telefono_factura'), validarTelefonoFactura);
            aplicarValidacionEnTiempoRealTelefono($('#additional_telefono_factura'), 'mensaje-telefono-factura-error', 'mensaje-telefono-factura-valido', 'Ingrese su teléfono');
            aplicarValidacionEnTiempoRealRUT($('#additional_rut_factura'), 'mensaje-rut-factura-error', 'mensaje-rut-factura-valido', 'Ingrese RUT empresa');
        } else {
            // Ocultar los campos
            fieldsToToggle.forEach(function(fieldId) {
                const field = $('#' + fieldId);
                if (field.length) {
                    field.hide();
                }
            });
    
            // Limpiar los valores de los campos de "Factura"
            /*$('#additional_razon_social').val('');
            $('#additional_giro').val('');
            $('#additional_rut_factura').val('');
            $('#additional_telefono_factura').val('');
            $('#additional_direccion_factura').val('');
            $('#additional_comuna').val('');
            $('#additional_correo_factura').val('');*/
    
            // Remover clases de validación
            $('#additional_razon_social, #additional_giro, #additional_rut_factura, #additional_telefono_factura, #additional_direccion_factura, #additional_comuna, #additional_correo_factura').removeClass('campo-valido campo-invalido');
        }
    
        checkSection3Fields();
        updatePlaceOrderButtonVisibility();
    }


    // Inicializar el estado de los campos al cargar la página
    toggleFields();

    // Manejar el cambio en el selector de tipo de documento
    $(document).on('change', '#additional_factura', toggleFields);

    /**
     * Manejar el Evento de Envío del Formulario de Checkout
     */
    $('form.checkout').on('checkout_place_order', function() {
        // Restaurar el HTML original de la sección 3
        $('.woocommerce-additional-fields').html(section3OriginalHtml);
    
        // Asignar valores solo si 'additional_factura' es 'Factura'
        if (section3Values['additional_factura'] === 'Factura') {
            $.each(section3Values, function(key, value) {
                $('#' + key).val(value);
            });
        } else {
            // Asegurar que 'additional_factura' sea 'Boleta' y limpiar campos
            $('#additional_factura').val('Boleta').trigger('change');
    
            $('#additional_razon_social').val('');
            $('#additional_giro').val('');
            $('#additional_rut_factura').val('');
            $('#additional_telefono_factura').val('');
            $('#additional_direccion_factura').val('');
            $('#additional_comuna').val('');
            $('#additional_correo_factura').val('');
        }
    
        // Reaplicar la lógica para mostrar/ocultar campos
        toggleFields();
    });



    /**
     * Aplicar Máscaras y Validaciones Iniciales a los Campos de Facturación
     */
    applyPhoneMaskAndValidation($('#billing_phone'), validarTelefono);
    aplicarValidacionEnTiempoRealRUT($('#billing_rut'), 'mensaje-rut-error', 'mensaje-rut-valido', 'Ingrese su RUT');
    applyRequiredFieldValidation($('#billing_first_name'), $('#billing_last_name'), $('#billing_email'));

    /**
     * Aplicar Validaciones en Tiempo Real a los Campos de Facturación
     */
    if (rutInput) {
        aplicarValidacionEnTiempoRealRUT(rutInput, 'mensaje-rut-error', 'mensaje-rut-valido', 'Ingrese su RUT');
    }

    if (rutFacturaInput) {
        aplicarValidacionEnTiempoRealRUT(rutFacturaInput, 'mensaje-rut-factura-error', 'mensaje-rut-factura-valido', 'Ingrese RUT empresa');
    }

    /**
     * Inicializar Select2 para el Selector de Tipo de Documento
     */
    $('#additional_factura').select2({
        placeholder: "Seleccione una opción",
        width: '100%'
    });
    
    
    
    /**
     * Inicializar campos adicionales al cargar la página
     */
    $(document).ready(function() {
        // Prellenar los campos de correo y teléfono en la Sección 3
        $("#additional_correo_factura").val($("#billing_email").val());
        $("#additional_telefono_factura").val($("#billing_phone").val());

        
        // Activar las validaciones para los campos prellenados
            manejarValidacionTelefono(
                document.getElementById('additional_telefono_factura'),
                $("#additional_telefono_factura").val(),
                'mensaje-telefono-factura-error',
                'mensaje-telefono-factura-valido',
                'Ingrese su teléfono'
            );
        
            manejarValidacionCorreo(
                document.getElementById('additional_correo_factura'),
                $("#additional_correo_factura").val(),
                'mensaje-correo-factura-error',
                'mensaje-correo-factura-valido',
                'Ingrese el Correo Factura'
            );

        // **Verificar si los campos prellenados son válidos para mostrar el botón "Guardar información"**
        checkSection3Fields();
        
        // Insertar el botón "Solicitar" si es necesario
        insertSolicitarButton();
    });
    
    
    
    

    /**
     * Función para verificar la validez de todos los campos de la Sección 3
     */
    function checkSection3Fields() {
        const tipoDocumento = $('#additional_factura').val();
        const $btn = $('#save-section-3');
    
        // Si no es factura, siempre desactivar
        if (tipoDocumento !== 'Factura') {
            $btn.prop('disabled', true);
            return;
        }
    
        // Comprueba todos los campos de factura
        let isValid = true;
        const campos = [
          '#additional_razon_social',
          '#additional_giro',
          '#additional_direccion_factura',
          '#additional_comuna',
          '#additional_rut_factura',
          '#additional_telefono_factura',
          '#additional_correo_factura'
        ];
        campos.forEach(selector => {
          if (!$(selector).hasClass('campo-valido')) {
            isValid = false;
          }
        });
    
        // Activa o desactiva el botón
        $btn.prop('disabled', !isValid);
    }


    /**
     * Vincular la función checkSection3Fields a los eventos de los campos de la Sección 3
     */
    function bindSection3Validation() {
        // Razón Social
        $('#additional_razon_social').on('input blur', function() {
            manejarValidacionTexto(this, $(this).val(), 'mensaje-razon-social-error', 'mensaje-razon-social-valido', 'Ingrese la Razón Social');
            checkSection3Fields();
        });
    
        // Giro Factura
        $('#additional_giro').on('input blur', function() {
            manejarValidacionTexto(this, $(this).val(), 'mensaje-giro-error', 'mensaje-giro-valido', 'Ingrese el Giro Factura');
            checkSection3Fields();
        });
    
        // Dirección Factura
        $('#additional_direccion_factura').on('input blur', function() {
            manejarValidacionTexto(this, $(this).val(), 'mensaje-direccion-factura-error', 'mensaje-direccion-factura-valido', 'Ingrese la Dirección Factura');
            checkSection3Fields();
        });
    
        // Comuna 
        $('#additional_comuna').on('input blur', function() {
            manejarValidacionTexto(this, $(this).val(), 'mensaje-comuna-error', 'mensaje-comuna-valido', 'Ingrese la Comuna');
            checkSection3Fields();
        });
    
        // RUT Factura
        $('#additional_rut_factura').on('input blur', function() {
            manejarValidacionRUT(this, $(this).val(), 'mensaje-rut-factura-error', 'mensaje-rut-factura-valido', 'Ingrese RUT empresa');
            checkSection3Fields();
        });
    
        // Teléfono Factura
        $('#additional_telefono_factura').on('input blur', function() {
            manejarValidacionTelefono(this, $(this).val(), 'mensaje-telefono-factura-error', 'mensaje-telefono-factura-valido', 'Ingrese su teléfono');
            checkSection3Fields();
        });
    
        // Correo Factura
        $('#additional_correo_factura').on('input blur', function() {
            manejarValidacionCorreo(this, $(this).val(), 'mensaje-correo-factura-error', 'mensaje-correo-factura-valido', 'Ingrese el Correo Factura');
            checkSection3Fields();
        });
    }
    

    //  Vincular las validaciones cuando se crea el botón 'solicitar-button'
    $(document).on('click', '#go-to-section-3, #solicitar-button', function() {
        bindSection3Validation();
        $("#additional_correo_factura").val($("#billing_email").val());
        $("#additional_telefono_factura").val($("#billing_phone").val());
    });
    
    
    //Desactivar enter en el checkout
    document.addEventListener('DOMContentLoaded', function() {
        const checkoutForm = document.querySelector('form.checkout');
            if (checkoutForm) {
                checkoutForm.addEventListener('keypress', function(event) {
                    if (event.key === 'Enter') {
                        const target = event.target;
                        if (target.tagName === 'INPUT' || target.tagName === 'SELECT') {
                        event.preventDefault();
                    }
                }
            });
        }
    });
    
    
    /*******************************
    ** LOCAL STORAGE by Luis Oses **
    *******************************/
        // Función para actualizar el valor del campo shipping_numero_ubi desde localStorage
    function updateShippingNumeroUbi() {
      const $field = $("#shipping_numero_ubi");
      if ($field.length) {
        const storedValue = localStorage.getItem('shipping_numero_ubi');
        if (storedValue && $field.val().trim() !== storedValue) {
          $field.val(storedValue).trigger('change');
          console.log('Actualizando shipping_numero_ubi con:', storedValue);
        }
        return true;
      }
      return false;
    }
    
    // Crear y configurar el MutationObserver
    const shippingNumeroUbiObserver = new MutationObserver(function(mutationsList, observer) {
      if (updateShippingNumeroUbi()) {
        // Una vez asignado el valor, desconectamos el observer
        observer.disconnect();
      }
    });
    
    // Observa el body para detectar cuando se inserte el campo 
    shippingNumeroUbiObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    const campos = [
      'billing_rut',
      'billing_email',
      'billing_first_name', 
      'billing_last_name', 
      'billing_phone',
      'shipping_dc',
      'shipping_numero_ubi',
      'shipping_address_3'
      //'additional_razon_social',
      //'additional_giro',
      //'additional_rut_factura',
      //'additional_direccion_factura',
      //'additional_ciudad',
      //'additional_comuna'
      //'select2-shipping_state-container',
      //'select2-shipping_city-container'
    ];


    // Recuperar valores guardados si los elementos ya existen en el DOM.
    campos.forEach(campo => {
      const valorGuardado = localStorage.getItem(campo);
      if (valorGuardado) {
        const $el = $(`#${campo}`);
        if ($el.length) {
          $el.val(valorGuardado).trigger('change');
        }
      }
    });
    console.log(localStorage);
    

    // Delegación para guardar valores en localStorage para todos los elementos con ID que estén en "campos"
    $(document).on('input change', '[id]', function () {
      const fieldId = $(this).attr('id');
      if (campos.indexOf(fieldId) !== -1) {
        const nuevoValor = $(this).val().trim();
        console.log('Guardando en LocalStorage:', fieldId, nuevoValor);
        localStorage.setItem(fieldId, nuevoValor);
      }
    });
});



// Después de cada recálculo de checkout, limpia el bloqueo de UI
jQuery(function($){
  $(document.body).on('updated_checkout', function(){
    // Si tienes blockUI disponible:
    if ($.unblockUI) {
      $.unblockUI();
    }
    // Para esconder cualquier overlay que quede
    $('.blockUI, .blockOverlay, .blockMsg').hide();
    // Y re-habilitar inputs/buttons del método de pago
    $('#payment').find('input, button, select, textarea').prop('disabled', false);
  });
});




jQuery(function($){
  var $select = $('#shipping_state');
  var $rm   = $select.find('option[value="CL-RM"]').detach();
  var $vs   = $select.find('option[value="CL-VS"]').detach();
  var $otros = $select.find('option').not('[value="CL-RM"],[value="CL-VS"]');
  $select.empty()
         .append($rm)
         .append($vs)
         .append($otros);
  if ( $select.hasClass('select2-hidden-accessible') ) {
    $select.select2(); 
  }
});










jQuery(function($){
  const campos = [
    'billing_rut','billing_email','billing_first_name','billing_last_name',
    'billing_phone','shipping_dc','shipping_numero_ubi','shipping_address_3'
  ];

  function restaurarCampos() {
    // 1) Restaura los campos que no dependen de AJAX
    campos.forEach(id => {
      const val = localStorage.getItem(id);
      if (!val) return;
      const $el = $('#' + id);
      if ($el.length) $el.val(val).trigger('change');
    });

    // 2) Restaura primero la Región
    const regionVal = localStorage.getItem('shipping_state');
    if (regionVal) {
      const $state = $('#shipping_state');
      if ($state.length) {
        // Si usas Select2, destrúyelo para resetear…
        if ($state.hasClass('select2-hidden-accessible')) {
          $state.select2('destroy');
        }
        $state.val(regionVal).trigger('change.select2').trigger('change');
        // y vuelve a inicializarlo
        if ($state.hasClass('select2-hidden-accessible')) {
          $state.select2({ placeholder: $state.data('placeholder')||'', width: '100%' });
        }
      }
    }

    // 3) Ahora “escucha” cuándo cargan las opciones de Comuna
    const cityVal = localStorage.getItem('shipping_city');
    if (cityVal) {
      const citySelect = document.getElementById('shipping_city');
      if (citySelect) {
        const obs = new MutationObserver((mutations, observer) => {
          const $city = $('#shipping_city');
          // Si ya existe la opción que queremos…
          if ($city.find(`option[value="${cityVal}"]`).length) {
            // …la seleccionamos y dejamos de observar
            $city.val(cityVal).trigger('change.select2').trigger('change');
            observer.disconnect();
          }
        });
        // observa añadidos de <option> dentro de #shipping_city
        obs.observe(citySelect, { childList: true });
      }
    }
  }

  // 4) disparadores
  $(document).on('change input', '[id]', function(){
    const id = this.id;
    if ([...campos, 'shipping_state','shipping_city'].includes(id)) {
      localStorage.setItem(id, $(this).val());
    }
  });

  restaurarCampos();
  //$(document.body).on('updated_checkout', restaurarCampos);
});




jQuery(function($){
  // Función que marca o desmarca la clase campo-valido en el Select2 de Región
  function updateStateValidClass() {
    const $state = $('#shipping_state'),
          select2data = $state.data('select2');
    if (!select2data) return;

    const $sel = select2data.$container.find('.select2-selection--single');
    if ($state.val()) {
      $sel.addClass('campo-valido');
    } else {
      $sel.removeClass('campo-valido');
    }
  }

  // 1) Tras inicializar Select2 (si lo haces manualmente)
  $('#shipping_state').select2();  // o si ya lo inicializas en otro sitio, omite esta línea
  updateStateValidClass();

  // 2) Cada vez que cambie la región
  $('#shipping_state').on('change', updateStateValidClass);

  // 3) Y también tras las actualizaciones AJAX del checkout
  $(document.body).on('updated_checkout', updateStateValidClass);
});





jQuery(document).on('click', 'a.woocommerce-remove-coupon', function(e) {
    e.preventDefault();
    window.location.href = jQuery(this).attr('href');
});

