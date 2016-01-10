# Materialid - A MaterializeCSS Form Validation

![travis-badge](https://api.travis-ci.org/burflip/materialid.svg)
![license-badge](https://img.shields.io/badge/license-MIT-blue.svg)

Form validation for MaterializeCSS

This project is currently *under development*.

##Installation

This projects requires JQuery and MaterializeCSS

##Documentation

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

Available validators are:

* between
* notEmpty
* cif
* digits
* dni
* nie
* notEmpty
* numeric
* regexp




