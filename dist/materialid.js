/**
 * Copyright © 2016 Beebit Solutions
 * All rights reserved
 * Licensed under MIT License
 * Author: Valentín Pedrosa
 * valentin@beebitsolutions.com
 */
/**
 * Materialid default options
 * @type {{fields: undefined, configs: {locale: string, trigger: string, error_callback: errorCallback, success_callback: successCallback, steps: undefined, on_forward: undefined, on_backward: undefined, enable_visible: boolean}, form_obj: {selector: undefined, is_valid: boolean}}}
 */
var materialid = {
    fields: undefined,
    configs: {
        locale: "es_ES",
        trigger: "change",
        "error_callback": errorCallback,
        "success_callback": successCallback,
        steps: undefined,
        on_forward: undefined,
        on_backward: undefined,
        enable_visible: true
    },
    form_obj: {
        selector: undefined,
        is_valid: true
    }
}

/**
 * Index of current defined validators
 * @type {{notEmpty: notEmpty}}
 */
var callbacksIndex = {
    "notEmpty": notEmpty,
    "regexp" : regexp,
    "digits" : digits,
    "numeric" : numeric,
    "dni" : dni,
    "nie" : nie,
    "cif" : cif,
}

/**
 * Overloading of jQuery function
 */
jQuery.fn.extend({
    materialid: function (config_array) {
        initMaterialid(this, config_array)
    }
});

/**
 * Initialization of Materialid
 * @param selector
 * @param config_array
 */
function initMaterialid(selector, config_array) {
    validateContainer(selector, config_array)
}

/**
 * Materialid container validation
 * @param selector
 * @param config_array
 */
function validateContainer(selector, config_array) {
    if (selector.is("form")) {
        initListeners(selector, config_array);
        //Attaching form submit validation
        selector.submit(function (e) {
            evaluateFields(selector, config_array);
            if (!materialid.form_obj.is_valid) {
                e.preventDefault();
            } else {
                return;
            }
        });
    } else if (selector.is("div")) {
        initListeners(selector, config_array);
    } else {
        console.log("Invalid selector: ", selector);
        console.log("Types availables: div and form.");
    }
}
/**
 * Inits the fields' listeners to invoke validation
 * @param selector
 * @param config_array
 */
function initListeners(selector, config_array) {
    $.each(config_array.fields, function (k, v) {
        addValidationListenerToField(selector.find("#" + k), v);
    })
}

/**
 * Attach a validation listener to a field
 * @param field
 * @param validators
 */
function addValidationListenerToField(field, validators) {
    if (materialid.configs.trigger == "change") {
        field.change(function () {
            validateField(field, validators);
        })
    } else {
        //TODO: attach to trigger
    }
}

/**
 * Validates a single field bearing in mind the "enable_visible" configuration option
 * @param field
 * @param validators
 * @returns {boolean}
 */
function validateField(field, validators) {
    var field_valid = true;
    var msg = "";
    if ((materialid.configs.enable_visible && field.is(":visible")) || !materialid.configs.enable_visible) {
        $.each(validators, function (k, v) {
            field_valid = validator(field, k, v) ? field_valid : false;
            msg = messages[k];
        })
        field_valid ? successCallback(field, msg) : errorCallback(field, msg);
        materialid.form_obj.is_valid = field_valid ? materialid.form_obj.is_valid : false;
    }
    return field_valid;
}

/**
 * Evaluate all fields without calling or invoking listeners.
 * @param selector
 * @param config_array
 */
function evaluateFields(selector, config_array) {
    $.each(config_array.fields, function (k, v) {
        validateField(selector.find("#" + k), v);
    })
}

/**
 * Calls a concrete validator if exists, or return false and output an error on the console.
 * @param field
 * @param callback
 * @param settings
 * @returns {*}
 */
function validator(field, callback, settings) {
    if (typeof callbacksIndex[callback] !== "undefined") {
        return callbacksIndex[callback](field, settings);
    } else {
        console.log("Callback " + callback + " undefined.");
        return false;
    }
}

/**
 * Default error callback
 * @param field
 * @param msg
 */
function errorCallback(field, msg) {
    if ($("#" + field.attr("id") + "_validation_msg").length == 0) {
        field.after("<span id='" + field.attr("id") + "_validation_msg' class='validation-msg'></span>");
    }
    $("#" + field.attr("id") + "_validation_msg").text(msg);
    field.removeClass("valid").addClass("invalid");
}

/**
 * Default success callback
 * @param field
 * @param msg
 */
function successCallback(field, msg) {
    console.log("successCalled");
    $("#" + field.attr("id") + "_validation_msg").remove();
    console.log("#" + field.attr("id") + "_validation_msg", $("#" + field.attr("id") + "_validation_msg"))
    field.removeClass("invalid").addClass("valid");
}
/** @namespace Number.MAX_SAFE_INTEGER */
/** @namespace Number.MIN_SAFE_INTEGER */
/**
 * Returns true if field value is between two parameters.
 * Check if is numeric value. No point to use it along numeric.
 * -----------------------------------
 * Default options are:
 * between:{
 *  min:-Number.MIN_SAFE_INTEGER,
 *  max:Number.MAX_SAFE_INTEGER,
 *  min_included:false,
 *  max_included:false
 * }
 * -----------------------------------
 * @param field
 * @param settings
 * @returns {boolean}
 */
