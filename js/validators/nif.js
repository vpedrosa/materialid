/**
 * Handcrafted with ♥ Beebit Solutions
 * Real coffee was used in this project development
 * Licensed under MIT License
 * contacto@beebit.es
 */

function nif(field, settings) {
    var str = field.val().toString().toUpperCase();
    var is_valid = true;
    if(str != "") {
        is_valid = validateNIE(str) || validateDNI(str);
    }
    return is_valid;
}
