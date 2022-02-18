import os

a = os.path.split(os.path.realpath(__file__))[0]
print(a)
os.chdir(a + '\\templates')

a = os.getcwd()
print(a)
pass