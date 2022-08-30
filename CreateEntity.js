module.exports = function (RED) {



    function CreateEntity(config) {

        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);
        var g_msg;
        this.on('input', function (msg) {
            if (this.server) {
                //在服务器中注册该节点，以便于回调
                this.server.rec_add(this.id, this);
                g_msg = msg;
                //建立发送信息的JSON模板
                var temp_msg = {};
                temp_msg['type'] = "CreateEntity";

                temp_msg['id'] = parseInt(msg.payload['Entity_id']);
                temp_msg['amount'] = parseInt(msg.payload['amount']);
                temp_msg['level'] = parseInt(msg.payload['level']);
                temp_msg['player_uid'] = msg.payload['player'];


                temp_msg['msg_id'] = this.id;

                //发送信息
                this.server.send(JSON.stringify(temp_msg).toString());
            } else {
                this.warn("未配置服务器");
            }
        });

        this.on('close', function () {
            // 从接收监听器中注销
            this.server.rec_del(this.id);
        });

        // 处理回调函数
        this.deal = function (temp) {

            // 删除该节点，防止重复响应问题
            this.server.rec_del(this.id);

            // 判断返回数据是否正常
            if (temp['type'] === "error") {
                this.error(temp['data']);
                return;
            }
            
            g_msg.payload['player'] = temp['player_uid'];
            g_msg.payload['Entity_uuid'] = temp['data'];
            //调用节点输出
            this.send(g_msg);

        }
    }

    RED.nodes.registerType("CreateEntity", CreateEntity);
}