function between(field,settings)
{
    typeof settings["min_included"] !== "undefined" ? null : settings.min_included = false;
    typeof settings["max_included"] !== "undefined" ? null : settings.max_included = false;
    typeof settings["min"] !== "undefined" ? null : settings.min = Number.MIN_SAFE_INTEGER;
    typeof settings["max"] !== "undefined" ? null : settings.max = Number.MAX_SAFE_INTEGER;
    var is_valid = false;
    var value = field.val();
    if(!isNaN(value)) {
        (settings.min < value && value < settings.max) ? is_valid = true : null;
        if(settings.min_included && !settings.max_included) {
            (settings.min <= value && value < settings.max) ? is_valid = true : null;
        } else if(!settings.min_included && settings.max_included) {
            (settings.min < value && value <= settings.max) ? is_valid = true : null;
        } else if(settings.min_included && settings.max_included){
            (settings.min <= value && value <= settings.max) ? is_valid = true : null;
        }
    }
    return is_valid;
}
/**
 * Checks if the field value is a valid spanish Company ID (CIF)
 * @param field
 * @param settings
 * @returns {boolean}
 */
function cif(field, settings) {
    if (notEmpty(field)) {
        var value = field.val().toUpperCase();
        var is_valid = false;
        var pares = 0;
        var impares = 0;
        var suma;
        var ultima;
        var unumero;
        var uletra = ["J", "A", "B", "C", "D", "E", "F", "G", "H", "I"];
        var xxx;
        var regular = /^[ABCDEFGHKLMNPQS]\d{7}[0-9,A-J]$/g;
        if (regular.test(value)) {
            ultima = value.substr(8, 1);

            for (var cont = 1; cont < 7; cont++) {
                xxx = (2 * parseInt(value.substr(cont++, 1))).toString() + "0";
                impares += parseInt(xxx.substr(0, 1)) + parseInt(xxx.substr(1, 1));
                pares += parseInt(value.substr(cont, 1));
            }
            xxx = (2 * parseInt(value.substr(cont, 1))).toString() + "0";
            impares += parseInt(xxx.substr(0, 1)) + parseInt(xxx.substr(1, 1));

            suma = (pares + impares).toString();
            unumero = parseInt(suma.substr(suma.length - 1, 1));
            unumero = (10 - unumero).toString();
            if (unumero == 10) unumero = 0;

            if ((ultima == unumero) || (ultima == uletra[unumero]))
                is_valid = true;
            else {
                is_valid = false;
            }
        }
    } else {
        is_valid = false;
    }
    return is_valid;
}
/**
 * Usage:
 * digits:{}
 * Applicable fields: all with .val()
 * @param field
 * @param setttings
 * @returns {boolean}
 */
function digits(field,setttings)
{
    return !/\D+/g.test(field.val());
}
/**
 * Checks if field is a valid spanish ID (DNI)
 * @param field
 * @param setttings
 * @returns {boolean}
 */
function dni(field, setttings) {
    var dni = field.val();
    return validateDNI(dni);
}

/**
 * Checks if a value is a valid spanish ID (DNI)
 * @param dni
 * @returns {boolean}
 */
function validateDNI(dni)
{
    var is_valid = true;
    if (/^\d{8}[a-zA-Z]$/.test(dni) == true) {
        var charIndex = parseInt(dni.substr(0,8)) % 23;
        var la = 'TRWAGMYFPDXBNJZSQVHLCKET'.charAt(charIndex);
        la != dni.substr(dni.length - 1, 1).toUpperCase() ? is_valid = false : null;
    } else {
        is_valid = false;
    }
    return is_valid;
}
/**
 *
 * @param field
 * @param settings
 * @returns {boolean}
 */
function nie(field,settings)
{
    var is_valid = true;
    var str = field.val().toString().toUpperCase();
    if (/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i.test(str)) {
        var nie = str.replace(/^[X]/, '0').replace(/^[Y]/, '1').replace(/^[Z]/, '2');
        var letter = str.substr(-1);
        ('TRWAGMYFPDXBNJZSQVHLCKET'.charAt(parseInt(nie.substr(0, 8)) % 23) === letter) ? is_valid = true : is_valid = false;
    } else {
        is_valid = false;
    }

    return is_valid;
}
/**
 * Applicable fields: text, email, password, radio, checkbox, file, select
 * @param field
 * @returns {boolean}
 */
function notEmpty(field)
{
    var is_valid = true;
    var field_type = field.attr('type');
    switch (field_type) {
        case "checkbox":
            field.is(":checked") ? null : is_valid = false;
            break;
        default:
            $.trim(field.val()).length === 0 ? is_valid = false : null;
            break;
    }
    return is_valid;
}
/**
 * Returns if a field value is a numeric value
 * @param field
 * @param settings
 * @returns {boolean}
 */
function numeric(field,settings)
{
    return !isNaN(field.val());
}
/**
 * Usage:
 * regexp:{
 *  pattern:/e/
 * }
 * Applicable fields: all with .val()
 * @param field
 * @returns {boolean}
 */
function regexp(field,setttings)
{
    return setttings.pattern.test(field.val());
}
//# sourceMappingURL=maps/materialid.js.map
