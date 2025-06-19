jQuery(function($) {

    // ================================
    // BLOQUE 3: MODAL FACTURACIÓN (HTML + LÓGICA)
    // ================================
    /**
     * Aplicar Validaciones Específicas a los Campos de RUT
     */
    // Selecciona los campos de RUT de facturación y factura
    let rutInput = document.getElementById('billing_rut');
    let rutFacturaInput = document.getElementById('additional_rut_factura'); // Corregido el ID
    let facturaSelect = document.getElementById('additional_factura');
    let checkoutForm = document.querySelector('form.checkout');
    
    // Variables para almacenar los valores de cada sección
    let section3Values = {};

    // Guardar el HTML de los campos de facturación
    let section3OriginalHtml = $('.woocommerce-additional-fields').html();

    // Inyecta el HTML del modal solo si aún no existe
    if ($('#facturaModal').length === 0) {
        $('body').append(`
        <div id="overlayModal" class=""></div>
            <div id="facturaModal" class="factura-modal">
                <div class="factura-modal-content">
                    <span id="modalClose" class="modal-close">&times;</span>
                    <div class="css-pp5wq7"><svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Group 294"><g id="Group"><g id="Group_2"><path id="Vector" d="[...]"/>
                    <div class="woocommerce-additional-fields">
                        <div id="facturaFieldsModal">
                            <!-- div con campos de facturación -->
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    // Mueve los campos de facturación adicionales al modal
    $('#additional_razon_social_field, #additional_giro_field, #additional_rut_factura_field, #additional_telefono_factura_field, #additional_direccion_factura_field, #additional_ciudad_field, #additional_comuna_field, #additional_correo_factura_field')
        .appendTo('#facturaFieldsModal');

    // Botones y triggers para abrir/cerrar el modal
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

    // Al guardar, cierra el modal (con delay)
    $(document).on('click', '.btnGuar', function() {
        setTimeout(function() {
            $('#facturaModal').removeClass('active');
            $('#overlayModal').removeClass('overlayModal');
        }, 500);
    });
    
    
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
    
                // Cambiar el valor del select a "Factura"
                $('#additional_factura').val('Factura').trigger('change');
                console.log($('#additional_factura').val());
                
                section3Values = {};
                section3Values['additional_factura'] = 'Factura';
    
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
                console.log($('#additional_factura').val());
            
                // Limpiar section3Values y establecer 'additional_factura' a 'Boleta'
                section3Values = {};
                section3Values['additional_factura'] = 'Boleta';
            
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
    window.checkSection3Fields=function() {
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

});