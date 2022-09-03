module.exports = function (RED) {


    function OnChatMsg(config) {

        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);
        //在服务器中注册该节点，以便于回调
        this.server.rec_add(this.id, this);

        var g_msg;

        this.on('input', function (msg) {
            if (this.server) {
                g_msg = msg;
                //建立发送信息的JSON模板
                var temp_msg = {};
                temp_msg['type'] = "OnChatMsg";

                //检测msg.payload['player']是否存在
                if (msg.payload['player'] != null) {
                    temp_msg['player_uid'] = String(msg.payload['player']);
                }
                //检测msg.payload['player']是否存在
                if (msg.payload['to'] != null) {
                    temp_msg['to'] = String(msg.payload['to']);
                }

                temp_msg['msg_data'] = msg.payload['msg_data'];

                temp_msg['msg_id'] = this.id;

                //检测参数是否有效
                if (isNaN(temp_msg['msg_data'])) {
                    this.error("参数错误");
                    return;
                }

                //发送信息
                this.server.send(JSON.stringify(temp_msg).toString());
            } else {
                this.warn("未配置服务器");
            }
        });


        this.on('close', function () {
            // 从接收监听器中注销
            // 发送注销监听事件
            var temp_msg = {};
            temp_msg['type'] = "OnChatMsg";
            temp_msg['msg_id'] = this.id;
            temp_msg['del'] = "1";
            this.server.send(JSON.stringify(temp_msg).toString());

            this.server.broadcast_del(this.id);
        });

        // 处理回调函数
        this.deal = function (temp) {

            // 判断信息类型是否是自己，如果不是直接返回
            if (temp['type'] !== "OnChatMsg") {
                return;
            }

            g_msg.payload['data'] = temp['data'];
            g_msg.payload['player'] = temp['player_uid'];
            g_msg.payload['to'] = temp['to'];

            //调用节点输出
            this.send(g_msg);

        }
    }

    RED.nodes.registerType("OnChatMsg", OnChatMsg);
}