import os
import subprocess
import io
# r = os.popen("systeminfo")
# result = r.read()
# r.close()
# print(result)
r = subprocess.Popen("chcp 65001", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, bufsize=-1)
r.communicate("systeminfo")
r.wait()
a = r.stdout.read()
print(a.decode("gbk"))