<?php

require_once(dirname(__FILE__).'/traking_model.php');

function traking_menu(){
    add_menu_page(
        'Traking Codes',
        'Traking Codes',
        'manage_options',
        'traking-menu',
        'traking_page_content',
        'dashicons-admin-generic',
        3
    );
}

add_action( 'admin_menu', 'traking_menu' );

function traking_page_content() {
    ?>
        <h1>Administrar datos de traking</h1>
        <?php if ($_GET['susses'] === 'true'): ?>
            <h3>Todos los códigos de seguimiento fueron cargados satisfactoriamente.</h3>
            <?php elseif(isset($_GET['susses'])): ?>
            <h3 class="error">Problemas al cargar los códigos de seguimiento. Verifique el formato de su archivo .csv o contacte con el <a href="mailto:carlitos051186@gmail.com">administrador</a>.</h3>
        <?php endif; ?>
        <form method="post" action="<?php echo esc_html( admin_url( 'admin-post.php' ) ); ?>" enctype="multipart/form-data">
 
            <div id="universal-message-container">
                <p>
                    <label>Suba el archivo con extensión .csv</label>
                    <br />
                    <input type="file" name="traking-file" accept=".csv" />
                </p> 
            </div>
    
            <?php
                wp_nonce_field( 'traking-csv-upload', 'traking-csv' );
                submit_button();
            ?>
    
        </form>
    <?php
}

add_action( 'admin_post', 'handleFormTrakingUpload' );

function handleFormTrakingUpload(){
    if ( ! isset( $_POST['traking-csv'] ) || ! wp_verify_nonce( $_POST['traking-csv'], 'traking-csv-upload' ) ) {
        print 'Sorry, your nonce did not verify.';
        exit;
    } else {
        $codes = new TrakingCodes($_FILES["traking-file"]);
        if($codes->saveTrakingsCodes()){
            wp_safe_redirect( urldecode( admin_url('admin.php?page=traking-menu&susses=true') ) );
        }else{
            wp_safe_redirect( urldecode( admin_url('admin.php?page=traking-menu&susses=false') ) );
        }
        
        exit;
    }
}