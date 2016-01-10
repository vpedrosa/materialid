/**
 * Checks if field is a valid spanish ID (DNI)
 * @param field
 * @param setttings
 * @returns {boolean}
 */
function dni(field, setttings) {
    var dni = field.val();
    return validateDNI(dni);
}

/**
 * Checks if a value is a valid spanish ID (DNI)
 * @param dni
 * @returns {boolean}
 */
function validateDNI(dni)
{
    var is_valid = true;
    if (/^\d{8}[a-zA-Z]$/.test(dni) == true) {
        var charIndex = parseInt(dni.substr(0,8)) % 23;
        var la = 'TRWAGMYFPDXBNJZSQVHLCKET'.charAt(charIndex);
        la != dni.substr(dni.length - 1, 1).toUpperCase() ? is_valid = false : null;
    } else {
        is_valid = false;
    }
    return is_valid;
}