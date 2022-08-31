module.exports = function (RED) {



    function OnKillEntity(config) {

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
                temp_msg['type'] = "OnKillEntity";
                temp_msg['Entity'] = parseInt(msg.payload['Entity_uuid']);
                temp_msg['msg_id'] = this.id;

                //检测参数是否有效
                if (isNaN(temp_msg['Entity'])) {
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
            // 发送注销监听事件
            var temp_msg = {};
            temp_msg['type'] = "OnKillEntity";
            temp_msg['msg_id'] = this.id;
            temp_msg['del'] = "1";
            this.server.send(JSON.stringify(temp_msg).toString());

            // 从接收监听器中注销
            this.server.rec_del(this.id);
        });

        // 处理回调函数
        this.deal = function (temp) {


            // 判断返回数据是否正常
            if (temp['type'] === "error") {
                this.error(temp['data']);
                return;
            }

            g_msg.payload['Entity_uuid'] = temp['data'];

            //调用节点输出
            this.send(g_msg);

        }
    }

    RED.nodes.registerType("OnKillEntity", OnKillEntity);
}