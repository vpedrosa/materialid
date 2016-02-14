/**
 * Validate an email
 * @param field
 * @param settings
 * @returns {boolean}
 */
function email(field,settings)
{
    var is_valid = (field.val() == "") ? true : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(field.val());
    return is_valid;
}