
jQuery.fn.extend({
    validate:function(obj_array)
    {
        validate(this,obj_array)
    }
});


function validate(trigger,obj_array)
{
    if(trigger.is('form')) {
        $('form').submit(function(e)
        {
            validate_form(trigger,obj_array);
            e.preventDefault();

        })

    }
}


function validate_form(trigger,obj_array)
{
    $.each(obj_array, function(k,v)
    {
        $.each(v.validators, function(name,val)
        {
            validator($("trigger input[name='"+k+"']"),name,val);
        })

    })
}

function validator(DOM_item,name,val)
{
    return window[name+"Validator"](DOM_item.val(),val);
}

