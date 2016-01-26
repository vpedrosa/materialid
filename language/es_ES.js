/**
 * Handcrafted with ♥ Beebit Solutions
 * Real coffee was used in this project development
 * Licensed under MIT License
 * contacto@beebit.es
 */

materialid.lang.es_ES = function() {
    var messages =
    {
        notEmpty: "Este campo es obligatorio.",
        checked: "Tienes seleccionar esta casilla para continuar.",
        one_checked: "Tienes seleccionar al menos una casilla para continuar.",
        n_checked: "Tienes seleccionar al menos %a% casillas para continuar.",
        dni: "Ha de ser un DNI válido.",
        nie: "Ha de ser un NIE válido.",
        dni_nie: "Ha de ser un DNI válido.",
        cif: "Ha de ser un CIF válido.",
        nif_cif: "Ha de ser un DNI, NIE o CIF válido.",
        digits: "Ha de contener sólo números.",
        numeric: "Ha de contener sólo números.",
        between: "Debe contener entre  %a% y %b% caracteres.",
        exact: "Debe tener exáctamente %a% caracteres.",
        nif: "Ha de ser un DNI o NIE válido.",
        regexp: "El valor de este campo no es correcto."
    }
    var config =
    {
        next_text:"Siguiente",
        previous_text:"Anterior",
        ending_button_text:"Enviar",
        starting_button_text:"Comenzar"
    }
    $.extend(materialid.messages, messages);
    $.extend(materialid.config, config);
}
