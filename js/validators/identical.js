/**
 * Check if a field value is exactly the same as another
 * @param field
 * @param settings
 * @returns {boolean}
 */
function identical(field,settings)
{
    return (field.val() == $("#"+settings.field_id).val());
}