import json
import logging
import requests
import socket
import os, sys, time
from hashlib import md5

API = {
    "service": "https://v3.yungao-tech.com/",
    "confessionService": "http://106.55.190.205:8099/",
    "websocketservice": "https://admin.v3.yungao-tech.com/",
    "socketService": "106.55.190.205:8099/notification",
    "share": "https://apply.yungao-tech.cn/",
    "pic": "api/uploadImgages",
    "sendNote": {
        "url": "api/send",
        "method": "POST",
        "token": False,
        "name": "获取验证码",
    },
    "smsLogin": {
        "url": "api/smsLogin",
        "method": "POST",
        "token": False,
        "name": "验证码登录",
    },
    "login": {
        "url": "api/login",
        "method": "POST",
        "token": False,
        "name": "密码登录",
    },
    "editUser": {
        "url": "api/editUser",
        "method": "POST",
        "token": True,
        "name": "密码登录",
    },
    "retrieve": {
        "url": "api/retrieve",
        "method": "POST",
        "token": False,
        "name": "修改密码",
    },
    "logout": {
        "url": "api/logout",
        "method": "POST",
        "token": True,
        "name": "退出登录",
    },
    "indexApi": {
        "url": "api/indexApi",
        "method": "GET",
        "token": True,
        "name": "首页信息",
    },
    "subQuestion": {
        "url": "api/subQuestion",
        "method": "POST",
        "token": False,
        "name": "报告问题||问题反馈",
    },
    "goods": {
        "url": "api/Internet/goods",
        "method": "GET",
        "token": True,
        "name": "套餐列表",
    },
    "create": {
        "url": "api/Internet/create",
        "method": "POST",
        "token": True,
        "name": "生成订单",
    },
    "info": {
        "url": "api/Internet/info",
        "method": "GET",
        "token": True,
        "name": "订单详情",
    },
    "cancel": {
        "url": "api/Internet/cancel",
        "method": "POST",
        "token": True,
        "name": "退款||取消订单",
    },
    "cancelRefund": {
        "url": "api/Internet/cancelRefund",
        "method": "POST",
        "token": True,
        "name": "取消退款申请",
    },
    "getList": {
        "url": "api/getList",
        "method": "GET",
        "token": True,
        "name": "订单列表",
    },
    "loginApp": {
        "url": "api/Internet/loginApp",
        "method": "POST",
        "token": True,
        "name": "手机网络认证",
    },
    "loginQrCode": {
        "url": "api/Internet/loginQrCode",
        "method": "POST",
        "token": True,
        "name": "电脑网络认证",
    },
    "troubleshooting": {
        "url": "api/Internet/troubleshooting",
        "method": "POST",
        "token": True,
        "name": "手机网络认证",
    },
    "ReleaseArticle": {
        "type": "socket",
        "url": "api/Community/ReleaseArticle",
        "method": "POST",
        "token": True,
        "name": "发布动态",
    },
    "follow": {
        "url": "api/Community/follow",
        "method": "POST",
        "token": True,
        "name": "关注的动态||首页动态",
    },
    "find": {
        "url": "api/Community/find",
        "method": "POST",
        "token": True,
        "name": "发现动态",
    },
    "searchfind": {
        "url": "api/Community/find",
        "method": "POST",
        "token": True,
        "name": "搜索动态",
    },
    "user": {
        "url": "api/Community/user",
        "method": "POST",
        "token": True,
        "name": "个人信息",
    },
    "dynamic": {
        "url": "api/Community/dynamic",
        "method": "POST",
        "token": True,
        "name": "个人资料动态",
    },
    "operation": {
        "type": "socket",
        "url": "api/Community/operation",
        "method": "POST",
        "token": True,
        "name": "关注他人||添加好友",
    },
    "fans": {
        "url": "api/Community/fans",
        "method": "POST",
        "token": True,
        "name": "关注列表||粉丝列表",
    },
    "like": {
        "type": "socket",
        "url": "api/Community/like",
        "method": "POST",
        "token": True,
        "name": "点赞动态||收藏动态",
    },
    "footprintList": {
        "url": "api/user/footprintList",
        "method": "GET",
        "token": True,
        "name": "足迹",
    },
    "content": {
        "url": "api/Community/content",
        "method": "POST",
        "token": True,
        "name": "动态详情",
    },
    "wordTopic": {
        "url": "api/Community/wordTopic",
        "method": "POST",
        "token": True,
        "name": "热门话题",
    },
    "comment": {
        "url": "api/Community/comment",
        "method": "POST",
        "token": True,
        "name": "评论列表",
    },
    "getFavoritesList": {
        "url": "api/user/getFavoritesList",
        "method": "GET",
        "token": True,
        "name": "收藏列表",
    },
    "report": {
        "url": "api/report",
        "method": "POST",
        "token": True,
        "name": "举报",
    },
    "pullBlack": {
        "url": "api/user/pullBlack",
        "method": "POST",
        "token": True,
        "name": "拉黑用户",
    },
    "delDy": {
        "url": "api/Community/delDy",
        "method": "POST",
        "token": True,
        "name": "删除动态",
    },
    "likeComment": {
        "url": "api/likeComment",
        "method": "POST",
        "token": True,
        "name": "点赞评论",
    },
    "ReleaseComment": {
        "type": "socket",
        "url": "api/Community/ReleaseComment",
        "method": "POST",
        "token": True,
        "name": "评论",
    },
    "delComment": {
        "url": "api/Community/delComment",
        "method": "POST",
        "token": True,
        "name": "删除评论",
    },
    "examinedList": {
        "url": "api/Friend/examinedList",
        "method": "POST",
        "token": True,
        "name": "好友申请列表",
    },
    "Friendstatu": {
        "url": "api/Friend/status",
        "method": "POST",
        "token": True,
        "name": "好友申请通过||拒绝",
    },
    "Friendlist": {
        "url": "api/Friend/list",
        "method": "POST",
        "token": True,
        "name": "好友列表",
    },
    "Grouplist": {
        "url": "api/Group/list",
        "method": "POST",
        "token": True,
        "name": "群聊列表",
    },
    "Friendsearch": {
        "url": "api/Friend/search",
        "method": "POST",
        "token": True,
        "name": "搜索添加好友列表",
    },
    "establish": {
        "url": "api/Group/establish",
        "method": "POST",
        "token": True,
        "name": "新建群聊",
    },
    "remarks": {
        "url": "api/Friend/remarks",
        "method": "POST",
        "token": True,
        "name": "修改好友备注",
    },
    "judge": {
        "url": "api/Friend/judge",
        "method": "POST",
        "token": True,
        "name": "查询好友详细信息",
    },
    "block": {
        "url": "api/Friend/block",
        "method": "POST",
        "token": True,
        "name": "拉黑好友",
    },
    "delete": {
        "url": "api/Friend/delete",
        "method": "POST",
        "token": True,
        "name": "删除好友",
    },
    "detailed": {
        "url": "api/Group/detailed",
        "method": "POST",
        "token": True,
        "name": "群聊信息",
    },
    "headSculpture": {
        "url": "api/Group/headSculpture",
        "method": "POST",
        "token": True,
        "name": "修改群头像",
    },
    "notice": {
        "url": "api/Group/notice",
        "method": "POST",
        "token": True,
        "name": "修改群公告",
    },
    "flocknickname": {
        "url": "api/Group/nickname",
        "method": "POST",
        "token": True,
        "name": "修改群名",
    },
    "flockremarks": {
        "url": "api/Group/remarks",
        "method": "POST",
        "token": True,
        "name": "修改群昵称",
    },
    "Grouptop": {
        "url": "api/Group/top",
        "method": "POST",
        "token": True,
        "name": "群置顶",
    },
    "doNotDisturb": {
        "url": "api/Group/doNotDisturb",
        "method": "POST",
        "token": True,
        "name": "群消息免打扰",
    },
    "listUser": {
        "url": "api/Group/listUser",
        "method": "POST",
        "token": True,
        "name": "群成员列表||群聊我的好友列表",
    },
    "personnel": {
        "url": "api/Group/personnel",
        "method": "POST",
        "token": True,
        "name": "添加群成员||删除群成员",
    },
    "quit": {
        "url": "api/Group/quit",
        "method": "POST",
        "token": True,
        "name": "退出群聊||解散群聊",
    },
    "bindUid": {
        "type": "socket",
        "url": "api/worker/bindUid",
        "method": "POST",
        "token": True,
        "name": "用户绑定",
    },
    "userSend": {
        "type": "socket",
        "url": "api/worker/send",
        "method": "POST",
        "token": True,
        "name": "发送消息",
    },
    "getChatRecordList": {
        "url": "api/worker/getChatRecordList",
        "method": "GET",
        "token": True,
        "name": "onebattleone聊天记录",
    },
    "saveAskMsg": {
        "url": "api/worker/saveAskMsg",
        "method": "POST",
        "token": True,
        "name": "记录最后一条信息",
    },
    "bindGroup": {
        "type": "socket",
        "url": "api/worker/bindGroup",
        "method": "POST",
        "token": True,
        "name": "加入群聊(绑定)",
    },
    "getChatRecordGroup": {
        "url": "api/worker/getChatRecordGroup",
        "method": "GET",
        "token": True,
        "name": "onebattlemore聊天记录",
    },
    "getChatList": {
        "type": "socket",
        "url": "api/worker/getChatList",
        "method": "GET",
        "token": True,
        "name": "聊天列表",
    },
    "fabulous": {
        "url": "api/worker/fabulous",
        "method": "POST",
        "token": True,
        "name": "赞我的列表",
    },
    "reply": {
        "url": "api/worker/reply",
        "method": "POST",
        "token": True,
        "name": "评论我的列表",
    },
    "aiteme": {
        "url": "api/worker/comment",
        "method": "POST",
        "token": True,
        "name": "艾特我的列表",
    },
    "workerInfo": {
        "url": "api/worker/workerInfo",
        "method": "GET",
        "token": True,
        "name": "消息页金刚区",
    },
    "versionUp": {
        "url": "api/versionUp",
        "method": "GET",
        "token": True,
        "name": "版本更新",
    },
    "getBlackList": {
        "url": "api/user/getBlackList",
        "method": "GET",
        "token": True,
        "name": "拉黑列表",
    },
    "getNotifyList": {
        "url": "api/worker/getNotifyList",
        "method": "POST",
        "token": True,
        "name": "通知列表",
    },
    "nofityDetail": {
        "url": "api/worker/nofityDetails",
        "method": "POST",
        "token": True,
        "name": "通知详情",
    },
    "MyComboController": {
        "url": "api/Internet/MyComboController",
        "method": "get",
        "token": True,
        "name": "我的套餐",
    },
    "bindingShare": {
        "url": "api/Community/bindingShare",
        "method": "POST",
        "token": True,
        "name": "我的认证",
    },
    "bindingShareInfo": {
        "url": "api/Community/bindingShareInfo",
        "method": "POST",
        "token": True,
        "name": "邀请列表",
    },
    "network": {
        "url": "api/Internet/equipment",
        "method": "POST",
        "token": True,
        "name": "设备管理在线",
    },
    "networkBreak": {
        "url": "api/Internet/kick",
        "method": "POST",
        "token": True,
        "name": "踢出设备",
    },
    "networkQuery": {
        "url": "api/Internet/is_login",
        "method": "POST",
        "token": True,
        "name": "查询是否在线",
    },
    "schoolList": {
        "url": "api/user/school_list",
        "method": "POST",
        "token": True,
        "name": "学校列表",
    },
    "certification": {
        "url": "api/certification",
        "method": "POST",
        "token": True,
        "name": "认证身份证",
    },
    "addsite": {
        "url": "api/install/add",
        "method": "POST",
        "token": True,
        "name": "填写有线报装地址",
    },
    "newSpaperList": {
        "url": "api/install/newSpaperList",
        "method": "GET",
        "token": True,
        "name": "有线报装地址列表",
    },
    "newSpaperSchoolList": {
        "url": "api/install/newSpaperSchoolList",
        "method": "GET",
        "token": True,
        "name": "安装人员负责的学校列表",
    },
    "newSpaperEdit": {
        "url": "api/install/edit",
        "method": "POST",
        "token": True,
        "name": "处理报装订单",
    },
    "getThisOrder": {
        "url": "api/conversion/getThisOrder",
        "method": "GET",
        "token": True,
        "name": "查询用户可更换套餐",
    },
    "canConverted": {
        "url": "api/conversion/canConverted",
        "method": "GET",
        "token": True,
        "name": "查询当前套餐可更换套餐",
    },
    "createNewOrder": {
        "url": "api/conversion/createNewOrder",
        "method": "POST",
        "token": True,
        "name": "生成转换套餐订单",
    },
    "sureOrder": {
        "url": "api/conversion/sureOrder",
        "method": "POST",
        "token": True,
        "name": "转换套餐",
    },
    "bindMobile": {
        "url": "api/bindMobile",
        "method": "POST",
        "token": True,
        "name": "更换手机号",
    },
    "loginTrigger": {
        "url": "api/loginTrigger",
        "method": "GET",
        "token": True,
        "name": "查询账号状态",
    },
    "gaogaoIndex": {
        "url": "api/gaogao/index",
        "method": "GET",
        "token": True,
        "name": "查询管理员",
    },
    "income": {
        "url": "api/market/fission/income",
        "method": "POST",
        "token": True,
        "name": "查询佣金",
    },
    "activityIllus": {
        "url": "api/activity_illus",
        "method": "GET",
        "token": True,
        "name": "查询用户当前学校活动",
    },
    "getActivityRulesv": {
        "url": "api/getActivityRulesv",
        "method": "GET",
        "token": True,
        "name": "查询活动规则||活动攻略",
    },
    "checkPayGoods": {
        "url": "api/Internet/checkPayGoods",
        "method": "GET",
        "token": True,
        "name": "提醒用户重复购买套餐",
    },
    "unsetUser": {
        "url": "api/unsetUser",
        "method": "POST",
        "token": True,
        "name": "账户注销",
    },
    "receive": {
        "url": "api/activity/receive",
        "method": "POST",
        "token": True,
        "name": "新老用户领取两小时试用",
    },
    "open": {
        "type": "confession",
        "url": "confession/open",
        "method": "POST",
        "token": True,
        "name": "表白墙是否开通",
    },
    "confessionList": {
        "type": "confession",
        "url": "confession/list",
        "method": "POST",
        "token": True,
        "name": "表白墙列表",
    },
    "publish": {
        "type": "confession",
        "url": "confession/publish",
        "method": "POST",
        "token": True,
        "name": "发布表白墙",
    },
    "confessionLike": {
        "type": "confession",
        "url": "confession/like",
        "method": "POST",
        "token": True,
        "name": "喜欢/取消喜欢",
    },
    "confessionInfo": {
        "type": "confession",
        "url": "confession/info",
        "method": "POST",
        "token": True,
        "name": "表白墙内容详情",
    },
    "confessionComment": {
        "type": "confession",
        "url": "confession/comment",
        "method": "POST",
        "token": True,
        "name": "留言",
    },
    "conLike": {
        "type": "confession",
        "url": "confession/comment/like",
        "method": "POST",
        "token": True,
        "name": "点赞留言",
    },
    "commentList": {
        "type": "confession",
        "url": "confession/comment/list",
        "method": "POST",
        "token": True,
        "name": "留言列表",
    },
    "confessionCollect": {
        "type": "confession",
        "url": "confession/collect",
        "method": "POST",
        "token": True,
        "name": "收藏",
    },
    "collectList": {
        "type": "confession",
        "url": "confession/collect/list",
        "method": "POST",
        "token": True,
        "name": "收藏列表",
    },
    "conDel": {
        "type": "confession",
        "url": "confession/collect/del",
        "method": "POST",
        "token": True,
        "name": "删除收藏",
    },
    "confessionForward": {
        "type": "confession",
        "url": "confession/forward",
        "method": "POST",
        "token": True,
        "name": "转发",
    },
    "confessionDel": {
        "type": "confession",
        "url": "confession/del",
        "method": "POST",
        "token": True,
        "name": "删除我的表白墙",
    },
    "confessionMyself": {
        "type": "confession",
        "url": "confession/myself",
        "method": "POST",
        "token": True,
        "name": "我发布的表白墙",
    },
    "treeopen": {
        "type": "confession",
        "url": "tree_hole/open",
        "method": "POST",
        "token": True,
        "name": "树洞是否开通",
    },
    "tree_holePublish": {
        "type": "confession",
        "url": "tree_hole/publish",
        "method": "POST",
        "token": True,
        "name": "发布树洞",
    },
    "tree_holeList": {
        "type": "confession",
        "url": "tree_hole/list",
        "method": "POST",
        "token": True,
        "name": "树洞列表",
    },
    "tree_holeLike": {
        "type": "confession",
        "url": "tree_hole/like",
        "method": "POST",
        "token": True,
        "name": "树洞喜欢/取消喜欢",
    },
    "tree_holeInfo": {
        "type": "confession",
        "url": "tree_hole/info",
        "method": "POST",
        "token": True,
        "name": "树洞内容详情",
    },
    "tree_holeComment": {
        "type": "confession",
        "url": "tree_hole/comment",
        "method": "POST",
        "token": True,
        "name": "树洞留言",
    },
    "treeLike": {
        "type": "confession",
        "url": "tree_hole/comment/like",
        "method": "POST",
        "token": True,
        "name": "点赞树洞留言",
    },
    "treeList": {
        "type": "confession",
        "url": "tree_hole/comment/list",
        "method": "POST",
        "token": True,
        "name": "树洞留言列表",
    },
    "tree_holeCollect": {
        "type": "confession",
        "url": "tree_hole/collect",
        "method": "POST",
        "token": True,
        "name": "树洞收藏",
    },
    "holeList": {
        "type": "confession",
        "url": "tree_hole/collect/list",
        "method": "POST",
        "token": True,
        "name": "树洞收藏列表",
    },
    "tree_holeDel": {
        "type": "confession",
        "url": "tree_hole/collect/del",
        "method": "POST",
        "token": True,
        "name": "树洞删除收藏",
    },
    "tree_holeForward": {
        "type": "confession",
        "url": "tree_hole/forward",
        "method": "POST",
        "token": True,
        "name": "树洞转发",
    },
    "treeDel": {
        "type": "confession",
        "url": "tree_hole/del",
        "method": "POST",
        "token": True,
        "name": "删除我的树洞",
    },
    "tree_holeMyself": {
        "type": "confession",
        "url": "tree_hole/myself",
        "method": "POST",
        "token": True,
        "name": "我发布的树洞",
    },
    "myselfNums": {
        "type": "confession",
        "url": "myself/nums",
        "method": "POST",
        "token": True,
        "name": "个人中心点赞和动态数量 ",
    },
    "notify": {
        "type": "confession",
        "url": "notify",
        "method": "POST",
        "token": True,
        "name": "点赞/评论 ",
    }
}


