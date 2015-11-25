
$(document).ready(function()
{
    $("form").validate({
        first_name: {
            validators: {
                notEmpty: {
                    message: 'The name is required'
                },
            }
        }
    })
});