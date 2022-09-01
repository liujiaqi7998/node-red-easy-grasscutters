module.exports = function (RED) {



    function OnPlayerJoin(config) {

        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);

        this.server.OnPlayerJoin_add(this.id, this);
        

        this.on('close', function () {
            // 从接收监听器中注销
            this.server.OnPlayerJoin_map(this.id);
        });

        // 处理回调函数
        this.deal = function (temp) {

            // 判断返回数据是否正常
            if (temp['type'] === "error") {
                this.error(temp['data']);
                return;
            }

            var msg = {
                payload: {
                    player: temp['data'],
                    is_first: temp['is_first']
                }
            };

            //调用节点输出
            this.send(msg);

        }
    }

    RED.nodes.registerType("OnPlayerJoin", OnPlayerJoin);
}