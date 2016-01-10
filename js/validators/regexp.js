/**
 * Usage:
 * regexp:{
 *  pattern:/e/
 * }
 * Applicable fields: all with .val()
 * @param field
 * @returns {boolean}
 */
function regexp(field,setttings)
{
    return setttings.pattern.test(field.val());
}