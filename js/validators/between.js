/** @namespace Number.MAX_SAFE_INTEGER */
/** @namespace Number.MIN_SAFE_INTEGER */
/**
 * Returns true if field value is between two parameters.
 * Check if is numeric value. No point to use it along numeric.
 * -----------------------------------
 * Default options are:
 * between:{
 *  min:-Number.MIN_SAFE_INTEGER,
 *  max:Number.MAX_SAFE_INTEGER,
 *  min_included:false,
 *  max_included:false
 * }
 * -----------------------------------
 * @param field
 * @param settings
 * @returns {boolean}
 */
function between(field, settings) {
    typeof settings["min_included"] !== "undefined" ? null : settings.min_included = false;
    typeof settings["max_included"] !== "undefined" ? null : settings.max_included = false;
    typeof settings["min"] !== "undefined" ? null : settings.min = Number.MIN_SAFE_INTEGER;
    typeof settings["max"] !== "undefined" ? null : settings.max = Number.MAX_SAFE_INTEGER;
    var is_valid, value = field.val();
    if (!isNaN(value)) {
        is_valid = (settings.min < value && value < settings.max) ? true : false;
        if (settings.min_included && !settings.max_included) {
            (settings.min <= value && value < settings.max) ? is_valid = true : null;
        } else if (!settings.min_included && settings.max_included) {
            (settings.min < value && value <= settings.max) ? is_valid = true : null;
        } else if (settings.min_included && settings.max_included) {
            (settings.min <= value && value <= settings.max) ? is_valid = true : null;
        }
    }
    return is_valid;
}