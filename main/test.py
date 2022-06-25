# -*- coding:utf-8 -*-
from MBPython import miniblink
from os import getcwd


init_path=getcwd()
# node_path=f'{init_path}/node.dll'
node_path=F'{init_path}\\main\\miniblink_x64.dll'
mbpython=miniblink.Miniblink
mb=mbpython.init(node_path)
wke=mbpython(mb)
network = wke.network
window=wke.window
callback=wke.callback
webview=window.wkeCreateWebWindow(0,0,0,0,860,760)
callback.wkeOnWindowDestroy(webview)
network.wkeLoadURLW(webview,'https://bilibili.ffstu.cn/')
window.wkeShowWindow(webview)
window.wkeShowWindow(webview)
window.wkeRunMessageLoop()