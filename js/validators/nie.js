/**
 *
 * @param field
 * @param settings
 * @returns {boolean}
 */
function nie(field, settings) {
    var str = field.val().toString().toUpperCase();
    return validateNIE(str);
}

function validateNIE(nie)
{
    var is_valid = true;
    if (/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i.test(nie)) {
        var nie = nie.replace(/^[X]/, '0').replace(/^[Y]/, '1').replace(/^[Z]/, '2');
        var letter = nie.substr(-1);
        ('TRWAGMYFPDXBNJZSQVHLCKET'.charAt(parseInt(nie.substr(0, 8)) % 23) === letter) ? is_valid = true : is_valid = false;
    } else {
        is_valid = false;
    }

    return is_valid;
}