/**
 * Copyright © 2016 Beebit Solutions
 * All rights reserved
 * Licensed under MIT License
 * Author: Valentín Pedrosa
 * valentin@beebitsolutions.com
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

var callbacksIndex = {
    "notEmpty": notEmpty
}

jQuery.fn.extend({
    materialid: function (config_array) {
        initMaterialid(this, config_array)
    }
});


function initMaterialid(selector, config_array) {
    validateContainer(selector, config_array)
}

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

function initListeners(selector, config_array) {
    $.each(config_array.fields, function (k, v) {
        addValidationListenerToField(selector.find("#" + k), v);
    })
}

function addValidationListenerToField(field, validators) {
    if (materialid.configs.trigger == "change") {
        field.change(function () {
            validateField(field,validators);
        })
    } else {
        //TODO: attach to trigger
    }
}

function validateField(field,validators)
{
    var field_valid = true;
    var msg = "";
    if(field.is(":visible")) {
        $.each(validators, function (k, v) {
            field_valid = validator(field, k, v) ? field_valid : false;
            msg = messages[k];
        })
        console.log("Field validity:"+field_valid)
        field_valid ? successCallback(field, msg) : errorCallback(field, msg);
        materialid.form_obj.is_valid = field_valid ? materialid.form_obj.is_valid : false;
    }
    return field_valid;
}

function evaluateFields(selector, config_array)
{
    $.each(config_array.fields, function (k, v) {
        validateField(selector.find("#" + k), v);
    })
}

function validator(field, callback, settings) {
    if (typeof callbacksIndex[callback] !== "undefined") {
        return callbacksIndex[callback](field, settings);
    } else {
        return console.log("Callback " + callback + " undefined.");
    }
}

function errorCallback(field, msg) {
    if ($("#" + field.attr("id") + "_validation_msg").length == 0) {
        field.after("<span id='" + field.attr("id") + "_validation_msg' class='validation-msg'></span>");
    }
    $("#" + field.attr("id") + "_validation_msg").text(msg);
    console.log(field);
    field.removeClass("valid").addClass("invalid");
}

function successCallback(field, msg) {
    console.log("successCalled");
    $("#" + field.attr("id") + "_validation_msg").remove();
    console.log("#" + field.attr("id") + "_validation_msg",$("#" + field.attr("id") + "_validation_msg") )
    field.removeClass("invalid").addClass("valid");
}