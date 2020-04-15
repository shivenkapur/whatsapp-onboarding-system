var WebSocketClient = require('websocket').client;
var ws = new WebSocketClient();

var headers = {"Accept-Encoding": "gzip, deflate, br",
"Accept-Language": "en,en-IN;q=0.9,en-US;q=0.8,fr-FR;q=0.7,fr;q=0.6",
"Cache-Control": "no-cache",
"Connection": "Upgrade",
"Cookie": "wa_ul=7d0d707f-e595-4407-bd97-6fe910abdfd2",
"Host": "web.whatsapp.com",
"Origin": "https://web.whatsapp.com",
"Pragma": "no-cache",
"Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
"Sec-WebSocket-Key": "1dC+G8LQN/vSDleaA9TIOA==",
"Sec-WebSocket-Version": "13",
"Upgrade": "websocket",
"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"}
ws.connect('wss://web.whatsapp.com/ws', '', headers);
console.log(ws)


