import requests

r = requests.head("http://bilibili.ffstu.cn//baiyu//gaogao//down//gaodian_setup.3.1.4.exe")
print(r.headers)
pass