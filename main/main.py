import sys
import server
import _thread
import os
import webbrowser
import time
# from PyQt5.QtCore import *
# from PyQt5.QtWebEngineWidgets import *
# from PyQt5.QtWidgets import *


# class MainWindow(QMainWindow):
#     def __init__(self):
#         super(MainWindow, self).__init__()
#         self.browser = QWebEngineView()
#         self.host = "127.0.0.1"
#         self.port = 55581
#     def initUI(self):
#         self.setWindowTitle('糕糕')  # 窗口标题
#         self.resize(415, 550)  # 窗口的大小和位置设置
#         # self.setWindowFlags(Qt.FramelessWindowHint)  # 关闭标题栏
#         self.setWindowFlags(Qt.WindowCloseButtonHint)  # 去掉左上角图标 | 只显示关闭按钮
#         # 加载外部的web界面
#         self.browser.load(QUrl(f"http://{self.host}:{self.port}/"))
#         self.setCentralWidget(self.browser)
#         os.chdir(os.path.split(os.path.realpath(__file__))[0] + "\\assets")
#         _thread.start_new_thread(server.server_dir, (self.host, self.port))
#         _thread.start_new_thread(server.server_api, (self.host, self.port + 1))
    

# if __name__ == '__main__':
#     app = QApplication(sys.argv)
#     win = MainWindow()
    
#     win.initUI()
#     win.show()
#     app.exit(app.exec_())


if __name__ == '__main__':
    host = "127.0.0.1"
    port = 55581
    os.chdir(os.path.split(os.path.realpath(__file__))[0] + "\\assets")
    _thread.start_new_thread(server.server_dir, (host, port))
    _thread.start_new_thread(server.server_api, (host, port + 1))
    webbrowser.open(f"http://{host}:{port}/")
    while 1:
        time.sleep(9999)
        pass
