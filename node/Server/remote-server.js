const process = require("node:process");
module.exports = function (RED) {


    var ws = require("ws"); //创建websocket对象

    var rec_map = new Map(); //创建一个表保存接收数据的节点(该节点都有ID)
    var broadcast_map = new Map();//保存广播节点(没有ID的节点)


    function RemoteServerNode(n) {
        RED.nodes.createNode(this, n);
        this.url = n.url;

        this.No_certificate = n.No_certificate;
        if (this.No_certificate) {
            /* 解除 websocket 验证SSL证书*/
            const process = require("node:process");
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        }else{
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = null;
        }

        var node = this;
        var socket = new ws(n.url);


        //没有实际作用只是为了防止被踢出
        var heartCheck = {
            timeout: 60000,//60ms
            timeoutObj: null,
            reset: function () {
                clearTimeout(this.timeoutObj);
                this.start();
            },
            start: function () {
                this.timeoutObj = setInterval(function () {
                    const temp_msg = {};
                    temp_msg['type'] = "heart";
                    socket.send(JSON.stringify(temp_msg).toString());
                }, this.timeout)
            }
        }

        socket.onopen = function (e) {
            heartCheck.start();
            node.log("[EasyGrasscutters] 连接到服务器");
        };

        socket.onmessage = function (e) {
            heartCheck.reset();

            //node.log("返回数据:" + e.data);
            const obj = JSON.parse(e.data);

            //如果消息中存在错误，则直接输出错误
            if (obj['type'] === "error") {
                node.error(obj['data']);
                return;
            }


            // 对于有明确节点的数据包，发送到指定节点输出
            if (rec_map.has(obj['msg_id'])) {
                rec_map.get(obj['msg_id']).deal(obj);
                return;
            }

            //对于没有明确节点的数据包，广播到所以广播节点
            broadcast_map.forEach(function (value, key) {
                value.deal(obj);
            })

        };

        socket.onerror = function (error) {
            node.warn(`[EasyGrasscutters] 连接错误：${error.message}`);
        };

        socket.onclose = function (error) {
            node.warn(`[EasyGrasscutters] 连接断开：${error.message}`);
        };

        this.on('close', function () {
            // 删除时会触发该事件
            // The event will be triggered when deleted
            socket.close();
        });

        this.send = function (msg) {
            //node.log("发送:" + msg);
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

        // 本函数用于注册广播回调函数
        this.broadcast_add = function (id, nod) {
            broadcast_map.set(id, nod);
        }

        // 本函数用于删除广播回调函数
        this.broadcast_del = function (id) {
            broadcast_map.delete(id);
        }

    }

    RED.nodes.registerType("remote-server", RemoteServerNode);
}