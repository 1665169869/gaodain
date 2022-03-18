# 更新程序，待定
import requests
import sys, getopt
import time
import logging
from os import system as os_system
from tqdm import tqdm


class update:
    def __init__(self, version=None) -> None:
        self.updateUrl = "http://v5.yungao-tech.com/baiyu/gaogao/update.php"
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
        self.exeName = None
        self.chunk_size = 1024
        self.u(self.version)

    def if_update(self, version):
        if self.version != version:
            self.version = version
        if self.status_code != 200:
            return True
        if self.version != self.newVersion:
            return True
        else:
            False

    def u(self, version=None):
        if self.version != version:
            self.version = version
        data = {
            "version": self.version
        }
        res = requests.get(self.updateUrl, params=data)
        self.status_code = res.status_code
        if res.status_code == 200:
            result = res.json()
            if result.get("code") is not None:
                self.code = result.get("code")
                self.msg = result.get("msg")
                if type(result.get("data")) == dict:
                    self.downUrl = result["data"].get("exeUrl")
                    self.exeSize = result["data"].get("exeSize")
                    self.newVersion = result["data"].get("version")
                    self.isUpdate = result["data"].get("isUpdate")
                    self.forceUpdate = result["data"].get("forceUpdate")
                    self.exeName = result["data"].get("exeName", "gaodian_setup.exe")
            return True
        return False

    def download(self,  func=None):
        r = requests.get(self.downUrl.replace("bilibili.ffstu.cn", "v5.yungao-tech.com"), stream=True)
        length = int(r.headers.get('content-length', 0))
        with open(self.exeName, 'wb') as file, tqdm(
            desc=self.exeName, total=length, unit='iB', unit_scale=True, unit_divisor=self.chunk_size) as bar:
            for data in r.iter_content(chunk_size=self.chunk_size):
                size = file.write(data)
                bar.update(size)


def site(argv = []):
    # sys.argv[1:]
    name = None
    url = None
    if len(argv) == 0:
        return None
    
    for arg in argv:
        if arg in ['-h', '--help']:
            print(
                """
                没事乱打开你妈的update呢?
                还输入help参数?
                告诉你又如何?
                -h --help:\t 帮助
                -v --version:\t 当前版本号
                """
            )
            return None
    
    if len(argv) <= 1:
        return
        

    try:
        opts, args = getopt.getopt(argv, "v:h:", ["version=", "help="])  # 短选项模式
     
    except Exception as e:
        print(e)
 
    for opt, arg in opts:
        if opt in ['-v', '--version']:
            version = arg
            return version
    return None
def run(argv):
    result = site(argv)
    # result = site(["-v", "2.0.0"])
    if result is not None:
        print(
            """
            请勿关闭该窗口！！！
            请勿关闭该窗口！！！
            请勿关闭该窗口！！！
            \n
            更新程序中,请稍后……
            由于不想写可视化窗口,所以更新程序会简陋些,见谅.
            两秒后开始下载更新程序...
            """
        )
        u = update()
        u.version = result
        time.sleep(2)
        try:
            u.download()
        except requests.exceptions as e:
            logging.error(e)
        except Exception as e:
            logging.error(e)
        
        else:
            print(
                """
                下载完毕，打开更新程序中
                请勿关闭该窗口！！！
                请勿关闭该窗口！！！
                请勿关闭该窗口！！！
                """
            )
            os_system(u.exeName)