def get_host_ip():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.connect(('8.8.8.8', 80))
        return s.getsockname()[0]


def is_keys(request, keys) -> str | None:
    """
    判断字典是否存在某个键值
    :param request:  dict字典
    :param keys:  需判断的键值
    :return: 返回str|None 如果存在，返回str 否则None
    """
    if keys in request:
        return request[keys]
    return None

def ip_md5_32(text):
    """
    将IP加密为32位md5小写并返回加密后结果
    """
    obj_md5 = md5()
    obj_md5.update(text.encode("utf-8"))
    result = obj_md5.hexdigest()
    return result
class App:

    def __init__(self):
        self.debug = False
        self.api = API
        self.token = None
        self.text = None
        self.r = None
        self.code = None
        self.msg = None
        self.result = None
        self.status_code = None
        self.is_json = None
        filedir = os.path.split(os.path.realpath(__file__))[0] + "\\logs\\"
        filename = filedir + \
             time.strftime("%Y-%m-%d", time.localtime()) + ".log"
        if self.debug:
            logging.basicConfig(
                filename=filename,
                filemode="a",
                format='%(asctime)s - %(pathname)s[line:%(lineno)d] - %(levelname)s: %(message)s',
                level=logging.DEBUG
            )
        else:
            logging.basicConfig(
                filename=filename,
                filemode="a",
                format='%(asctime)s - %(pathname)s[line:%(lineno)d] - %(levelname)s: %(message)s',
                level=logging.INFO
            )
        try:
            os.mkdir(filedir)
        except FileExistsError as e:
            logging.debug(e)

    def request(self, name: str, data: dict) -> int:
        logging.debug(f"request: {name} | {data}")
        if name in self.api:
            api = self.api[name]
        else:
            raise ValueError("没有找到该键值")

        headers = {}
        url = self.api['service'] + api['url']

        if type(api['token']) == bool:
            if api['token']:
                if self.token is not None:
                    headers['Authorization'] = "Bearer " + self.token
        else:
            raise TypeError("类型错误")

        self.r = requests.request(
            method=api['method'],
            url=url,
            headers=headers,
            data=data,
        )

        r = self.r

        try:
            self.result = json.loads(r.text)

        except json.JSONDecodeError as e:
            self.is_json = False
            self.result = None
            self.code = None
            self.msg = None
            logging.warning(e)
        else:
            self.is_json = True
            self.code = self.result['code']
            self.msg = self.result['msg']
        finally:
            self.text = r.text
            self.status_code = r.status_code
            logging.debug([self.result, self.code, self.msg, self.text, self.status_code])

        return self.status_code

    def login(self, mobile: str | None, password: str | None) -> int:
        data = {}
        if mobile is not None:
            data["mobile"] = mobile
        if password is not None:
            data["password"] = password
        self.request(
            name="login",
            data=data
        )
        return self.status_code

    def smsSend(self, mobile: str | None, g_type=int | None) -> int:
        """
        :param g_type: 1|登录 2|重置密码 8|注销账号
        """
        data = {}
        if mobile is not None:
            data['mobile'] = mobile
        if g_type is not None:
            data['type'] = g_type
        return self.request(
            name="sendNote",
            data=data
        )

    def smsLogin(self, mobile: str | None, code: str | None) -> int:
        data = {}
        if mobile is not None:
            data['mobile'] = mobile
        if code is not None:
            data['code'] = code
        return self.request(
            name="smsLogin",
            data=data
        )

    def logout(self, token: None | str) -> int:
        if token is not None:
            self.token = token

        return self.request(
            name="logout",
            data={},
        )

    def loginApp(self, ip: None | str, token: None | str) -> int:
        data = {}
        if token is not None:
            self.token = token
        if ip is not None:
            data['ip'] = ip
        return self.request("loginApp", data)

    def editUser(self,
                 password: None | str,
                 sex: None | str,
                 avatar: None | str,
                 nickname: None | str,
                 desc: None | str,
                 token: None | str, ) -> int:
        data = {}
        if token is not None:
            self.token = token
        if password is not None:
            data['password'] = password
            data['pass'] = password
        if sex is not None:
            data['sex'] = sex
        if avatar is not None:
            data['avatar'] = avatar
        if nickname is not None:
            data['nickname'] = nickname
        if desc is not None:
            data['desc'] = desc

        return self.request(name="editUser", data=data)

    def networkQuery(self, ip_32_md5: str | None, token: None | str) -> int:
        data = {}
        if token is not None:
            self.token = token
        if ip_32_md5 is not None:
            data['str'] = ip_32_md5
        
        return self.request("networkQuery", data)
    
    def user(self, unique_number: int | str | None, token: None) -> int:
        data = {}
        if token is not None:
            self.token = token
        if unique_number is not None:
            data['unique_number'] = unique_number
        
        return self.request("user", data)


if __name__ == "__main__":
    gg = App()
    gg.logout(None)
    pass
