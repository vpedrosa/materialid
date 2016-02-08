/** @namespace Number.MAX_SAFE_INTEGER */
/**
 * Returns true if field length is between two values or exactly n length.
 * Exact overrides max and min.
 * -----------------------------------
 * Default options are:
 * length:{
 *  min:0
 *  max:Number.MAX_SAFE_INTEGER,
 *  exact:undefined
 * }
 * -----------------------------------
 * @param field
 * @param settings
 * @returns {boolean}
 */
function length(field, settings)
{

    var l = field.val().length;
    if(settings["exact"] == undefined) {
        settings["min"] = (settings["min"] == undefined) ? 0 : settings["min"];
        settings["max"] = (settings["max"] == undefined) ? 0 : settings["max"];
    } else {
        settings["min"] = settings["max"] = settings["exact"] = (settings["exact"] < 0) ? Number.MAX_SAFE_INTEGER : settings["exact"];
    }

    return (l<=settings["max"] && l>=settings["min"]);
}