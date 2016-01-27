/**
 * Checks if the field value is a valid spanish Company ID (CIF)
 * @param field
 * @param settings
 * @returns {boolean}
 */
function cif(field, settings) {
    var is_valid = false;
    if (notEmpty(field)) {
        var value = field.val().toUpperCase();
        is_valid = validateCIF(value)
    } else {
        is_valid = false;
    }
    return is_valid;
}

function validateCIF(texto)
{
    var pares = 0;
    var impares = 0;
    var suma;
    var ultima;
    var unumero;
    var uletra = new Array("J", "A", "B", "C", "D", "E", "F", "G", "H", "I");
    var xxx;

    texto = texto.toUpperCase();

    var regular = /^[ABCDEFGHKLMNPQS]\d\d\d\d\d\d\d[0-9,A-J]$/g;
    if (!regular.exec(texto)) return false;

    ultima = texto.substr(8,1);

    for (var cont = 1 ; cont < 7 ; cont ++){
        xxx = (2 * parseInt(texto.substr(cont++,1))).toString() + "0";
        impares += parseInt(xxx.substr(0,1)) + parseInt(xxx.substr(1,1));
        pares += parseInt(texto.substr(cont,1));
    }
    xxx = (2 * parseInt(texto.substr(cont,1))).toString() + "0";
    impares += parseInt(xxx.substr(0,1)) + parseInt(xxx.substr(1,1));

    suma = (pares + impares).toString();
    unumero = parseInt(suma.substr(suma.length - 1, 1));
    unumero = (10 - unumero).toString();
    if(unumero == 10) unumero = 0;

    if ((ultima == unumero) ||  (ultima == uletra[unumero]))
        return true;
    else
        return false;

}