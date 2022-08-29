module.exports = function(RED) {

    function GetPlayerLocation(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        
        this.on('input', function(msg) {
            node.log("input");
            msg.payload = msg.payload.playerNum;
            node.send(msg);
        });

        this.on('close', function() {
            // 删除时会触发该事件
            // The event will be triggered when deleted
            node.log("Closed");
        });
    }

    RED.nodes.registerType("GetPlayerLocation",GetPlayerLocation);
}