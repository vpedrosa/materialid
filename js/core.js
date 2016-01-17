/**
 * Handcrafted with ♥ Beebit Solutions
 * Real coffee was used in this project development
 * Licensed under MIT License
 * contacto@beebit.es
 */
/**
 * Main materialid configuration
 * @type {{fields: undefined, config: {locale: string, trigger: string, error_callback: materialidErrorCallback, success_callback: materialidSuccessCallback, enable_visible: boolean, steps: undefined, step_class: string, on_forward: undefined, on_backward: undefined, current_step: number, last_step: number, total_steps: number, next_text: string, previous_text: string, ending_button_text: string, starting_button_text: string, previous_button_class: string, next_button_class: string, submit_button_class: string, render_navigator: boolean}, form_obj: {selector: undefined, is_valid: boolean}, messages: {}}}
 */
var materialid = {
    fields: undefined,
    config: {
        locale: "es_ES",
        trigger: "change",
        error_callback: materialidErrorCallback,
        success_callback: materialidSuccessCallback,
        enable_visible: true,
        steps: undefined,
        step_class: "step",
        on_forward: undefined,
        on_backward: undefined,
        current_step: 0,
        last_step: 0,
        total_steps: 0,
        next_text: "Next",
        previous_text: "Previous",
        ending_button_text: "Submit",
        starting_button_text: "Next",
        previous_button_class: "indigo",
        next_button_class: "indigo",
        submit_button_class: "indigo",
        render_navigator: false
    },
    form_obj: {
        selector: undefined,
        is_valid: true
    },
    messages: {}
}

/**
 * Index of current defined validators
 * @type {{notEmpty: notEmpty}}
 */
var callbacksIndex = {
    "notEmpty": notEmpty,
    "regexp": regexp,
    "digits": digits,
    "numeric": numeric,
    "dni": dni,
    "nie": nie,
    "cif": cif,
    "nif" : nif,
    "custom": custom,
    "between": between
}

/**
 * Creation of jQuery function
 */
$.fn.materialid = function (config_array) {
    initMaterialid(this, config_array)
}


/**
 * Initialization of Materialid
 * @param selector
 * @param config_array
 */
function initMaterialid(selector, config_array) {

    $.extend(true, materialid, config_array);
    validateMaterialidContainer(selector)
}

/**
 * Materialid container validation
 * @param selector
 * @param config_array
 */
function validateMaterialidContainer(selector) {
    // Step-form functionality
    if (materialid.config.steps == true) {
        initMaterialidSteps();
    }
    if (selector.is("form")) {
        initMaterialidListeners(selector);
        //Attaching form submit validation
        selector.on("submit", function (e) {

            evaluateMaterialidFields(selector);
            if (!materialid.form_obj.is_valid) {
                return false;
            } else {
                if (typeof materialid.config.submit_callback === "function") {
                    return materialid.config.submit_callback();
                } else {
                    return true;
                }
            }
        });
    } else if (selector.is("div")) {
        initMaterialidListeners(selector);
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
function initMaterialidListeners(selector) {
    $.each(materialid.fields, function (k, v) {
        addMaterialidValidationListenerToField(selector.find("#" + k), v);
    })
}

/**
 * Attach a validation listener to a field
 * @param field
 * @param field_options
 */
function addMaterialidValidationListenerToField(field, field_options) {
    if (materialid.config.trigger == "change") {
        field.change(function () {
            validateMaterialidField(field, field_options);
        })
    } else {
        //TODO: attach to trigger
    }
}

/**
 * Validates a single field bearing in mind the "enable_visible" configuration option
 * @param field
 * @param field_options
 * @returns {boolean}
 */
function validateMaterialidField(field, field_options) {
    var field_valid = true;
    var msg = "";
    if ((materialid.config.enable_visible && (field.is(":visible") || field.attr("type") == "hidden")) || !materialid.config.enable_visible) {
        if (typeof field_options.validators !== "undefined") {
            $.each(field_options.validators, function (k, v) {
                field_valid = materialidValidator(field, k, v) ? field_valid : false;
                msg = (v["msg"] !== undefined) ? v["msg"] : ((materialid.messages[k] == undefined) ? msg : materialid.messages[k]);
            })
        } else {
            field_valid = true;
            console.log("Be careful, validator list for field #" + field.attr("id") + " is undefined.");
        }
        if (field_options.error_callback !== undefined && !field_valid) {
            // TODO: add documentation for custom_error_field
            if (field_options.custom_error_field !== undefined) {
                field_options.error_callback(field_options.custom_error_field, msg);
            } else {
                field_options.error_callback(field, msg);
            }
        } else if (field_options.success_callback !== undefined && field_valid) {
            // TODO: add documentation for custom_success_field
            if (field_options.custom_success_field !== undefined) {
                field_options.success_callback(field_options.custom_success_field, msg);
            } else {
                field_options.success_callback(field, msg);
            }
        } else {
            field_valid ? materialid.config.success_callback(field, msg) : materialid.config.error_callback(field, msg);
        }
        materialid.form_obj.is_valid = field_valid ? materialid.form_obj.is_valid : false;
    }
    return field_valid;
}

/**
 * Evaluate all fields without calling or invoking listeners.
 * @param selector
 * @param config_array
 */
function evaluateMaterialidFields(selector) {
    materialid.form_obj.is_valid = true;
    $.each(materialid.fields, function (k, v) {
        validateMaterialidField(selector.find("#" + k), v);
    })
}

/**
 * Calls a concrete validator if exists, or return false and output an error on the console.
 * @param field
 * @param callback
 * @param settings
 * @returns {*}
 */
function materialidValidator(field, callback, settings) {
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
function materialidErrorCallback(field, msg) {
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
function materialidSuccessCallback(field, msg) {
    $("#" + field.attr("id") + "_validation_msg").remove();
    field.removeClass("invalid").addClass("valid");
}