module.exports = function(RED) {

    function ConsoleLog(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node["type"] = "log_return" ;
        node.server = RED.nodes.getNode(config.server);
        node.server.rec_cmd_add(node.id,node);
        
        node.on('close', function() {
            node.server.rec_cmd_del(node.id);
        });

        // 处理回调函数
        node.deal = function (temp) {
            var msg = {};
            msg['payload'] =  temp;
            node.send(msg);
        }
    }

    RED.nodes.registerType("ConsoleLog",ConsoleLog);
}