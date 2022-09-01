module.exports = function(RED) {

    function ConsoleLog(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node["type"] = "log_return" ;
        node.server = RED.nodes.getNode(config.server);
        node.server.broadcast_add(node.id,node);
        
        node.on('close', function() {
            node.server.broadcast_del(node.id);
        });

        // 处理回调函数
        node.deal = function (temp) {

            // 判断信息类型是否是自己，如果不是直接返回
            if (temp['type'] !== "log_return") {
                return;
            }

            const msg = {};
            msg['payload'] =  temp['data'];
            node.send(msg);
        }
    }

    RED.nodes.registerType("ConsoleLog",ConsoleLog);
}