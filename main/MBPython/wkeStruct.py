# -*- coding:utf-8 -*-
from ctypes import (
    c_int,
    c_ushort,
    c_long,
    c_longlong,
    c_char,
    c_char_p,
    c_wchar_p,
    c_bool,
    c_void_p,
    c_size_t,
    Structure,
    POINTER
    )

from ctypes.wintypes import (
    LPARAM,
    DWORD,
    LONG,
    WORD,
    BYTE
)

class wkeProxy(Structure):

    _fields_ = [('type', c_int),('hostname', c_char *100),('port', c_ushort ),('username', c_char *50),('password',c_char *50)]
class wkeRect(Structure):

    _fields_=[('x',c_int),('y',c_int),('w',c_int),('h',c_int)]
class wkeMemBuf(Structure):

    _fields_=[('size',c_int),('data',c_char_p),('length',c_size_t)]
class wkeString(Structure):
    ...
class wkePostBodyElement(Structure):

    _fields_=[('size',c_int),('type',c_int),('data',POINTER(wkeMemBuf)),('filePath',wkeString),('fileStart',c_longlong),('fileLength',c_longlong)]
    ...
class wkePostBodyElements(Structure):

    _fields_ =[('size',c_int),('element',POINTER(POINTER(wkePostBodyElement))),('elementSize',c_size_t),('isDirty',c_bool)]
class wkeScreenshotSettings(Structure):

    _fields_=[('structSize',c_int),('width',c_int),('height',c_int)]
class wkeWindowFeatures(Structure):

    _fields_=[('x',c_int),('y',c_int),('width',c_int),('height',c_int),('menuBarVisible',c_bool),('statusBarVisible',c_bool),('toolBarVisible',c_bool),('locationBarVisible',c_bool),('scrollbarsVisible',c_bool),('resizable',c_bool),('fullscreen',c_bool)]

class wkePrintSettings(Structure):

    _fields_=[('structSize',c_int),('dpi',c_int),('width',c_int),('height',c_int),('marginTop',c_int),('marginBottom',c_int),('marginLeft',c_int),('marginRight',c_int),('isPrintPageHeadAndFooter',c_bool),('isPrintBackgroud',c_bool),('isLandscape',c_bool)]
class wkePdfDatas(Structure):

    _fields_=[('count',c_int),('sizes',c_size_t),('datas',c_void_p)]

class Rect(Structure):

    _fields_=[('Left',c_int),('Top',c_int),('Right',c_int),('Bottom',c_int)]

class mPos(Structure):

    _fields_=[('x',c_int),('y',c_int)]

class mSize(Structure):
    ...
mSize._fields_=[('cx',c_int),('cy',c_int)]

class bitMap(Structure):

    _fields_=[('bmType',c_int),('bmWidth',c_int),('bmHeight',c_int),('bmWidthBytes',c_int),('bmPlanes',c_int),('bmBitsPixel',c_int),('bmBits',c_int)]

class blendFunction(Structure):

    _fields_=[('BlendOp',BYTE),('BlendFlags',BYTE),('SourceConstantAlpha',BYTE),('AlphaFormat',BYTE)]


class COMPOSITIONFORM(Structure):

    _fields_=[('dwStyle',c_int),('ptCurrentPos',mPos),('rcArea',Rect)]


class BITMAPINFOHEADER(Structure):
    """ ??????DIB????????????????????????????????? """
    _fields_ = [
        ("biSize", DWORD),
        ("biWidth", LONG),
        ("biHeight", LONG),
        ("biPlanes", WORD),#?????????1
        ("biBitCount", WORD),#1(??????)???4(16???)???8(256???)???24(?????????)???32(?????????)
        ("biCompression", DWORD),#0?????????
        ("biSizeImage", DWORD),#?????????????????????????????????????????????
        ("biXPelsPerMeter", LONG),
        ("biYPelsPerMeter", LONG),
        ("biClrUsed", DWORD),#?????????????????????????????????????????????
        ("biClrImportant", DWORD)#???????????????????????????????????????
    ]
class BITMAPFILEHEADER(Structure):
    __file__=[
        ('bfType',c_int),#BMP?????????19778????????????BM
        ('bfSize',c_int),#??????????????????14 + BITMAPINFOHEADER.biSize + BITMAPINFOHEADER.biSizeImage
        ('bfReserved1',c_int),
        ('bfReserved2',c_int),
        ('bfOffBits',c_int)#?????????????????????????????????????????????:14 + BITMAPINFOHEADER.biSize
    ]
class BITMAPINFO(Structure):

    _fields_ = [("bmiHeader", BITMAPINFOHEADER), ("bmiColors", DWORD * 3)]

class COPYDATASTRUCT(Structure):
    _fields_ = [('dwData', LPARAM),('cbData', DWORD),('lpData', c_char_p)]

    
from . import _LRESULT
class PAINTSTRUCT(Structure):
    _fields_=[('hdc',_LRESULT),('fErase',c_int),('rcPaint',Rect),('fRestore',c_int),('fIncUpdate',c_int),('rgbReserved',c_char *32)]
