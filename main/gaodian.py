from API import GaoDian
import sys
from PyQt5.QtCore import *
# from PyQt5.QtWebEngineWidgets import *
from PyQt5.QtWidgets import *
from PyQt5.QtGui import QIcon

class MainWindow(QMainWindow):
    def __init__(self):
        super(MainWindow, self).__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle('糕点')  # 窗口标题
        self.resize(415, 550)  # 窗口的大小和位置设置
        # self.setWindowFlags(Qt.FramelessWindowHint)  # 关闭标题栏
        self.setWindowFlags(Qt.WindowCloseButtonHint)  # 去掉左上角图标 | 只显示关闭按钮
        self.setWindowIcon(QIcon('iconfont.png'))  # 设置窗口图标
        self.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    win = MainWindow()
    app.exit(app.exec_())
