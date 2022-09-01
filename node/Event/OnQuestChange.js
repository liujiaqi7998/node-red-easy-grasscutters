module.exports = function (RED) {



    function OnQuestChange(config) {

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
                temp_msg['type'] = "OnQuestChange";
                temp_msg['id'] = parseInt(msg.payload['Quest_id']);
                temp_msg['state'] = msg.payload['state'] + "" ;
                temp_msg['msg_id'] = this.id;

                //检测msg.payload['player']是否存在
                if (msg.payload['player'] != null) {
                    temp_msg['player_uid'] = String(msg.payload['player']);
                }
                

                //检测参数是否正确
                if (temp_msg['id'] === undefined || temp_msg['state'] === undefined) {
                    this.error("参数错误");
                    return;
                }
                //检测参数是否为空
                if (temp_msg['id'] === "" || temp_msg['state'] === "") {
                    this.error("参数为空");
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
            temp_msg['type'] = "OnQuestChange";
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

            g_msg.payload['player'] = temp['data'];
            //调用节点输出
            this.send(g_msg);

        }
    }

    RED.nodes.registerType("OnQuestChange", OnQuestChange);
}