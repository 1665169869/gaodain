import winreg

def getRegKey(value_name):
    _key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Software\Microsoft\Windows\CurrentVersion\Internet Settings")
    z, x, c = winreg.QueryInfoKey(_key) # 子目录数量,键值数量,最后修改时间
    value = _x(_key, value_name, x)
    return value


def _getRegKey(value_name):
    _key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Software\Microsoft\Windows\CurrentVersion\Internet Settings")
    z, x, c = winreg.QueryInfoKey(_key) # 子目录数量,键值数量,最后修改时间
    for i in range(x):
        _name,value,_type = winreg.EnumValue(_key, i)
        if _name == value_name:
            break
    return value

def _x(_key, _value, i):
    if i != 0:
        i = i - 1
    value = winreg.EnumValue(_key, i)
    if value[0] == _value:
        return value[1]
    elif i == 0:
        return None
    if i >= 0:
        return _x(_key, _value, i)