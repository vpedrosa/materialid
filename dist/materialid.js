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
    "notEmpty": notEmpty
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
        console.log("Types availables:div and form.");
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
        console.log("Field validity:" + field_valid)
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
    console.log(field);
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
//# sourceMappingURL=maps/materialid.js.map
