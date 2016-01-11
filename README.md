# Materialid - A [MaterializeCSS](http://materializecss.com/) Form Validator

![travis-badge](https://api.travis-ci.org/burflip/materialid.svg)
![license-badge](https://img.shields.io/badge/license-MIT-blue.svg)

Materialid is a JQuery form validation plugin, designed for Materialize, with an extensible core for every framework.
Form validation made easy designed for MaterializeCSS.
This project is currently *under development*.

#Documentation

1. [Getting Started](#getting-started)
2. [Configuration and options](#configuration-and-options)
3. [Validators](#validators)

##Getting Started

To install Materialid use [bower](http://bower.io/):

```
bower install materialid
```

Basic example usage:

```
$("form").materialid({
    fields:
    {
        field_id:{
            notEmpty:{}
        }
    }
});
```

##Configuration and options

You can use configuration and options to change default parameters of Materialid.
You can set configuration options when calling Materialid.

```
$("form").materialid({
    fields:
    {
        field_id:{
            notEmpty:{}
        }
    }
    config:
    {
        error_callback: myCustomErrorCallbackFunctionName,
        success_callback: myCustomSuccessCallbackFunctionName
    }
});
```

Currently working options:

* [enable_visible](#enable_visible)
* [success_callback](#success_callback)
* [error_callback](#error_callback)

###enable_visible

If this option is set to false, fields will be evaluated **even if they are invisible**.
This option set to false will cause steps not working.
**Default** value is *true*.

###success_callback

Calls this function when a validator returns true (field is **valid**).
The callback may accept two parameters, *field* and *msg*.

- The *field* parameter will contain the JQuery DOM reference to the field. *(You can use directly field.val(), for example)*
- The *msg* parameter will contain the custom message, translated (by language), or predefined, in that preference order.

**Default** value is *successCallback*, defined as follow:

```javascript
function successCallback(field, msg) {
    console.log("successCalled");
    $("#" + field.attr("id") + "_validation_msg").remove();
    console.log("#" + field.attr("id") + "_validation_msg", $("#" + field.attr("id") + "_validation_msg"))
    field.removeClass("invalid").addClass("valid");
}
```

###error_callback

Calls this function when a validator returns false (field is **invalid**).
The callback may accept two parameters, *field* and *msg*.

- The *field* parameter will contain the JQuery DOM reference to the field. *(You can use directly field.val(), for example)*
- The *msg* parameter will contain the custom message, translated (by language), or predefined, in that preference order.

**Default** value is *errorCallback*, defined as follow:

```javascript
function errorCallback(field, msg) {
    if ($("#" + field.attr("id") + "_validation_msg").length == 0) {
        field.after("<span id='" + field.attr("id") + "_validation_msg' class='validation-msg'></span>");
    }
    $("#" + field.attr("id") + "_validation_msg").text(msg);
    field.removeClass("valid").addClass("invalid");
}
```


Default options for Materialid are:

```json
config: {
    locale: "es_ES",
    trigger: "change",
    error_callback: errorCallback,
    success_callback: successCallback,
    steps: undefined,
    on_forward: undefined,
    on_backward: undefined,
    enable_visible: true
},
```

##Validators

Available validators are:

* [notEmpty](#notEmpty)
* [digits](#digits)
* [numeric](#numeric)
* [regexp](#regexp)
* [between](#between)
* [dni](#dni)
* [nie](#nie)
* [cif](#cif)
* [custom](#custom)

###Common configuration

All validators can have a *msg*, a *callback_success* and a *callback_error* option.

#####*callback_success:customCallbackFunction*
Defines a callback that is called only when this validator is called.
Calls this function when a validator returns true (field is **valid**).
This will override [config's callback option](#success_callback).
The callback may accept two parameters, *field* and *msg*.

- The *field* parameter will contain the JQuery DOM reference to the field. *(You can use directly field.val(), for example)*
- The *msg* parameter will contain the custom message, translated (by language), or predefined, in that preference order.

**Default** value is *undefined*.

#####*callback_error:customCallbackFunction*
Defines a callback that is called only when this validator is called.
Calls this function when a validator returns false (field is **invalid**).
This will override [config's callback option](#success_callback).
The callback may accept two parameters, *field* and *msg*.

- The *field* parameter will contain the JQuery DOM reference to the field. *(You can use directly field.val(), for example)*
- The *msg* parameter will contain the custom message, translated (by language), or predefined, in that preference order.

**Default** value is *undefined*, so this option will be ignored if unset.

#####*msg:string*
Custom messsage passed to callback, will override language and predefined message.

**Default** options are:
```json
???:{ // Any validator possible
    ... // Other options
    callback_success:undefined,
    callback_error:undefined,
    msg:undefined
    ... // Other options
}
```

###notEmpty

Similar to *required*.
Will check if a field value is empty or blank.
*"" and "   " will return false.*
No options avaliable.

###digits

Will check if the field value contains only digits.
"123.20", "a123", "5+123" and "-2112" are **invalid** values.
No options avaliable.

###numeric

Will check if the field value contains only digits.
"123.20", "5+123" and "-2112" are **valid** values.
"123.123,20" are **invalid** values.
No options avaliable.


###regexp

Returns true if field value satisfy a Regular expression.
Javascript *.test(regex)* function is used to check it.

####Options
#####*regexp:regexp*
Regular expression to compare against.

**Default** options are:

```json
regexp:{
    regexp:undefined
}
```

###between

Returns true if field value is between two parameters.
Check if is numeric value. No point to use it along numeric.

####Options
#####*min_included:boolean*
If true, field value equals to min number is accepted.

#####*max_included:boolean*
If true, field value equals to min number is accepted.

#####*min:Number*
The field value must be higher than min value.

#####*min:Number*
The field value must be higher than min value.

**Default** options are:

```json
between:{
    min:-Number.MIN_SAFE_INTEGER,
    max:Number.MAX_SAFE_INTEGER,
    min_included:false,
    max_included:false,
}
```

###dni

Checks if a field is a valid spanish DNI code.
Only DNI codes returns true, neither special NIFs codes (Starting with K,L or M) nor NIEs codes.
No options avaliable.

###nie

Checks if a field is a valid spanish NIE code.
No options avaliable.

###cif

Checks if a field is a valid spanish CIF code.
No options avaliable.

###custom

Returns true if a custom callback is satisfied.
The callback function may accept one parameter *field*, and may return *true* if it's valid and *false* if it's not.

- The *field* parameter will contain the JQuery DOM reference to the field. *(You can use directly field.val(), for example)*

Example of custom callback:

```javascript
function myCustomCallback(field) {
    if(field.val() == "foo") {
        return true;
    } else {
        return false;
    }
}
```
####Options
#####*callback:customCallbackFunction*
Regular expression to compare against.

**Default** options are:

```json
custom:{
    callback:undefined
}
```


