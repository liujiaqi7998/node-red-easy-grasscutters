module.exports = function (RED) {

    function GetPlayerBirthday(config) {

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
                temp_msg['type'] = "GetPlayerBirthday";
                temp_msg['msg_id'] = this.id;
                temp_msg['player_uid'] = msg.payload['player'] + "" ;
                //检测是否有效
                if (temp_msg['player_uid'] === undefined) {
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
            this.server.rec_del(this.id);
        });

        // 处理回调函数
        this.deal = function (temp) {

            // 判断返回数据是否正常
            if (temp['type'] === "error") {
                this.error(temp['data']);
                return;
            }

            g_msg.payload['Month'] = temp['Month'];
            g_msg.payload['Day'] = temp['Day'];
            g_msg.payload['player'] = temp['player_uid'];
            //调用节点输出
            this.send(g_msg);

        }

    }

    RED.nodes.registerType("GetPlayerBirthday", GetPlayerBirthday);
}