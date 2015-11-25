/**
 * Copyright © 2015 Beebit Solutions
 * All rights reserved
 * Licensed under MIT License
 * Author: Valentín Pedrosa
 * valentin@beebitsolutions.com
 */
function notEmptyValidator(elem)
{
    return !(typeof elem === "undefined" || $.trim(elem) == "" || elem == null);
}
