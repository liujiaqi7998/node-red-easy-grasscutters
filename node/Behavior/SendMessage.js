module.exports = function(RED) {
    function SendMessage(config) {
        RED.nodes.createNode(this, config);//在RED上创建节点
        this.server = RED.nodes.getNode(config.server);//获取Server对象
        this.server.rec_add(this.id, this); //在服务器中注册该节点，以便于回调
        var g_msg; //保存输入信息
        this.on('input', function (msg) {
            //检测服务器是否正常
            if (this.server) {
                g_msg = msg;
                //建立发送信息的JSON模板
                var temp_msg = {};
                temp_msg['type'] = "SendMessage";
                temp_msg['message'] = msg.payload['message'] + "";
                temp_msg['msg_id'] = this.id;
                temp_msg['player_uid'] = msg.payload['player'] + "" ;

                //检测是否有参数
                if (msg.payload['message'] == null) {
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


            g_msg.payload['result'] = temp['data'];
            //调用节点输出
            this.send(g_msg);
            
        }
    }

    RED.nodes.registerType("SendMessage",SendMessage);
}