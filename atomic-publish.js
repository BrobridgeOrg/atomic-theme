(function() {

    function init(options) {
        options = options || {};

        $('<li><span class="button red-ui-publish-button" id="red-ui-header-button-publish"><i class="icon"></i><span class="label">Publish</span></span></li>')
            .appendTo(".red-ui-header-toolbar");

        $('#red-ui-header-button-publish').on("click", function(event) {
            event.preventDefault();
            save();
        });
    }

    function save() {

        if (!$("#red-ui-header-button-publish").hasClass("disabled")) {

            if (!RED.user.hasPermission("flows.write")) {
                RED.notify(RED._("user.errors.deploy"),"error");
                return;
            }

            $("#red-ui-header-button-publish").addClass('disabled');

            RED.nodes.dirty(false);
            RED.notify('<p>Publishing...</p>', 'info');

            $.ajax({
                url: "publish",
                type: "POST",
                data: JSON.stringify({}),
                contentType: "application/json; charset=utf-8",
            }).done(function(data, textStatus, xhr) {

                RED.nodes.dirty(false);
                RED.notify('<p>Publish Successfully</p>', 'success');
                $("#red-ui-header-button-publish").removeClass("disabled");

            }).fail(function(xhr,textStatus,err) {
                RED.nodes.dirty(true);
                $("#red-ui-header-button-publish").removeClass("disabled");

                if (xhr.status === 401) {
                    RED.notify(RED._("deploy.deployFailed",{message:RED._("user.notAuthorized")}),"error");
                } else if (xhr.status === 409) {
                    resolveConflict(nns, true);
                } else if (xhr.responseText) {
                    RED.notify(RED._("deploy.deployFailed",{message:xhr.responseText}),"error");
                } else {
                    RED.notify(RED._("deploy.deployFailed",{message:RED._("deploy.errors.noResponse")}),"error");
                }

            }).always(function() {
                /*
                deployInflight = false;
                var delta = Math.max(0,300-(Date.now()-startTime));
                setTimeout(function() {
                    $(".red-ui-deploy-button-content").css('opacity',1);
                    $(".red-ui-deploy-button-spinner").hide();
                    $("#red-ui-header-shade").hide();
                    $("#red-ui-editor-shade").hide();
                    $("#red-ui-palette-shade").hide();
                    $("#red-ui-sidebar-shade").hide();
                },delta);
                */
            });
        }
    }

    $(document).ready(function() {
        init();
    });  
})();
