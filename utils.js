const login = require("facebook-chat-api");
const fs = require("fs");
const log = require("./src/writeLog");
module.exports = function(cookie){
    login(cookie,(err,kata)=>{
        if (err) return Promise.resolve("Lỗi không xác định.")
                    .then(log.writeError)
                    .then(fs.unlinkSync(path.join(__dirname,'..','user','session.json')));

        kata.setOptions({
            listenEvents: true,
            logLevel: "warn"
            ,selfListen: false
        });
        kata.listen((err,msg) => {
            if(err) return log.writeError(err);
            function proc (msg) {
                switch(msg.body.toLowerCase().trim()){
                    case "ping": 
                        sendThread("pong"); break;               
                }
            }
            function sendThread(data){
                return kata.sendMessage(data,msg.threadID);
            }
            if(msg.type == "message")
                proc(msg);
        });
    }); 
}

