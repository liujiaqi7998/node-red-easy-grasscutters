module.exports = function (RED) {

    function RunCommand(config) {
        RED.nodes.createNode(this, config);

        this.on('input', function (msg) {
            // Retrieve the config node
            this.server = RED.nodes.getNode(config.server);
            if (this.server) {
                var temp_msg = {};
                temp_msg['type'] = "CMD";
                temp_msg['cmd'] = msg.payload + "" ;
                temp_msg['msg_id'] = this.id;
                this.server.send(JSON.stringify(temp_msg).toString());
            } else {
                this.warn("未配置服务器");
            }
        });
    }

    RED.nodes.registerType("RunCommand", RunCommand);
}