# import logging
import sys, os
from time import sleep, time
import webbrowser
import gaodian_update
from socket import gethostbyname
from win32api import MessageBox
from win32con import MB_OK
import socket

# from tkinter import mainloop


version = "3.1.1"

class PcHosts:
    def __init__(self) -> None:
        self.Windows = r'C:\Windows\System32\drivers\etc\hosts'
        self.Mac = r'/etc/hosts'
        self.Linux = r'/etc/hosts'
        self.os = sys.platform # 获取当前操作系统
        self.debug = False

    
    def file_hosts(self):
        """
        当前系统的hosts文件路径
        :return: 返回当前系统的hosts文件路径
        """
        if self.os == "win32":
            result = self.Windows
        elif self.os == "linux" or self.os == "linux2" or self.os == "linux3":
            result = self.Linux
        elif self.os == "darwin":
            result = self.Mac
        else:
            raise ValueError("未知操作系统", self.os)
        return result
    def set_host(self, host, ip):
        """
        修改hosts文件
        :param host:  域名
        :param ip:  IP
        :return: 返回bool 成功返回true
        """
        if self.debug == True:
            hosts_file = os.path.split(os.path.realpath(__file__))[0] + r"\test.txt"
        else:
            hosts_file = self.file_hosts()

        with open(hosts_file, "w+", encoding="utf-8") as f:
            content = f"{ip} {host}"
            result = f.write(content)
            f.flush()
            f.close()
        if result <= 0:
            return False
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


if __name__ == "__main__":

    try:
        pc = PcHosts()
        # h.debug = True
        host = "v5.yungao-tech.com"
        pc.set_host(host, newIp("bilibili.ffstu.cn"))
        up = gaodian_update.update()
        
        if up.if_update(version):
            MessageBox(0, "有新版本,请立刻更新!", "发现新版!", MB_OK)
            gaodian_update.run(["-v", version])
            sleep(2)
        else:
            t = time() * 1000
            ip = get_host_ip()
            webbrowser.open(f"http://{host}/baiyu/gaogao/gaodian/main/assets/login.html?time={t}&myip={ip}")
            print(f"http://{host}/baiyu/gaogao/gaodian/main/assets/login.html?time={t}&myip={ip}")
            # cmd = '"{0}"'.format(os.path.split(os.path.realpath(__file__))[0] + "\\open.exe")
            # os.system(cmd)
    except Exception as e:
        print(e)