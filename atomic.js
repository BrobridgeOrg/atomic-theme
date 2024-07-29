module.exports = function(RED) {
    const child_process = require('child_process');

    RED.plugins.registerPlugin("atomic", {
        type: "node-red-theme",
        css: [
            "atomic-theme.min.css",
            "atomic.css"
        ],
        // List the script files the theme provides.
        // If the theme doesn't include any, this can be left out
        scripts: "atomic-publish.js",
        monacoOptions: {
            theme: "tomorrow-night"
        }        
    })

    RED.plugins.registerPlugin('git-push-plugin', { 
        onadd: function () {
            RED.httpAdmin.post('/publish', RED.auth.needsPermission('write'), function (req, res) {
                const input = req.body;
                var publishCmd = process.env.ATOMIC_PUBLISH_COMMAND;

                if (!publishCmd) {
                    return res.status(204).end();
                }

                // Execute command
                const publish = child_process.exec(publishCmd, function(err, stdout, stderr) {

                    if (err) {
                        res.status(400)
                        res.json({ status: 'error', message: err })
                        return
                    }

                    res.status(204).end();
                });
            });
        }
    })

    RED.log.info('Atomic Theme Plugin loaded')
}

