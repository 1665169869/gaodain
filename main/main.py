from time import sleep, time
import webbrowser
from socket import gethostbyname
from win32api import MessageBox
from win32con import MB_OK, MB_ICONERROR, MB_ICONWARNING
import socket
from tqdm import tqdm
import getreg
import requests
import logging
from hashlib import md5
import re, os
# from tkinter import mainloop
# 打包命令：pyinstaller .\main\main.py -D -n gaodian -i .\main\img\favicon.ico --uac-admin
# 3.1.7（包括）以后的版本建议使用ipfs网盘的下载地址更新
version = "3.1.8"
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s', datefmt="%a %b %d %H:%M:%S %Y")
def line_of_text(text: str, of_text: str):
    """
    获取某段文本所在行 存在返回所在行数(0开始算) 失败或不存在返回-1
    """
    split_text = text.split("\n")
    for index in range(len(split_text)):
        if split_text[index].find(of_text) != -1:
            return index
    return -1

def x(t):
    """
    删除文本空行
    """
    if t[:2] == "\n":
        t = t[2:]
    if t[2:] == "\n":
        t = t[:2]
    return re.sub("(?:^\r|\n$)", "", t)


class Host:
    def __init__(self) -> None:
        self.HOSTS_FILE = r'C:\Windows\System32\drivers\etc\hosts' #windows Hosts文件路径
    def replace_Host(self, host: str, ip: str) -> bool:
        """
        更新hosts 或者说修改hosts 返回bool
        """
        hosts_text: str = x(self.read())
        text_line: int = line_of_text(hosts_text, host)
        split_text = hosts_text.split("\n")
        hosts_text = ""
        if text_line != -1:
            split_text.remove(split_text[text_line])
        split_text.append(f"{ip} {host}")
        for index in range(len(split_text)):
            if index == len(split_text):
                hosts_text += split_text[index]
            else:
                hosts_text += split_text[index] + "\n"
        return self.write(hosts_text)
        
    def read(self) -> str:
        """
        读hosts文件内容 返回文件内容 如果读取失败返回空文本
        """
        try:
            with open(self.HOSTS_FILE, "r+",encoding="utf-8") as f:
                result = f.read()
                f.close()
            return result
        except Exception as e:
            # 报错异常处理  
            logging.error(f"读hosts文件的时候报错 {e}")
        return "" 
    def write(self, text: str) -> bool:
        """
        写hosts文件内容 返回Bool类型 如果读取失败返回False
        """
        try:
            with open(self.HOSTS_FILE, "w+", encoding="utf-8") as f:
                if f.write(text) > 0:
                    f.flush()
                f.close()
                return True
        except Exception as e:
            # 报错异常处理
            logging.error(f"写入HOSTS的时候报错 {e}")
        return False

class Update:
    def __init__(self) -> None:
        self.updateUrl = "http://v5.yungao-tech.com/api/update?version={0}&_={1}".format(version, time())
        self.chunk_size = 1024
    def needUpdate(self) -> bool:
        with requests.get(self.updateUrl) as self.r:
            if self.r.status_code == 200:
                result: dict = self.r.json()
                self.newExeUrl: str = result.get("url")
                self.note: str = result.get('note')
                self.exeName: str = result.get('exeName')
                self.md5: str = result.get('md5')
                logging.info(result)
                if result.get('status') == 1:
                    return True
                else:
                    return False
            else:
                self.r.close()
                logging.error(f"status.code: {self.r.status_code} 无法更新")
                return False
                # raise RuntimeError(f"status.code: {self.r.status_code} 无法更新")
        
    def download(self) -> bool:
        # self.exeName = self.newExeUrl[self.newExeUrl.rfind("/")+1:]
        self.r = requests.get(self.newExeUrl, stream=True)
        content_length = int(self.r.headers.get('Content-Length'))

        data_count = 0
        with open(self.exeName, 'wb') as file:
            bar = tqdm(
            desc=self.exeName, total=content_length, unit='B', unit_scale=True, unit_divisor=self.chunk_size)
            for data in self.r.iter_content(chunk_size=self.chunk_size):
                size = file.write(data)
                bar.update(size)
            file.close()
            bar.close()

        with open(self.exeName, "rb") as file:
            data = file.read()
            self.file_md5 = md5(data).hexdigest()
            if self.file_md5 != self.md5:
                return False
            else:
                return True
        


        



        

def get_host_ip():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.connect(('8.8.8.8', 80))
        return s.getsockname()[0]



def newIp(host):
    """
    通过域名获取服务端最新IP
    """
    return gethostbyname(host)

def main():
    try:
        ProxyEnable = getreg.getRegKey("ProxyEnable")
        pc = Host()
        update = Update()
        # h.debug = True
        host = "v5.yungao-tech.com"
        if pc.replace_Host(host, newIp("bilibili.ffstu.cn")):
            if ProxyEnable == 1:
                logging.warning("开启了http代理 无法检查更新")
                MessageBox(0, "无法开启更新程序 建议先关闭代理\n不然可能遗漏重要更新\n并且可能导致无法正常使用", "建议关掉代理",MB_ICONWARNING)
            else:
                if update.needUpdate():
                    MessageBox(0, "有新版本,请立刻更新!", "发现新版!", MB_OK)
                    print(f"""
                        更新地址: {update.newExeUrl}
                        更新公告: {update.note}
                        md5哈希值: {update.md5}
                        如果更新失败请通过上面的更新地址进行手动更新
                        """)
                    if update.download():
                        print("""
                                打开更新程序中 请勿关闭该窗口！！！
                                如需关闭请通过更新程序的提示来关闭
                                切记切记
                            """)
                        sleep(1)
                        os.system(update.exeName)
                        return
                    else:
                        logging.error("新安装包md5哈希值不一致: \n已下载的文件md5:{0} 服务端上的md5:{1}".format(update.file_md5, update.md5))
                        MessageBox(0, "新安装包出现哈希值md5错误\n文件受损建议手动更新.", "安装包出问题了", MB_ICONERROR)

        else:
            logging.warning("更新程序无法启动 原因是无法修改hosts")
            MessageBox(0, "无法修改hosts文件\n建议使用右键管理员模式重新打开程序", "尝试管理员运行",MB_ICONWARNING)

        t = int(time())
        ip = get_host_ip()
        webbrowser.open(f"http://{host}/baiyu/gaogao/gaodian/main/assets/login.html?time={t}&myip={ip}")
        logging.info(f"Url:http://{host}/baiyu/gaogao/gaodian/main/assets/login.html?time={t}&myip={ip}")

    except Exception as e:
        logging.error(f"""
            程序报错了， 报错信息：{e.__traceback__.tb_frame.f_globals["__file__"]} [line:{e.__traceback__.tb_lineno}] error: {e}
            如遇报错请检查以下原因：
            是否连接校园网
            是否开启了代理
            是否允许管理员模式运行
            hosts文件是否存在
            防火墙和杀毒是否拦截此软件
        """)
    for i in range(5):
        sleep(1)
        print("\r{0}秒后自动关闭程序……".format(5-(i+1)), end="")
if __name__ == "__main__":
    main()
