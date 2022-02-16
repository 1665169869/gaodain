// 定义全局端口变量
const HOST = "127.0.0.1";
const PORT = 5000;

const API = {
                service: "https://v3.yungao-tech.com/",
                confessionService: "http://106.55.190.205:8099/",
                websocketservice: "https://admin.v3.yungao-tech.com/",
                socketService: "106.55.190.205:8099/notification",
                shareUrl: "https://apply.yungao-tech.cn/",
                picUrl: "api/uploadImgages",
                sendNote: {
                    url: "api/send",
                    method: "POST",
                    token: !1,
                    name: "获取验证码",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "发送中…"
                    }
                },
                smsLogin: {
                    url: "api/smsLogin",
                    method: "POST",
                    token: !1,
                    name: "验证码登录",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "登录中…"
                    }
                },
                login: {
                    url: "api/login",
                    method: "POST",
                    token: !1,
                    name: "密码登录",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "登录中…"
                    }
                },
                editUser: {
                    url: "api/editUser",
                    method: "POST",
                    token: !0,
                    name: "更新用户信息",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                retrieve: {
                    url: "api/retrieve",
                    method: "POST",
                    token: !1,
                    name: "修改密码",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                logout: {
                    url: "api/logout",
                    method: "POST",
                    token: !0,
                    name: "退出登录",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "退出中…"
                    }
                },
                indexApi: {
                    url: "api/indexApi",
                    method: "GET",
                    token: !0,
                    name: "首页信息",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "退出中…"
                    }
                },
                subQuestion: {
                    url: "api/subQuestion",
                    method: "POST",
                    token: !1,
                    name: "报告问题||问题反馈",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                goods: {
                    url: "api/Internet/goods",
                    method: "GET",
                    token: !0,
                    name: "套餐列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                create: {
                    url: "api/Internet/create",
                    method: "POST",
                    token: !0,
                    name: "生成订单",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                info: {
                    url: "api/Internet/info",
                    method: "GET",
                    token: !0,
                    name: "订单详情",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                cancel: {
                    url: "api/Internet/cancel",
                    method: "POST",
                    token: !0,
                    name: "退款||取消订单",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                cancelRefund: {
                    url: "api/Internet/cancelRefund",
                    method: "POST",
                    token: !0,
                    name: "取消退款申请",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "取消中…"
                    }
                },
                getList: {
                    url: "api/getList",
                    method: "GET",
                    token: !0,
                    name: "订单列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                loginApp: {
                    url: "api/Internet/loginApp",
                    method: "POST",
                    token: !0,
                    name: "手机网络认证",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "认证中…"
                    }
                },
                loginQrCode: {
                    url: "api/Internet/loginQrCode",
                    method: "POST",
                    token: !0,
                    name: "电脑网络认证",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "认证中…"
                    }
                },
                troubleshooting: {
                    url: "api/Internet/troubleshooting",
                    method: "POST",
                    token: !0,
                    name: "手机网络认证",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                ReleaseArticle: {
                    type: "socket",
                    url: "api/Community/ReleaseArticle",
                    method: "POST",
                    token: !0,
                    name: "发布动态",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "发布中…"
                    }
                },
                follow: {
                    url: "api/Community/follow",
                    method: "POST",
                    token: !0,
                    name: "关注的动态||首页动态",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                find: {
                    url: "api/Community/find",
                    method: "POST",
                    token: !0,
                    name: "发现动态",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                searchfind: {
                    url: "api/Community/find",
                    method: "POST",
                    token: !0,
                    name: "搜索动态",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                user: {
                    url: "api/Community/user",
                    method: "POST",
                    token: !0,
                    name: "个人信息",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                dynamic: {
                    url: "api/Community/dynamic",
                    method: "POST",
                    token: !0,
                    name: "个人资料动态",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                operation: {
                    type: "socket",
                    url: "api/Community/operation",
                    method: "POST",
                    token: !0,
                    name: "关注他人||添加好友",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "关注中…"
                    }
                },
                fans: {
                    url: "api/Community/fans",
                    method: "POST",
                    token: !0,
                    name: "关注列表||粉丝列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                like: {
                    type: "socket",
                    url: "api/Community/like",
                    method: "POST",
                    token: !0,
                    name: "点赞动态||收藏动态",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                footprintList: {
                    url: "api/user/footprintList",
                    method: "GET",
                    token: !0,
                    name: "足迹",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                content: {
                    url: "api/Community/content",
                    method: "POST",
                    token: !0,
                    name: "动态详情",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                wordTopic: {
                    url: "api/Community/wordTopic",
                    method: "POST",
                    token: !0,
                    name: "热门话题",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                comment: {
                    url: "api/Community/comment",
                    method: "POST",
                    token: !0,
                    name: "评论列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                getFavoritesList: {
                    url: "api/user/getFavoritesList",
                    method: "GET",
                    token: !0,
                    name: "收藏列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                report: {
                    url: "api/report",
                    method: "POST",
                    token: !0,
                    name: "举报",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "举报中…"
                    }
                },
                pullBlack: {
                    url: "api/user/pullBlack",
                    method: "POST",
                    token: !0,
                    name: "拉黑用户",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "拉黑中…"
                    }
                },
                delDy: {
                    url: "api/Community/delDy",
                    method: "POST",
                    token: !0,
                    name: "删除动态",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "删除中…"
                    }
                },
                likeComment: {
                    url: "api/likeComment",
                    method: "POST",
                    token: !0,
                    name: "点赞评论",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                ReleaseComment: {
                    type: "socket",
                    url: "api/Community/ReleaseComment",
                    method: "POST",
                    token: !0,
                    name: "评论",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "评论中…"
                    }
                },
                delComment: {
                    url: "api/Community/delComment",
                    method: "POST",
                    token: !0,
                    name: "删除评论",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "删除中…"
                    }
                },
                examinedList: {
                    url: "api/Friend/examinedList",
                    method: "POST",
                    token: !0,
                    name: "好友申请列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                Friendstatu: {
                    url: "api/Friend/status",
                    method: "POST",
                    token: !0,
                    name: "好友申请通过||拒绝",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                Friendlist: {
                    url: "api/Friend/list",
                    method: "POST",
                    token: !0,
                    name: "好友列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                Grouplist: {
                    url: "api/Group/list",
                    method: "POST",
                    token: !0,
                    name: "群聊列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                Friendsearch: {
                    url: "api/Friend/search",
                    method: "POST",
                    token: !0,
                    name: "搜索添加好友列表",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                establish: {
                    url: "api/Group/establish",
                    method: "POST",
                    token: !0,
                    name: "新建群聊",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "建群中…"
                    }
                },
                remarks: {
                    url: "api/Friend/remarks",
                    method: "POST",
                    token: !0,
                    name: "修改好友备注",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "修改中…"
                    }
                },
                judge: {
                    url: "api/Friend/judge",
                    method: "POST",
                    token: !0,
                    name: "查询好友详细信息",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                block: {
                    url: "api/Friend/block",
                    method: "POST",
                    token: !0,
                    name: "拉黑好友",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                delete: {
                    url: "api/Friend/delete",
                    method: "POST",
                    token: !0,
                    name: "删除好友",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "删除中…"
                    }
                },
                detailed: {
                    url: "api/Group/detailed",
                    method: "POST",
                    token: !0,
                    name: "群聊信息",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                headSculpture: {
                    url: "api/Group/headSculpture",
                    method: "POST",
                    token: !0,
                    name: "修改群头像",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                notice: {
                    url: "api/Group/notice",
                    method: "POST",
                    token: !0,
                    name: "修改群公告",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                flocknickname: {
                    url: "api/Group/nickname",
                    method: "POST",
                    token: !0,
                    name: "修改群名",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                flockremarks: {
                    url: "api/Group/remarks",
                    method: "POST",
                    token: !0,
                    name: "修改群昵称",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                Grouptop: {
                    url: "api/Group/top",
                    method: "POST",
                    token: !0,
                    name: "群置顶",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                doNotDisturb: {
                    url: "api/Group/doNotDisturb",
                    method: "POST",
                    token: !0,
                    name: "群消息免打扰",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                listUser: {
                    url: "api/Group/listUser",
                    method: "POST",
                    token: !0,
                    name: "群成员列表||群聊我的好友列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                personnel: {
                    url: "api/Group/personnel",
                    method: "POST",
                    token: !0,
                    name: "添加群成员||删除群成员",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                quit: {
                    url: "api/Group/quit",
                    method: "POST",
                    token: !0,
                    name: "退出群聊||解散群聊",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "退出中…"
                    }
                },
                bindUid: {
                    type: "socket",
                    url: "api/worker/bindUid",
                    method: "POST",
                    token: !0,
                    name: "用户绑定",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "绑定中…"
                    }
                },
                userSend: {
                    type: "socket",
                    url: "api/worker/send",
                    method: "POST",
                    token: !0,
                    name: "发送消息",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "发送中…"
                    }
                },
                getChatRecordList: {
                    url: "api/worker/getChatRecordList",
                    method: "GET",
                    token: !0,
                    name: "onebattleone聊天记录",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                saveAskMsg: {
                    url: "api/worker/saveAskMsg",
                    method: "POST",
                    token: !0,
                    name: "记录最后一条信息",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                bindGroup: {
                    type: "socket",
                    url: "api/worker/bindGroup",
                    method: "POST",
                    token: !0,
                    name: "加入群聊(绑定)",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                getChatRecordGroup: {
                    url: "api/worker/getChatRecordGroup",
                    method: "GET",
                    token: !0,
                    name: "onebattlemore聊天记录",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                getChatList: {
                    type: "socket",
                    url: "api/worker/getChatList",
                    method: "GET",
                    token: !0,
                    name: "聊天列表",
                    showLoading: {
                        show: !1,
                        mask: !1,
                        title: "加载中…"
                    }
                },
                fabulous: {
                    url: "api/worker/fabulous",
                    method: "POST",
                    token: !0,
                    name: "赞我的列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                reply: {
                    url: "api/worker/reply",
                    method: "POST",
                    token: !0,
                    name: "评论我的列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                aiteme: {
                    url: "api/worker/comment",
                    method: "POST",
                    token: !0,
                    name: "艾特我的列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                workerInfo: {
                    url: "api/worker/workerInfo",
                    method: "GET",
                    token: !0,
                    name: "消息页金刚区",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                versionUp: {
                    url: "api/versionUp",
                    method: "GET",
                    token: !0,
                    name: "版本更新",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                getBlackList: {
                    url: "api/user/getBlackList",
                    method: "GET",
                    token: !0,
                    name: "拉黑列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                getNotifyList: {
                    url: "api/worker/getNotifyList",
                    method: "POST",
                    token: !0,
                    name: "通知列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                nofityDetail: {
                    url: "api/worker/nofityDetails",
                    method: "POST",
                    token: !0,
                    name: "通知详情",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                MyComboController: {
                    url: "api/Internet/MyComboController",
                    method: "get",
                    token: !0,
                    name: "我的套餐",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                bindingShare: {
                    url: "api/Community/bindingShare",
                    method: "POST",
                    token: !0,
                    name: "我的认证",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                bindingShareInfo: {
                    url: "api/Community/bindingShareInfo",
                    method: "POST",
                    token: !0,
                    name: "邀请列表",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                network: {
                    url: "api/Internet/equipment",
                    method: "POST",
                    token: !0,
                    name: "设备管理在线",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                networkBreak: {
                    url: "api/Internet/kick",
                    method: "POST",
                    token: !0,
                    name: "踢出设备",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                networkQuery: {
                    url: "api/Internet/is_login",
                    method: "POST",
                    token: !0,
                    name: "查询是否在线",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                schoolList: {
                    url: "api/user/school_list",
                    method: "POST",
                    token: !0,
                    name: "学校列表",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                certification: {
                    url: "api/certification",
                    method: "POST",
                    token: !0,
                    name: "认证身份证",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "认证中…"
                    }
                },
                addsite: {
                    url: "api/install/add",
                    method: "POST",
                    token: !0,
                    name: "填写有线报装地址",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "提交中…"
                    }
                },
                newSpaperList: {
                    url: "api/install/newSpaperList",
                    method: "GET",
                    token: !0,
                    name: "有线报装地址列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                newSpaperSchoolList: {
                    url: "api/install/newSpaperSchoolList",
                    method: "GET",
                    token: !0,
                    name: "安装人员负责的学校列表",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                newSpaperEdit: {
                    url: "api/install/edit",
                    method: "POST",
                    token: !0,
                    name: "处理报装订单",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                getThisOrder: {
                    url: "api/conversion/getThisOrder",
                    method: "GET",
                    token: !0,
                    name: "查询用户可更换套餐",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                canConverted: {
                    url: "api/conversion/canConverted",
                    method: "GET",
                    token: !0,
                    name: "查询当前套餐可更换套餐",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                createNewOrder: {
                    url: "api/conversion/createNewOrder",
                    method: "POST",
                    token: !0,
                    name: "生成转换套餐订单",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                sureOrder: {
                    url: "api/conversion/sureOrder",
                    method: "POST",
                    token: !0,
                    name: "转换套餐",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                bindMobile: {
                    url: "api/bindMobile",
                    method: "POST",
                    token: !0,
                    name: "更换手机号",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "操作中…"
                    }
                },
                loginTrigger: {
                    url: "api/loginTrigger",
                    method: "GET",
                    token: !0,
                    name: "查询账号状态",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "操作中…"
                    }
                },
                gaogaoIndex: {
                    url: "api/gaogao/index",
                    method: "GET",
                    token: !0,
                    name: "查询管理员",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "操作中…"
                    }
                },
                income: {
                    url: "api/market/fission/income",
                    method: "POST",
                    token: !0,
                    name: "查询佣金",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "操作中…"
                    }
                },
                activityIllus: {
                    url: "api/activity_illus",
                    method: "GET",
                    token: !0,
                    name: "查询用户当前学校活动",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "操作中…"
                    }
                },
                getActivityRulesv: {
                    url: "api/getActivityRulesv",
                    method: "GET",
                    token: !0,
                    name: "查询活动规则||活动攻略",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                checkPayGoods: {
                    url: "api/Internet/checkPayGoods",
                    method: "GET",
                    token: !0,
                    name: "提醒用户重复购买套餐",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                unsetUser: {
                    url: "api/unsetUser",
                    method: "POST",
                    token: !0,
                    name: "账户注销",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                receive: {
                    url: "api/activity/receive",
                    method: "POST",
                    token: !0,
                    name: "新老用户领取两小时试用",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "领取中…"
                    }
                },
                open: {
                    type: "confession",
                    url: "confession/open",
                    method: "POST",
                    token: !0,
                    name: "表白墙是否开通",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                confessionList: {
                    type: "confession",
                    url: "confession/list",
                    method: "POST",
                    token: !0,
                    name: "表白墙列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                publish: {
                    type: "confession",
                    url: "confession/publish",
                    method: "POST",
                    token: !0,
                    name: "发布表白墙",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                confessionLike: {
                    type: "confession",
                    url: "confession/like",
                    method: "POST",
                    token: !0,
                    name: "喜欢/取消喜欢",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                confessionInfo: {
                    type: "confession",
                    url: "confession/info",
                    method: "POST",
                    token: !0,
                    name: "表白墙内容详情",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                confessionComment: {
                    type: "confession",
                    url: "confession/comment",
                    method: "POST",
                    token: !0,
                    name: "留言",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                conLike: {
                    type: "confession",
                    url: "confession/comment/like",
                    method: "POST",
                    token: !0,
                    name: "点赞留言",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                commentList: {
                    type: "confession",
                    url: "confession/comment/list",
                    method: "POST",
                    token: !0,
                    name: "留言列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                confessionCollect: {
                    type: "confession",
                    url: "confession/collect",
                    method: "POST",
                    token: !0,
                    name: "收藏",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                collectList: {
                    type: "confession",
                    url: "confession/collect/list",
                    method: "POST",
                    token: !0,
                    name: "收藏列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                conDel: {
                    type: "confession",
                    url: "confession/collect/del",
                    method: "POST",
                    token: !0,
                    name: "删除收藏",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                confessionForward: {
                    type: "confession",
                    url: "confession/forward",
                    method: "POST",
                    token: !0,
                    name: "转发",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                confessionDel: {
                    type: "confession",
                    url: "confession/del",
                    method: "POST",
                    token: !0,
                    name: "删除我的表白墙",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                confessionMyself: {
                    type: "confession",
                    url: "confession/myself",
                    method: "POST",
                    token: !0,
                    name: "我发布的表白墙",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                treeopen: {
                    type: "confession",
                    url: "tree_hole/open",
                    method: "POST",
                    token: !0,
                    name: "树洞是否开通",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                tree_holePublish: {
                    type: "confession",
                    url: "tree_hole/publish",
                    method: "POST",
                    token: !0,
                    name: "发布树洞",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                tree_holeList: {
                    type: "confession",
                    url: "tree_hole/list",
                    method: "POST",
                    token: !0,
                    name: "树洞列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                tree_holeLike: {
                    type: "confession",
                    url: "tree_hole/like",
                    method: "POST",
                    token: !0,
                    name: "树洞喜欢/取消喜欢",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                tree_holeInfo: {
                    type: "confession",
                    url: "tree_hole/info",
                    method: "POST",
                    token: !0,
                    name: "树洞内容详情",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                tree_holeComment: {
                    type: "confession",
                    url: "tree_hole/comment",
                    method: "POST",
                    token: !0,
                    name: "树洞留言",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                treeLike: {
                    type: "confession",
                    url: "tree_hole/comment/like",
                    method: "POST",
                    token: !0,
                    name: "点赞树洞留言",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                treeList: {
                    type: "confession",
                    url: "tree_hole/comment/list",
                    method: "POST",
                    token: !0,
                    name: "树洞留言列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                tree_holeCollect: {
                    type: "confession",
                    url: "tree_hole/collect",
                    method: "POST",
                    token: !0,
                    name: "树洞收藏",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                holeList: {
                    type: "confession",
                    url: "tree_hole/collect/list",
                    method: "POST",
                    token: !0,
                    name: "树洞收藏列表",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                tree_holeDel: {
                    type: "confession",
                    url: "tree_hole/collect/del",
                    method: "POST",
                    token: !0,
                    name: "树洞删除收藏",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                tree_holeForward: {
                    type: "confession",
                    url: "tree_hole/forward",
                    method: "POST",
                    token: !0,
                    name: "树洞转发",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                treeDel: {
                    type: "confession",
                    url: "tree_hole/del",
                    method: "POST",
                    token: !0,
                    name: "删除我的树洞",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                tree_holeMyself: {
                    type: "confession",
                    url: "tree_hole/myself",
                    method: "POST",
                    token: !0,
                    name: "我发布的树洞",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                myselfNums: {
                    type: "confession",
                    url: "myself/nums",
                    method: "POST",
                    token: !0,
                    name: "个人中心点赞和动态数量 ",
                    showLoading: {
                        show: !1,
                        mask: !0,
                        title: "加载中…"
                    }
                },
                notify: {
                    type: "confession",
                    url: "notify",
                    method: "POST",
                    token: !0,
                    name: "点赞/评论 ",
                    showLoading: {
                        show: !0,
                        mask: !0,
                        title: "加载中…"
                    }
                }
}
