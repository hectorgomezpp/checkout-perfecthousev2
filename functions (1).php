<?php
/**
 * perfectpool Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package perfectpool 
 * @since 3.0
 */

/**
 * Define Constants
 */
define('CHILD_THEME_PERFECTPOOL_VERSION', '3.0');

if (class_exists('LiteSpeed_Cache')) {
    LiteSpeed_Cache_API::config_set('media.cssjs', 1);
    LiteSpeed_Cache_API::config_set('media.webp', 1);
    LiteSpeed_Cache_API::config_set('media.lazy', 1);
}


function child_enqueue_styles() {
    wp_enqueue_style('perfectpool-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), CHILD_THEME_PERFECTPOOL_VERSION, 'all');
}
add_action('wp_enqueue_scripts', 'child_enqueue_styles', 15);

function diferir_carga_css() {
    ?>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var link = document.querySelector('link[rel="preload"][as="style"]');
            if (link) {
                link.rel = 'stylesheet';
            }
        });
    </script>
    <?php
}
add_action('wp_head', 'diferir_carga_css', 20);

function agregar_recursos_select2() {
    // Incluir jQuery (ya viene en WordPress, pero esta es la versión de CDN específica)
    wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.6.0.min.js', array(), '3.6.0', true);

    // Incluir Select2 CSS
    wp_enqueue_style('select2-css', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css', array(), '4.1.0');

    // Incluir Select2 JS
    wp_enqueue_script('select2-js', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js', array('jquery'), '4.1.0', true);

    // Incluir tu script personalizado
   // wp_enqueue_script('custom-script', get_template_directory_uri() . '/path/to/your/custom-script.js', array('jquery', 'select2-js'), null, true);
}
add_action('wp_enqueue_scripts', 'agregar_recursos_select2');



function cargar_bootstrap() {
    if (is_account_page() || is_cart() || is_checkout()) {
        return;
    }

    wp_register_style('bootstrap-css', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css', array(), '4.5.2', 'all');
    wp_enqueue_style('bootstrap-css');

    wp_register_script('bootstrap-js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js', array('jquery'), '4.5.2', true);
    wp_enqueue_script('bootstrap-js');
}
add_action('wp_enqueue_scripts', 'cargar_bootstrap');



function enqueue_jquery_ui_slider() {
    wp_enqueue_script('jquery-ui-slider');
    wp_enqueue_style('jquery-ui-slider', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
}
add_action('wp_enqueue_scripts', 'enqueue_jquery_ui_slider');


function encolar_scripts_footer_perfectpool() {
    wp_enqueue_script('scripts-footer', get_stylesheet_directory_uri() . '/js/scripts-footer.js', array(), CHILD_THEME_PERFECTPOOL_VERSION, true);
}
add_action('wp_enqueue_scripts', 'encolar_scripts_footer_perfectpool');




function cambiar_texto_boton_woocommerce( $text ) {
    if ( $text == 'Añadir al carrito' ) {
        return 'Añadir al carro';
    }
    return $text;
}
add_filter( 'woocommerce_product_single_add_to_cart_text', 'cambiar_texto_boton_woocommerce' ); // Cambia el texto en la página de producto individual
add_filter( 'woocommerce_product_add_to_cart_text', 'cambiar_texto_boton_woocommerce' ); // Cambia el texto en las páginas de archivo de productos


/* Función mejorada para agregar autocompletado de Google Maps en checkout */
function api_script_google_maps_checkout() {
    if (is_checkout()) {
        // Registrar scripts
        wp_register_script(
            'google-maps',
            'https://maps.googleapis.com/maps/api/js?key=' . GOOGLE_MAPS_API_KEY . '&libraries=places&region=CL',
            array(),
            null,
            true
        );

        wp_register_script(
            'autocomplete',
            get_stylesheet_directory_uri() . '/js/autocomplete-version-2.js',  
            array('jquery', 'google-maps'),
            '1.0.0',
            true
        );

        wp_register_script(
            'checkout-accord',
            get_stylesheet_directory_uri() . '/js/checkout-accord-version-2.js',
            array('jquery'),
            '1.0.0',
            true
        );
        
        wp_register_script(
            'utils-checkout',
            get_stylesheet_directory_uri() . '/js/utils-checkout.js',
            array('jquery'),
            '1.0.0',
            true
        );

        //Encolar scripts
        wp_enqueue_script('google-maps');
        wp_enqueue_script('autocomplete');
        wp_enqueue_script('checkout-accord');
        wp_enqueue_script('utils-checkout');
    }
}
add_action('wp_enqueue_scripts', 'api_script_google_maps_checkout');
/* FIN DE FUNCIÓN */

function extender_tiempo_sesion($expirein) {
    return 60 * 60 * 24 * 30; // 30 días
}
add_filter('auth_cookie_expiration', 'extender_tiempo_sesion');


function extender_sesion_woocommerce( $expiracion ) {
    return 60 * 60 * 24 * 30; // 30 días
}
add_filter( 'woocommerce_session_expiration', 'extender_sesion_woocommerce' );

/*

add_action( 'init', 'ph_capture_apply_coupon' );
function ph_capture_apply_coupon() {
    // Sólo si WooCommerce está inicializado
    if ( ! class_exists( 'WooCommerce' ) || ! WC()->session ) {
        return;
    }

    if ( ! empty( $_GET['apply_coupon'] ) ) {
        $code = sanitize_text_field( wp_unslash( $_GET['apply_coupon'] ) );

        // Si el carrito está vacío, lo guardamos en sesión...
        if ( WC()->cart->get_cart_contents_count() === 0 ) {
            WC()->session->set( 'pending_coupon', $code );
        }
        // ... si ya hay productos, lo aplicamos de una vez
        else {
            WC()->cart->apply_coupon( $code );
        }
    }
}

// 2) Al añadir el primer producto, aplicamos cualquier "pending_coupon"
add_action( 'woocommerce_add_to_cart', 'ph_apply_pending_coupon' );
function ph_apply_pending_coupon() {
    if ( ! class_exists( 'WooCommerce' ) || ! WC()->session ) {
        return;
    }

    $code = WC()->session->get( 'pending_coupon' );
    if ( $code ) {
        WC()->cart->apply_coupon( $code );
        WC()->session->__unset( 'pending_coupon' );
    }
}

*/


















































/*
// IDs de los usuarios a rastrear
$usuarios_a_rastrear = [5378, 5379, 1];

// Función para registrar acciones en archivos separados
function registrar_accion_admin($accion, $detalle = '') {
    if (!is_user_logged_in()) {
        return;
    }

    $user = wp_get_current_user();
    global $usuarios_a_rastrear;

    // Verificar si el usuario está en la lista de rastreo
    if (!in_array($user->ID, $usuarios_a_rastrear)) {
        return;
    }

    // Obtener datos adicionales
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'Desconocido';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Desconocido';
    $current_url = home_url(add_query_arg([], $_SERVER['REQUEST_URI']));

    $log = sprintf(
        "[%s] Usuario: %s (ID: %d) - Acción: %s - Detalle: %s - IP: %s - Navegador: %s - URL: %s\n",
        date('Y-m-d H:i:s'),
        $user->user_login,
        $user->ID,
        $accion,
        $detalle,
        $ip,
        $user_agent,
        $current_url
    );

    // Directorio de logs
    $log_dir = WP_CONTENT_DIR . '/logs-admin/';
    if (!file_exists($log_dir)) {
        mkdir($log_dir, 0755, true); // Crear carpeta si no existe
    }

    // Nombre del archivo log específico para cada usuario
    $log_file = $log_dir . "admin-log-{$user->ID}.txt";

    // Guardar el log en el archivo correspondiente
    file_put_contents($log_file, $log, FILE_APPEND | LOCK_EX);
}

// Hooks para registrar eventos importantes

// Registrar URLs visitadas por los admins rastreados
add_action('wp', function () {
    registrar_accion_admin('Visitó una página', 'Página: ' . home_url(add_query_arg([], $_SERVER['REQUEST_URI'])));
});

// Creación y actualización de posts
add_action('wp_insert_post', function ($post_id, $post, $update) {
    registrar_accion_admin($update ? 'Actualizó un post' : 'Creó un post', "ID: $post_id - Título: $post->post_title");
}, 10, 3);

// Eliminación de posts
add_action('delete_post', function ($post_id) {
    registrar_accion_admin('Eliminó un post', "ID: $post_id");
});

// Actualización de opciones
add_action('updated_option', function ($option_name, $old_value, $new_value) {
    registrar_accion_admin('Actualizó una opción', "Opción: $option_name");
}, 10, 3);

// Eliminación de opciones
add_action('deleted_option', function ($option_name) {
    registrar_accion_admin('Eliminó una opción', "Opción: $option_name");
});

// Inicio de sesión
add_action('wp_login', function ($user_login, $user) {
    registrar_accion_admin('Inició sesión', "Usuario: $user_login");
}, 10, 2);

// Cierre de sesión
add_action('wp_logout', function () {
    registrar_accion_admin('Cerró sesión');
});

// Cambio de contraseña
add_action('password_reset', function ($user) {
    registrar_accion_admin('Cambió su contraseña', "Usuario: $user->user_login");
});

// Edición de perfiles
add_action('profile_update', function ($user_id, $old_user_data) {
    registrar_accion_admin('Editó su perfil', "ID Usuario: $user_id");
}, 10, 2);

// Eliminación de usuarios
add_action('delete_user', function ($user_id) {
    registrar_accion_admin('Eliminó un usuario', "ID Usuario: $user_id");
});

// Cambios en el menú de administración
add_action('admin_menu', function () {
    registrar_accion_admin('Visitó el panel de administración', 'Sección: ' . get_admin_page_title());
});

// Visualización de productos en WooCommerce (si WooCommerce está activo)
if (class_exists('WooCommerce')) {
    add_action('woocommerce_before_shop_loop', function () {
        registrar_accion_admin('Visitó la tienda', 'Página de productos');
    });

    add_action('woocommerce_before_single_product', function () {
        global $product;
        if ($product) {
            registrar_accion_admin('Vio un producto', 'Producto: ' . $product->get_name());
        }
    });
}

// ================================================
// Registro de eventos de copiar, cortar y eliminar texto
// ================================================

// 1. Endpoint AJAX para registrar la acción de copiar/cortar/eliminar texto
function registrar_accion_usuario_ajax() {
    if (!is_user_logged_in()) {
        wp_die('No autorizado');
    }
    $user = wp_get_current_user();
    global $usuarios_a_rastrear;
    if (!in_array($user->ID, $usuarios_a_rastrear)) {
        wp_die('No autorizado');
    }

    // Se recomienda implementar validaciones adicionales, como un nonce
    $accion  = isset($_POST['accion']) ? sanitize_text_field($_POST['accion']) : '';
    $detalle = isset($_POST['detalle']) ? sanitize_text_field($_POST['detalle']) : '';

    if ($accion) {
        registrar_accion_admin($accion, $detalle);
    }
    wp_die('OK');
}
add_action('wp_ajax_registrar_accion_usuario', 'registrar_accion_usuario_ajax');

// 2. Inyección de JavaScript para detectar eventos de copiar, cortar y eliminar texto
function agregar_listeners_texto() {
    ?>
    <script>
    (function() {
        // Función para enviar datos al servidor vía AJAX
        function enviarAccion(accion, detalle) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "<?php echo admin_url('admin-ajax.php'); ?>", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send("action=registrar_accion_usuario&accion=" + encodeURIComponent(accion) + "&detalle=" + encodeURIComponent(detalle));
        }

        // Función para obtener el texto seleccionado en inputs, textareas o contenido editable
        function obtenerTextoSeleccionado() {
            var activeEl = document.activeElement;
            var texto = '';
            if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
                var start = activeEl.selectionStart;
                var end = activeEl.selectionEnd;
                texto = activeEl.value.substring(start, end);
            } else {
                texto = window.getSelection().toString();
            }
            return texto.trim();
        }

        // Evento para copiar texto
        document.addEventListener('copy', function(e) {
            var texto = obtenerTextoSeleccionado();
            if (texto) {
                enviarAccion('Copió texto', 'Texto: ' + texto);
            }
        });

        // Evento para cortar texto
        document.addEventListener('cut', function(e) {
            var texto = obtenerTextoSeleccionado();
            if (texto) {
                enviarAccion('Cortó texto', 'Texto: ' + texto);
            }
        });

        // Evento para detectar cuando se presiona Delete o Backspace
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                var texto = obtenerTextoSeleccionado();
                if (texto) {
                    enviarAccion('Eliminó texto', 'Texto: ' + texto);
                }
            }
        });
    })();
    </script>
    <?php
}
// Inyectar el script tanto en el front-end como en el área de administración
add_action('wp_footer', 'agregar_listeners_texto');
add_action('admin_footer', 'agregar_listeners_texto');
*/