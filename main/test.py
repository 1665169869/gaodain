import os
print(os.path.realpath(__file__))
#当前文件所在的目录，即父路径
print(os.path.split(os.path.realpath(__file__))[0])
#找到父路径下的其他文件，即同级的其他文件