module.exports = function (RED) {
    function SendMail(config) {

        RED.nodes.createNode(this, config);//在RED上创建节点
        this.server = RED.nodes.getNode(config.server);//获取Server对象
        this.server.rec_add(this.id, this);//在服务器中注册该节点，以便于回调

        var g_msg;
        this.on('input', function (msg) {
            if (this.server) {

                g_msg = msg;

                msg.payload['type'] = "SendMail";
                msg.payload['msg_id'] = this.id;
                //发送信息
                this.server.send(JSON.stringify(msg.payload).toString());
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

    RED.nodes.registerType("SendMail", SendMail);
}