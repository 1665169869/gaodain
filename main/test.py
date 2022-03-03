import sys
import getopt
 
 
def site(argv = []):
    # sys.argv[1:]
    name = None
    url = None
    if len(argv) == 0:
        return
    
    for arg in argv:
        if arg in ['-h', '--help']:
            print(
                """
                没事乱打开你妈的update呢？还输入help参数？
                告诉你又如何？
                -h --help:\t 帮助
                -v --version:\t 当前版本号
                """
            )
            return
        

    try:
        opts, args = getopt.getopt(argv, "v:h:", ["version=", "help="])  # 短选项模式
     
    except Exception as e:
        print(e)
 
    for opt, arg in opts:
        if opt in ['-v', '--version']:
            version = arg
     

 
# site(sys.argv[1:])
site(["-h"])