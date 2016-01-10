/**
 * Returns if a field value is a numeric value
 * @param field
 * @param settings
 * @returns {boolean}
 */
function numeric(field,settings)
{
    return !isNaN(field.val());
}