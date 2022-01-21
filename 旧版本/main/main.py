import sys

from PyQt5.QtCore import *
from PyQt5.QtWebEngineWidgets import *
from PyQt5.QtWidgets import *


class MainWindow(QMainWindow):
    def __init__(self):
        super(MainWindow, self).__init__()
        self.browser = QWebEngineView()

    def initUI(self, url=None):
        self.setWindowTitle('糕糕')  # 窗口标题
        self.resize(415, 550)  # 窗口的大小和位置设置
        # self.setWindowFlags(Qt.FramelessWindowHint)  # 关闭标题栏
        self.setWindowFlags(Qt.WindowCloseButtonHint)  # 去掉左上角图标 | 只显示关闭按钮
        # 加载外部的web界面
        self.browser.load(QUrl(url))
        self.setCentralWidget(self.browser)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    win = MainWindow()
    win.initUI('http://127.0.0.1:5000/login')
    win.show()
    app.exit(app.exec_())
