const fs = require("fs");
const log = require("./src/writeLog");

function script(data) {

    if (fs.existsSync('./user/session.json')) {
        const Kata = require("./utils");
        let cookie = { appState: JSON.parse(fs.readFileSync("./user/session.json", "utf8")) }
            log.comp("Starting ... ");
            try {
                Kata(cookie);
            } catch(e) {
                log.writeError("Lỗi không xác định");
                log.warning("Restarting ... ");
                Kata(cookie);
            }

    } else {
        log.warning("Đang tạo file cookies ... ");
            const login = require('facebook-chat-api');
            login({email: data[0].email, password: data[0].password}, (err, bot) => {
                if(err) return console.error(err);
                fs.writeFileSync('./user/session.json', JSON.stringify(bot.getAppState()));
                script(data);
            });
    }
}

let data = JSON.parse(fs.readFileSync("account.json"));
if (data[0].email == "FACEBOOK_USERNAME_OR_EMAIL" || data[0].password == "YOUR_PASSWORD")
    log.writeError("Lỗi, file account.json chưa được định dạng")
else 
    script(data);