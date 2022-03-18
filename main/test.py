
file = "C:\\Windows\\System32\\drivers\\etc\\hosts"
host = "127.0.0.1 v5.yungao-tech.com"
hosts = ""
with open(file, "r+", encoding="utf-8") as f:
    hosts_list = f.readlines()
    f.close()

with open(file, "w+", encoding="utf-8") as f:
    for i in range(len(hosts_list)):
        if hosts_list[i].find("v5.yungao-tech.com") != -1:
            hosts_list[i] = host
        hosts += hosts_list[i] + "\n"
    f.write(hosts)
    f.flush()
    f.close()