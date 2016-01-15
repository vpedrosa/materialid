/**
 * Handcrafted with ♥ Beebit Solutions
 * Real coffee was used in this project development
 * Licensed under MIT License
 * contacto@beebit.es
 */

function initSteps() {
    hideSteps();
    calculateStepsTotal();
    renderControls();
    (materialid.config.render_navigator) ? renderNavigator() : null;

}

function hideSteps() {
    $("." + materialid.config.step_class).hide();
    $($("." + materialid.config.step_class)[0]).show();
}

function stepForward() {
    if (materialid.config.current_step < materialid.config.total_steps) {
        evaluateFields($($("." + materialid.config.step_class)[materialid.config.current_step]), materialid);
        if (materialid.form_obj.is_valid) {
            step(+1);
        }
    }
}

function stepBackward() {
    if (materialid.config.current_step > 0) {
        step(-1);
    }
}

function step(oper) {
    materialid.config.last_step = materialid.config.current_step;
    materialid.config.current_step += oper;
    $($("." + materialid.config.step_class)[materialid.config.last_step]).hide();
    $($("." + materialid.config.step_class)[materialid.config.current_step]).show();
    renderControls();
    (materialid.config.render_navigator) ? animateNavigator() : null;
}

function calculateStepsTotal() {
    materialid.config.total_steps = $("." + materialid.config.step_class).length - 1;
}

/**
 * Uses .navigation-controls selector to generate navigation buttons
 */
function renderControls() {
    var zero = materialid.config.current_step == 0,
        inner = materialid.config.current_step == materialid.config.total_steps,
        last = materialid.config.last_step == 0 || materialid.config.last_step == materialid.config.total_steps,
        change = zero || inner || last;
    if (zero) {
        $(".navigation-controls").html(startingNavigationControls());
    } else if (inner) {
        $(".navigation-controls").html(endingNavigationControls());
    } else if (last) {
        $(".navigation-controls").html(usualNavigationControls());
    }
    if (change) {
        $(".step-forward").on("click", stepForward);
        $(".step-backward").on("click", stepBackward);
    }
}

/**
 * Uses .navigator selector to generate navigation progress bar and steps
 */
function renderNavigator() {
    var loader = '<div class="steps-navigation-container">' +
        '    <div class="step-indicator initial-step">' +
        '        1' +
        '    </div>' +
        '    <div class="progress">' +
        '        <div class="determinate"></div>' +
        '    </div>' +
        '</div>';
    $(".navigator").html(loader);
}

function animateNavigator() {
    var percent = Math.round(materialid.config.current_step * 100 / materialid.config.total_steps);
    console.log(percent);
    if (materialid.config.current_step == 0) {
        $(".steps-navigation-container .step-indicator").addClass("initial-step")
    } else {
        $(".steps-navigation-container .step-indicator").removeClass("initial-step")
    }
    if (materialid.config.current_step == materialid.config.total_steps) {
        $(".steps-navigation-container .step-indicator").html('<i class="material-icons">done</i>').addClass("final-step");
    } else {
        $(".steps-navigation-container .step-indicator").text(materialid.config.current_step + 1).removeClass("final-step");
    }

    $(".steps-navigation-container .step-indicator").animate({
        left: percent + "%"
    }, 300, "linear");

    $(".steps-navigation-container .progress .determinate").css({width: percent + "%"});
}

function startingNavigationControls() {
    return '<div class="row">' +
        '<div class="col s12">' +
        '<a class="waves-effect waves-light btn right step-forward ' + materialid.config.next_button_class + '"><i class="material-icons right">keyboard_arrow_right</i>' + materialid.config.starting_button_text + '</a>' +
        '<div class="clearfix"></div></div>' +
        '</div>'

}

function usualNavigationControls() {
    return '<div class="row"> ' +
        '<div class="col s12">' +
        '<a class="waves-effect waves-light btn left step-backward ' + materialid.config.previous_button_class + '">' +
        materialid.config.previous_text +
        '<i class="material-icons left">keyboard_arrow_left</i></a>' +
        '<a class="waves-effect waves-light btn right step-forward ' + materialid.config.next_button_class + '">' +
        materialid.config.next_text +
        '<i class="material-icons right">keyboard_arrow_right</i></a>' +
        '<div class="clearfix"></div></div>' +
        '</div>';
}

function endingNavigationControls() {
    return '<div class="row">' +
        '<div class="col s12">' +
        '<a class="waves-effect waves-light btn left step-backward ' + materialid.config.previous_button_class + '">' + materialid.config.previous_text + '</a>' +
        '<button type="submit" class="waves-effect waves-light btn right ' + materialid.config.submit_button_class + '"><i class="material-icons right">done</i>' + materialid.config.ending_button_text + '</button>' +
        '<div class="clearfix"></div></div>' +
        '</div>'
}