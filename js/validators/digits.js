/**
 * Usage:
 * digits:{}
 * Applicable fields: all with .val()
 * @param field
 * @param setttings
 * @returns {boolean}
 */
function digits(field,setttings)
{
    return !/\D+/g.test(field.val());
}