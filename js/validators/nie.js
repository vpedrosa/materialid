/**
 *
 * @param field
 * @param settings
 * @returns {boolean}
 */
function nie(field,settings)
{
    var is_valid = true;
    var str = field.val().toString().toUpperCase();
    if (/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i.test(str)) {
        var nie = str.replace(/^[X]/, '0').replace(/^[Y]/, '1').replace(/^[Z]/, '2');
        var letter = str.substr(-1);
        ('TRWAGMYFPDXBNJZSQVHLCKET'.charAt(parseInt(nie.substr(0, 8)) % 23) === letter) ? is_valid = true : is_valid = false;
    } else {
        is_valid = false;
    }

    return is_valid;
}