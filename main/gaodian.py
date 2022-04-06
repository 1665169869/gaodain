import webbrowser
import requests
import time, logging
import re
import winreg
from tqdm import tqdm
from socket import gethostbyname
from os import system as os_system
import os
from win32api import MessageBox, ShellExecute
from win32con import MB_OK, MB_ICONERROR, MB_ICONWARNING
import socket


exeName = "gaodian_update_setup.exe"
def get_host_ip():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.connect(('8.8.8.8', 80))
        return s.getsockname()[0]
class Update:
    def __init__(self) -> None:
        self.updateUrl = "http://v5.yungao-tech.com/api/update" # 更新接口
        self.version = "3.4" # 当前版本号
    def update(self) -> bool:
        """
        更新软件 如果不需要更新直接返回true 如果需要更新则开始更新 更新失败或其他原因返回false 成功返回true
        """
        params = {
            "version": self.version
        }
        with requests.get(self.updateUrl, params=params) as r:
            if r.status_code == 200:
                result = r.json()
                
                logging.info(result)
                if result['status'] == 0:
                    return True
                elif result['status'] == 1:
                    print(f"""
                    正在下载更新程序 如果下载失败请手动打开下载地址
                    下载地址:{result['url']}
                    更新说明:{result['note']}
                    更新期间请勿关闭该程序
                    """)
                    res = requests.get(result['url'], stream=True)
                    length = int(res.headers.get('content-length', 0))
                    with open(exeName, 'wb') as file, tqdm(desc=exeName, total=length, unit='iB', unit_scale=True, unit_divisor=1024) as bar:
                        for data in res.iter_content(chunk_size=1024):
                            size = file.write(data)
                            bar.update(size)
                        if res.status_code != 200:
                            return False
                        else:
                            bar.close()
                            file.close()
                            print(
                                    """
                                    下载完毕，打开更新程序中
                                    请勿关闭该窗口！！！
                                    请勿关闭该窗口！！！
                                    请勿关闭该窗口！！！
                                    """
                                )
                            os_system(exeName)
                        
            else:
                logging.warning(f"status code: {r.status_code}")
                return False
            r.close()
            res.close()
            return True
        


def getRegKey(value_name):
    _key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Software\Microsoft\Windows\CurrentVersion\Internet Settings")
    z, x, c = winreg.QueryInfoKey(_key) # 子目录数量,键值数量,最后修改时间
    for i in range(x):
        _name,value,_type = winreg.EnumValue(_key, i)
        if _name == value_name:
            break
    return value

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

def main():
    h = Host()
    u = Update()
    ProxyEnable = getRegKey("ProxyEnable")
    if ProxyEnable == 1:
        MessageBox(0, "请先关掉代理或加速器后再重新打开该软件！", "请关闭代理！",MB_ICONERROR)
        logging.warning(f"设备开启了代理或其他软件 ProxyEnable:{ProxyEnable}")
        return 0
    if h.replace_Host("v4.yungao-tech.com", gethostbyname("bilibili.ffstu.cn")) == False:
        logging.warning("更新程序错误。无法设置HOSTS")
        MessageBox(0, "更新程序无法设置hosts\n虽然不影响使用但建议联系作者解决\n按确定继续使用", "更新程序问题",MB_ICONWARNING)
        return 0
    if u.update():
        file = os.path.split(os.path.realpath(__file__))[0]
        file = file.replace("\\", "/")
        

        

        
        url = f"file:///{file}/assets/login.html?myip={get_host_ip()}"
        print(url)
        # webbrowser.open(url, 1)
        # time.sleep(20)
from threading import Timer
if __name__ == "__main__":
    main()
    Timer(1, open_browser()).start()
def open_browser():
    file = os.path.split(os.path.realpath(__file__))[0]
    file = file.replace("\\", "/")
    webbrowser.open(f"file:///{file}/assets/login.html?myip={get_host_ip()}")