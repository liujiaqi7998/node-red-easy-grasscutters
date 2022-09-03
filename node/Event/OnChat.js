module.exports = function (RED) {


    function OnChat(config) {

        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);
        this.server.broadcast_add(this.id, this);


        this.on('close', function () {
            // 从接收监听器中注销
            this.server.broadcast_del(this.id);
        });

        // 处理回调函数
        this.deal = function (temp) {

            // 判断信息类型是否是自己，如果不是直接返回
            if (temp['type'] !== "OnChat") {
                return;
            }

            const msg = {
                payload: {
                    player: temp['from'],
                    to: temp['to'],
                    msg_type: temp['msg_type'],
                    msg_data: temp['data']
                }
            };

            //调用节点输出
            this.send(msg);

        }
    }

    RED.nodes.registerType("OnChat", OnChat);
}