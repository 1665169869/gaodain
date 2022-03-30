# import logging
import sys, os
from time import sleep, time
import webbrowser
import gaodian_update
from socket import gethostbyname
from win32api import MessageBox
from win32con import MB_OK, MB_ICONERROR
import socket
import getreg

# from tkinter import mainloop
# 打包命令：pyinstaller .\main\main.py -D --NAME=gaodian -i .\main\img\favicon.ico --uac-admin
version = "3.1.4"

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

        hosts = ""
        with open(hosts_file, "r+", encoding="utf-8") as f:
            hosts_list = f.readlines()
            f.close()

        with open(hosts_file, "w+", encoding="utf-8") as f:
            index = 0
            for l in range(len(hosts_list)):
                if hosts_list[l].find("v5.yungao-tech.com") != -1:
                    index = index + 1
            for i in range(len(hosts_list)):
                if index == 0:
                    hosts_list.append(f"{ip} {host}")
                else:
                    if hosts_list[i].find("v5.yungao-tech.com") != -1:
                        hosts_list[i] = f"{ip} {host}"
                hosts += hosts_list[i] + "\n"
            if len(hosts_list) == 0:
                hosts = f"{ip} {host}"
            f.write(hosts)
            f.flush()
            f.close()

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
        ProxyEnable = getreg.getRegKey("ProxyEnable")
        pc = PcHosts()
        # h.debug = True
        host = "v5.yungao-tech.com"
        pc.set_host(host, newIp("bilibili.ffstu.cn"))
        
        if ProxyEnable == 1:
            MessageBox(0, "请先关掉代理或加速器后再重新打开该软件！", "请关闭代理！",MB_ICONERROR)
        else:
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
        print(f"""
            程序报错了， 报错信息：
            {e}
            按回车关闭该窗口。
        """)
        input()