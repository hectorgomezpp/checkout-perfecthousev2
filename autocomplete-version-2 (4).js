jQuery(document).ready(function($) {
    var isUserEditingAddress = false; // Variable para controlar si el usuario está editando la dirección
    
    // Función para inicializar el autocompletado de Google Maps 
    function initAutocomplete() {
        // Limpiar el campo de dirección al cargar la página del checkout
        // $('#shipping_dc').val('');
        // $('#shipping_address_3').val('');
        
        var input = document.getElementById('shipping_dc');
        if (!input) {
            console.log("Campo de dirección no encontrado");
            return;
        }
    
        var options = {
            componentRestrictions: { country: 'cl' },
            fields: ['address_components', 'formatted_address']
        };
    
        var autocomplete = new google.maps.places.Autocomplete(input, options);
    
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            var fullAddress = place.formatted_address;
            var hasStreetNumber = false;
    
            // Borrar número de la ubicación al cambiar dirección
            $('#shipping_numero_ubi').val('');
            $('#shipping_numero_ubi_field').remove();
    
            // Detectar si existe el componente street_number en la dirección
            for (var i = 0; i < place.address_components.length; i++) {
                if (place.address_components[i].types[0] === 'street_number') {
                    hasStreetNumber = true;
                    $('#shipping_numero_ubi').val(place.address_components[i].long_name);
                    break;
                }
            }
    
            // Verificar si en el valor de la dirección (formatted_address) se encuentra algún dígito
            var hasNumberInAddress = fullAddress ? /\d/.test(fullAddress) : false;
    
            // Si NO se encuentra el street_number y no hay dígitos en la dirección, crear campo para solicitarlo
            if (!hasStreetNumber && !hasNumberInAddress) {
                if (!$('#shipping_numero_ubi_field').length) {
                    $('<div style="width:100%; padding: 0px; margin-top: 3px;" class="form-row" id="shipping_numero_ubi_field">' +
                      '<label for="shipping_numero_ubi">Número de su ubicación<span style="color:red;">*</span></label>' +
                      '<input type="text" id="shipping_numero_ubi" style="width:100%;" name="shipping_numero_ubi" placeholder="Número de ubicación" autocomplete="off" required>' +
                      '</div>').insertAfter('input#shipping_dc[type="text"]');
    
                    $('#shipping_numero_ubi').on('input', window.checkShippingFields);
    
                    requestAnimationFrame(function() {
                        var field = document.querySelector('#shipping_numero_ubi');
                        if (field) {
                            field.focus();
                        }
                    });
    
                    window.checkShippingFields();
                }
            } else {
                // Si la dirección ya contiene un número o el componente street_number, se elimina el campo manual
                $('#shipping_numero_ubi_field').remove();
                window.checkShippingFields();
            }
    
            // Obtener la región (state) y ciudad (city) desde la dirección
            var state = '';
            var city = '';
            for (var j = 0; j < place.address_components.length; j++) {
                var addressType = place.address_components[j].types[0];
                if (addressType === 'administrative_area_level_1') {
                    state = getRegionCode(place.address_components[j].long_name);
                } else if (addressType === 'locality') {
                    city = place.address_components[j].long_name;
                }
            }
    
            // Obtener código de comuna (comunaCode)
            var comunaCode = getComunaCode(city, state);
    
            // Actualizar y bloquear campos de región y ciudad
            if (state && $('#shipping_state').length) {
                $('#shipping_state').val(state).trigger('change');
                lockSelect2Field('#shipping_state');
            } else {
                unlockSelect2Field('#shipping_state');
            }
    
            setTimeout(function() {
                var $cityField = $('#shipping_city');
                console.log("Aqui estoy");
                if ($cityField.is('input[type="text"]') && comunaCode) {
                    var $newCitySelect = $('<select>', {
                        name: 'shipping_city',
                        id: 'shipping_city',
                        class: 'city_select',
                        'data-placeholder': 'Selecciona una comuna…'
                    });
    
                    var regionComunas = typeof places !== 'undefined' && places['CL'] && places['CL'][state] ? places['CL'][state] : null;
    
                    if (regionComunas) {
                        $.each(regionComunas, function(nombreComuna, valorComuna) {
                            var selected = (valorComuna === comunaCode) ? 'selected' : '';
                            $newCitySelect.append('<option value="' + valorComuna + '" ' + selected + '>' + valorComuna + '</option>');
                        });
    
                        $cityField.replaceWith($newCitySelect);
    
                        if (typeof $.fn.select2 === 'function') {
                            $newCitySelect.select2();
                        }
    
                        $(document.body).trigger('update_checkout');
                        lockSelect2Field('#shipping_state');
                        lockSelect2Field('#shipping_city');
                    }
                } else if (comunaCode) {
                    $('#shipping_city').val(comunaCode).trigger('change');
                    $(document.body).trigger('update_checkout');
                    lockSelect2Field('#shipping_city');
                } else {
                    $(document.body).trigger('update_checkout');
                }
            }, 100);
    
            if (fullAddress && input) {
                $(input).val(fullAddress);
                $(input).trigger('input');
                window.checkShippingFields();
            }
    
            // Forzar la actualización del checkout para asegurar el costo de envío
            $(document.body).trigger('update_checkout');
        });
    }
    
    // Función para revisar shipping_dc si ya tiene un valor precargado y procesarlo mediante geocoder
    function processShippingAddress() {
        var shippingAddress = $('#shipping_dc').val().trim();
        if (shippingAddress !== "") {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: shippingAddress, componentRestrictions: { country: 'cl' } }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    var place = results[0];
                    var hasStreetNumber = false;
                    // Verificar en los componentes si existe número de calle
                    for (var i = 0; i < place.address_components.length; i++) {
                        if (place.address_components[i].types.indexOf('street_number') !== -1) {
                            hasStreetNumber = true;
                            $('#shipping_numero_ubi').val(place.address_components[i].long_name);
                            break;
                        }
                    }
    
                    // Detectar si el valor precargado en shipping_dc tiene dígito(s)
                    var hasNumberInAddress = /\d/.test(shippingAddress);
    
                    // Si NO se encuentra el street_number y no hay dígitos en la dirección, crear el campo para solicitarlo
                    if (!hasStreetNumber && !hasNumberInAddress) {
                        if (!$('#shipping_numero_ubi_field').length) {
                            $('<div style="width:100%; padding: 0px; margin-top: 3px;" class="form-row" id="shipping_numero_ubi_field">' +
                              '<label for="shipping_numero_ubi">Número de su ubicación<span style="color:red;">*</span></label>' +
                              '<input type="text" id="shipping_numero_ubi" style="width:100%;" name="shipping_numero_ubi" placeholder="Número de ubicación" autocomplete="off" required>' +
                              '</div>').insertAfter('input#shipping_dc[type="text"]');
    
                            $('#shipping_numero_ubi').on('input', window.checkShippingFields);
                            window.checkShippingFields();
                        }
                    } else {
                        $('#shipping_numero_ubi_field').remove();
                        window.checkShippingFields();
                    }
                } else {
                    console.log("No se pudo geocodificar la dirección: " + status);
                }
            });
        }
    }
    
    // Ejecutar ambas funciones cuando se cargue la página
    $(document).ready(function() {
        initAutocomplete();
        processShippingAddress(); // Verifica shipping_dc precargado para mostrar u ocultar el campo del número
    
        // Se agrega el evento blur en shipping_dc para verificar si tiene dígitos
        $('#shipping_dc').on('blur', function() {
            var shippingVal = $(this).val().trim();
            // Si hay texto pero no contiene ningún dígito
            if (shippingVal !== "" && !/\d/.test(shippingVal)) {
                if (!$('#shipping_numero_ubi_field').length) {
                    $('<div style="width:100%; padding: 0px; margin-top: 3px;" class="form-row" id="shipping_numero_ubi_field">' +
                      '<label for="shipping_numero_ubi">Número de su ubicación<span style="color:red;">*</span></label>' +
                      '<input type="text" id="shipping_numero_ubi" style="width:100%;" name="shipping_numero_ubi" placeholder="Número de ubicación" autocomplete="off" required>' +
                      '</div>').insertAfter('input#shipping_dc[type="text"]');
    
                    $('#shipping_numero_ubi').on('input', window.checkShippingFields);
                }
                window.checkShippingFields();
            } else {
                // Si el campo contiene al menos un dígito, eliminamos el campo adicional
                $('#shipping_numero_ubi_field').remove();
                window.checkShippingFields();
            }
        });
    });
    
    
    // Inicializar autocompletado al cargar la página
    initAutocomplete();
    $("#shipping_state").val("").trigger("change.select2");
    $("#shipping_city").val("").trigger("change.select2");
    $(document.body).trigger('update_checkout');
    
    // Exponer la función al objeto window para poder llamarla desde otros scripts
    window.initAutocomplete = initAutocomplete;
    
    // Cuando el usuario vuelve a escribir en #shipping_dc, desbloquear los selects
    $('#shipping_dc').on('input', function() {
        isUserEditingAddress = true; // El usuario está editando la dirección
    
        // Desbloquear los campos si el usuario está interactuando
        unlockSelect2Field('#shipping_state');
        unlockSelect2Field('#shipping_city');
    });
    
    // Antes de enviar el formulario, asegurarse de que los campos no estén bloqueados
    $('form.checkout').on('submit', function(e) {
        // Desbloquear los campos antes de enviar
        unlockSelect2Field('#shipping_state');
        unlockSelect2Field('#shipping_city');
    
        // Verificar si hay errores después de enviar el formulario con AJAX
        setTimeout(function() {
            if ($('.woocommerce-invalid').length > 0) {
                lockSelect2Field('#shipping_state');
                lockSelect2Field('#shipping_city');
            }
        }, 500);
    });
    
    // WooCommerce dispara este evento cuando hay un error en el envío
    $(document.body).on('checkout_error', function() {
        if ($('.woocommerce-invalid').length > 0) {
            lockSelect2Field('#shipping_state');
            lockSelect2Field('#shipping_city');
        }
    });
    
    $('#shipping_state').select2();
    
    function lockSelect2Field(fieldId) {
    // 1) guardar el valor actual de la comuna
    const ciudadSeleccionada = $(fieldId).val();
    localStorage.setItem('shipping_city', ciudadSeleccionada);

    // 2) deshabilitar campo y aplicar estilo
    $(fieldId).prop('disabled', true).css('background-color', '#dbdbdb');
    if ($(fieldId).data('select2')) {
        var $customContainer = $(fieldId).data('select2').$container
            .find('span.select2-selection.select2-selection--single.shipping_city_box');
        $customContainer.addClass('select2locked2').css('background-color', '#dbdbdb');
    }
}
    
    function unlockSelect2Field(fieldId) {
        $(fieldId).prop('disabled', false);
        if ($(fieldId).data('select2')) {
            var $container = $(fieldId).data('select2').$container;
            $container.removeClass('select2-locked');
        }
    }
    
    // Validaciones dinámicas del campo #shipping_numero_ubi
    $(document).on('blur', '#shipping_numero_ubi', function() {
        if (!$(this).val()) {
            $(this).css('border-color', 'red');
        } else {
            $(this).css('border-color', '#00e700');
        }
    });
    
    $(document).on('focus', '#shipping_numero_ubi', function() {
        $(this).css('border-color', '');
    });
    
    $(document).on('input', '#shipping_numero_ubi', function() {
        if ($(this).val()) {
            $(this).css('border-color', '#00e700');
        } else {
            $(this).css('border-color', 'red');
        }
    });
    
    $('form.checkout').on('submit', function() {
        var isValid = true;
        if ($('#shipping_numero_ubi').is(':visible') && !$('#shipping_numero_ubi').val()) {
            $('#shipping_numero_ubi').css('border-color', 'red');
            isValid = false;
        }
        return isValid;
    });
    
    
    jQuery(function($){
        
        let lastRegionProcessed = null;  // guardián para no procesar dos veces la misma región
        
      // 1) Función para construir el <select> de comunas según la región
      function buildCitySelect(regionCode) {
        var regionComunas = places['CL'][regionCode];
        if (!regionComunas) return;
    
        var $old = $('#shipping_city'),
            $new = $('<select>', {
              name: 'shipping_city',
              id:   'shipping_city',
              class: 'city_select',
              'data-placeholder': 'Selecciona una comuna…'
            });
    
        $.each(regionComunas, function(_, comuna) {
          $new.append($('<option>', { value: comuna, text: comuna }));
        });
    
        $old.replaceWith($new);
    
        if ($.fn.select2) {
          $new.select2({ placeholder: $new.data('placeholder')||'', width: '100%' });
          $new
            .data('select2')
            .$container
            .find('.select2-selection--single')
            .addClass('shipping_city_box campo-valido');
        }
      }
    
      // 2) Lista de campos a guardar/restaurar
      const campos = [
        'billing_rut','billing_email','billing_first_name','billing_last_name',
        'billing_phone','shipping_dc','shipping_numero_ubi','shipping_address_3'
      ];
    
      function restaurarCampos() {
        // 2.1) Restaurar inputs/textfields
        campos.forEach(id => {
          const val = localStorage.getItem(id);
          if (!val) return;
          const $el = $('#' + id);
          if ($el.length) $el.val(val).trigger('change');
        });
    
        // 2.2) Restaurar Región
        const regionVal = localStorage.getItem('shipping_state');
        if (regionVal) {
          const $state = $('#shipping_state');
          if ($state.length) {
            // Si tiene select2, destróyelo momentáneamente
            if ($state.hasClass('select2-hidden-accessible')) {
              $state.select2('destroy');
            }
            $state.val(regionVal).trigger('change.select2').trigger('change');
    
            // Reinic. select2
            if (!$state.hasClass('select2-hidden-accessible')) {
              $state.select2({ placeholder: $state.data('placeholder')||'', width: '100%' });
            }
          }
        }
    
        // 2.3) Restaurar Comuna (si ya existe la opción)
        const cityVal = localStorage.getItem('shipping_city');
        if (cityVal) {
          const $city = $('#shipping_city');
          if ($city.find(`option[value="${cityVal}"]`).length) {
            $city.val(cityVal).trigger('change.select2').trigger('change');
          }
        }
      }
    
      // 3) Guardar en localStorage al cambiar cualquiera de estos campos
      $(document).on('change input', '[id]', function(){
        const id = this.id;
        if ([...campos, 'shipping_state','shipping_city'].includes(id)) {
          localStorage.setItem(id, $(this).val());
        }
      });
    
      // 4) Al cambiar la Región, rebuild de comuna + restaurar valor guardado
      $('#shipping_state').on('change', function(){
        const code    = $(this).val();
        const cityVal = localStorage.getItem('shipping_city');
    
        buildCitySelect(code);
    
        if (cityVal) {
          const $city = $('#shipping_city');
          if ($city.find(`option[value="${cityVal}"]`).length) {
            unlockSelect2Field('#shipping_city');
            $city.val(cityVal).trigger('change.select2').trigger('change');
            //lockSelect2Field('#shipping_city');
          }
        }
    
        $(document.body).trigger('update_checkout');
      });
    
      // 5) Tras cada updated_checkout (AJAX), igual rebuild + restore
        $(document.body).on('updated_checkout', function(){
            const code    = $('#shipping_state').val();
            if (!code || code === lastRegionProcessed) {
              // si no cambió la región, no hacemos nada
              return;
            }
            lastRegionProcessed = code;
        
            // reconstruimos y restauramos comuna
            buildCitySelect(code);
            const cityVal = localStorage.getItem('shipping_city');
            if (cityVal) {
              const $city = $('#shipping_city');
              if ($city.find(`option[value="${cityVal}"]`).length) {
                unlockSelect2Field('#shipping_city');
                $city.val(cityVal).trigger('change.select2').trigger('change');
                //lockSelect2Field('#shipping_city');
              }
            }
        
            window.checkShippingFields && window.checkShippingFields();
          });
    
      // 6) Inicializamos al cargar la página
      restaurarCampos();
    });
    
    
    
    
    
    
    // Anexar funciones al objeto window para que sean globales
    window.getRegionCode = getRegionCode;
    window.getComunaCode = getComunaCode;
    window.lockSelect2Field = lockSelect2Field;
    window.unlockSelect2Field = unlockSelect2Field;
    
    $(document).ready(function() {
        window.checkShippingFields();
    });
        
    
    
      
         
    });
    