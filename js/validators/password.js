/**
 *
 * @param field
 * @param settings
 * @returns {boolean}
 */
function password(field,settings)
{
    var value = field.val();
    var is_valid = (/[a-z]+/.test(value));
    if(is_valid) {
        is_valid = (settings.min_length) ? $.trim(value).length >= settings.min_length : is_valid;
        is_valid = (settings.uppercase && is_valid) ? /[A-Z]+/.test(value) : is_valid;
        is_valid = (settings.number && is_valid) ? /\d+/.test(value) : is_valid;
        is_valid = (settings.special_chars && is_valid) ? /[!@#\$%\^\&*\)\(+=._-]+/.test(value) : is_valid;
    }

    return is_valid;
}