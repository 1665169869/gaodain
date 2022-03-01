from http.server import HTTPServer, SimpleHTTPRequestHandler
from flask import Flask, Response
from flask_cors import cross_origin
import json
import socket
 
app = Flask(__name__)

@app.route('/api/getIp', methods=['GET', 'POST'])
@cross_origin()
def api_getIP():
    data = {
        "ip": get_host_ip()
    }
    return is_json(json.dumps(data), True)

def is_json(text, result):
    if result:
        return Response(text, mimetype="application/json")
    else:
        return Response(text)

def get_host_ip():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.connect(('8.8.8.8', 80))
        return s.getsockname()[0]

 

def server_dir(host, port):
    server = HTTPServer((host, port), SimpleHTTPRequestHandler)
    server.serve_forever()
def server_api(host, port):
    app.run(host=host, port=port)


if __name__ == '__main__':
    server_api("127.0.0.1", 55582)