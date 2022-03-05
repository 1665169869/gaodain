#include <windows.h>

int main()
{
    ShellExecute(NULL, "open", "http://v5.yungao-tech.com/baiyu/gaogao/gaodian/login.html", NULL, NULL, SW_HIDE);
    return 0;
}