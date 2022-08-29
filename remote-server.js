module.exports = function (RED) {

    var ws = require("ws");
    var rec_map = new Map();
    var rec_cmd_map = new Map();

    function RemoteServerNode(n) {
        RED.nodes.createNode(this, n);
        this.url = n.url;
        var node = this;

        var socket = new ws(n.url);
        socket.onopen = function (e) {
            node.log("[EasyGrasscutters] 连接到服务器");
            this.socket = socket;
        };

        socket.onmessage = function (e) {
            var received_msg = e.data;
            node.log("返回数据:"  + received_msg);
            const obj = JSON.parse(received_msg);
            if (obj['type'] === "log_return") {
                rec_cmd_map.forEach(function (value, key) {
                    value.deal(obj['data']);
                })
            }

            if (rec_map.has(obj['msg_id'])) {
                rec_map.get(obj['msg_id']).deal(obj);
            }
        };

        socket.onerror = function (error) {
            node.warn(`[EasyGrasscutters] 连接错误：${error.message}`);
            this.socket = null;
        };

        socket.onclose = function (e) {
            this.socket = null;
        };

        this.on('close', function () {
            // 删除时会触发该事件
            // The event will be triggered when deleted
            socket.close();
        });

        this.send = function (msg) {
            node.log("发送数据:"  + msg);
            socket.send(msg);
        }

        // 本函数用于注册回调函数
        this.rec_add = function (id, nod) {
            rec_map.set(id, nod);
        }

        // 本函数用于删除回调函数
        this.rec_del = function (id) {
            rec_map.delete(id);
        }

        // 本函数用于注册CMD回调函数
        this.rec_cmd_add = function (id, nod) {
            rec_cmd_map.set(id, nod);
        }

        // 本函数用于删除CMD回调函数
        this.rec_cmd_del = function (id) {
            rec_cmd_map.delete(id);
        }
    }
    RED.nodes.registerType("remote-server", RemoteServerNode);
}