/**
 * Returns true if callback function returns true.
 * Returns false if callback function returns false, or a non-boolean variable, or is undefined.
 * @param field
 * @param settings
 * @returns {boolean}
 */
function custom(field, settings) {
    var is_valid = (typeof settings.callback !== "undefined") ? settings.callback(field) : false;
    is_valid = (typeof is_valid === "boolean") ? is_valid : false;
    return is_valid;
}