# 更新程序，待定
from re import U
import requests
import sys

class update:
    def __init__(self, version = None) -> None:
        self.updateUrl = "https://bilibili.ffstu.cn/baiyu/gaogao/update.php"
        self.downUrl = None
        self.isUpdate = False
        self.forceUpdate = False
        self.md5 = ""
        self.code = 200
        self.version = None
        self.msg = ""
        self.exeSize = 0
        self.newVersion = None
        self.status_code = None
        if self.version != version:
            self.version = version
        self.u()

    def u(self, version = None):
        if self.version != version:
            self.version = version 
        data = {
            "version": self.version
        }
        res = requests.get(self.updateUrl, params=data)
        self.status_code = res.status_code
        if res.status_code == 200:
            result = res.json()
            if result["code"] == 200:
                self.code = result["code"]
                self.msg = result["msg"]
                self.downUrl = result["data"]["exeUrl"]
                self.exeSize = result["data"]["exeSize"]
                self.newVersion = result["data"]["version"]
                self.isUpdate = result['data']['isUpdate']
                self.forceUpdate = result['data']['forceUpdate']
            return True
        return False

    def download():
        pass