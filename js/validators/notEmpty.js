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