/**
 * Handcrafted with ♥ Beebit Solutions
 * Real coffee was used in this project development
 * Licensed under MIT License
 * contacto@beebit.es
 */

function initMaterialidSteps() {
    hideMaterialidSteps();
    calculateMaterialidStepsTotal();
    renderMaterialidControls();
    (materialid.config.render_navigator) ? renderMaterialidNavigator() : null;
    (materialid.config.render_navigator && materialid.config.starting_step != 1) ? animateMaterialidNavigator() : null;

}

function hideMaterialidSteps() {
    $("." + materialid.config.step_class).hide();
    $($("." + materialid.config.step_class)[0]).show();
}

function stepMaterialidForward() {
    if (materialid.config.current_step < materialid.config.total_steps) {
        evaluateMaterialidFields($($("." + materialid.config.step_class)[materialid.config.current_step]), materialid);
        if (materialid.form_obj.is_valid) {
            stepMaterialid(+1);
        }
    }
}

function stepMaterialidBackward() {
    if (materialid.config.current_step > 0) {
        stepMaterialid(-1);
    }
}

function stepMaterialid(oper) {
    materialid.config.last_step = materialid.config.current_step;
    materialid.config.current_step += oper;
    $($("." + materialid.config.step_class)[materialid.config.last_step]).hide();
    $($("." + materialid.config.step_class)[materialid.config.current_step]).show();
    renderMaterialidControls();
    (materialid.config.render_navigator) ? animateMaterialidNavigator() : null;
}

function calculateMaterialidStepsTotal() {

    materialid.config.total_steps = $("." + materialid.config.step_class).length - 1;
    materialid.config.ending_step = (materialid.config.ending_step == 0
    || materialid.config.ending_step < materialid.config.total_steps) ? materialid.config.total_steps : materialid.config.ending_step;
}

/**
 * Uses .navigation-controls selector to generate navigation buttons
 */
function renderMaterialidControls() {
    var zero = materialid.config.current_step == 0,
        inner = materialid.config.current_step == materialid.config.total_steps,
        last = materialid.config.last_step == 0 || materialid.config.last_step == materialid.config.total_steps,
        change = zero || inner || last;
    if (zero) {
        $(".navigation-controls").html(startingMaterialidNavigationControls());
    } else if (inner) {
        $(".navigation-controls").html(submitMaterialidNavigationControls());
    } else if (last) {
        $(".navigation-controls").html(usualMaterialidNavigationControls());
    }
    if (change) {
        $(".step-forward").on("click", stepMaterialidForward);
        $(".step-backward").on("click", stepMaterialidBackward);
    }
}

/**
 * Uses .navigator selector to generate navigation progress bar and steps
 */
function renderMaterialidNavigator() {
    var loader = '<div class="steps-navigation-container">' +
        '    <div class="step-indicator initial-step">' +
        '        ' + materialid.config.starting_step +
        '    </div>' +
        '    <div class="progress">' +
        '        <div class="determinate"></div>' +
        '    </div>' +
        '</div>';
    $(".navigator").html(loader);
}

function animateMaterialidNavigator() {
    var percent = Math.round((materialid.config.current_step+(materialid.config.starting_step-1)) * 100 / (materialid.config.ending_step-1));
    console.log(percent);
    if ((materialid.config.current_step+(materialid.config.starting_step-1)) == 0) {
        $(".steps-navigation-container .step-indicator").addClass("initial-step")
    } else {
        $(".steps-navigation-container .step-indicator").removeClass("initial-step")
    }
    if (materialid.config.current_step+(materialid.config.starting_step-1) == materialid.config.ending_step-1) {
        $(".steps-navigation-container .step-indicator").html('<i class="material-icons">done</i>').addClass("final-step");
    } else {
        $(".steps-navigation-container .step-indicator").text(materialid.config.current_step + materialid.config.starting_step).removeClass("final-step");
    }

    $(".steps-navigation-container .step-indicator").animate({
        left: percent + "%"
    }, 300, "linear");

    $(".steps-navigation-container .progress .determinate").css({width: percent + "%"});
}

function startingMaterialidNavigationControls() {
    return '<div class="row">' +
        '<div class="col s12">' +
        '<a class="waves-effect waves-light btn right step-forward ' + materialid.config.next_button_class + '"><i class="material-icons right">' + materialid.config.starting_button_icon + '</i>' + materialid.config.starting_button_text + '</a>' +
        '<div class="clearfix"></div></div>' +
        '</div>';
}

function usualMaterialidNavigationControls() {
    return '<div class="row"> ' +
        '<div class="col s12">' +
        '<a class="waves-effect waves-light btn left step-backward ' + materialid.config.previous_button_class + '">' +
        materialid.config.previous_text +
        '<i class="material-icons left">'+materialid.config.previous_button_icon+'</i></a>' +
        '<a class="waves-effect waves-light btn right step-forward ' + materialid.config.next_button_class + '">' +
        materialid.config.next_text +
        '<i class="material-icons right">'+materialid.config.next_button_icon+'</i></a>' +
        '<div class="clearfix"></div></div>' +
        '</div>';
}

function submitMaterialidNavigationControls() {
    return '<div class="row">' +
        '<div class="col s12">' +
        '<a class="waves-effect waves-light btn left step-backward ' + materialid.config.previous_button_class + '">' + materialid.config.previous_text + '<i class="material-icons right">'+materialid.config.previous_button_icon+'</i></a>' +
        '<button type="submit" class="waves-effect waves-light btn right ' + materialid.config.submit_button_class + '"><i class="material-icons right">' + materialid.config.submit_button_icon + '</i>' + materialid.config.submit_button_text + '</button>' +
        '<div class="clearfix"></div></div>' +
        '</div>'
}