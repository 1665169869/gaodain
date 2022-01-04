import logging

from flask import Flask, render_template, redirect, request, url_for

from API import App, is_keys

app = Flask(__name__)
gao = App()


#  测试路由


@app.route('/test/password')
def test_password():
    # return redirect(url_for("login"), 302)
    return render_template('/test/password.html')


#  页面路由


@app.route('/')
def index():
    print(request.authorization)
    return render_template('index.html')


@app.route('/user')
def user():
    return render_template('user.html')


@app.route('/online')
def online():
    return render_template('online.html')


@app.route('/passwd')
def passwd():
    return render_template('passwd.html')


@app.route('/login')
def login():
    # return redirect(url_for("login"), 302)
    # return redirect('/login/', 302)
    return redirect('/login/password', 302)


@app.route('/login/')
def login_():
    return redirect(url_for("login"), 302)


@app.route('/login/password')
def login_password():
    return render_template('login/password.html')


@app.route('/login/send')
def login_send():
    return render_template('login/send.html')


@app.errorhandler(404)
def page_not_found(error=None):
    logging.info(error)
    # return render_template_string(str(error))
    return render_template('404.html'), 404


# 到这结束

# API接口路由


#  获取验证码 1|登录 2|重置密码 8|注销账号
@app.route('/api/send', methods=['POST'])
def api_send_note():
    mobile = None
    g_type = None
    if 'mobile' in request.form:
        mobile = request.form['mobile']
    if 'type' in request.form:
        g_type = request.form['type']
    gao.smsSend(mobile, g_type)
    return gao.text


#  密码登录
@app.route('/api/login', methods=["POST"])
def api_login():
    mobile = None
    password = None
    if 'mobile' in request.form:
        mobile = request.form['mobile']
    if 'password' in request.form:
        password = request.form['password']
    gao.login(mobile=mobile, password=password)
    return gao.text


#  验证码登录
@app.route('/api/smsLogin', methods=["POST"])
def api_sms_login():
    mobile = None
    if 'mobile' in request.form:
        mobile = request.form['mobile']
    code = None
    if 'code' in request.form:
        code = request.form['code']
    gao.smsLogin(mobile, code)
    return gao.text


#  退出登录
@app.route('/api/logout', methods=['POST'])
def api_logout():
    token = None
    if 'token' in request.form:
        token = request.form['token']
    gao.logout(token)
    return gao.text


#  修改用户信息
@app.route('/api/editUser', methods=['POST'])
def api_edit_user():
    password = None
    sex = None
    avatar = None
    nickname = None
    desc = None
    token = None
    if 'password' in request.form:
        password = request.form['password']
    if 'sex' in request.form:
        sex = request.form['sex']
    if 'avatar' in request.form:
        avatar = request.form['sex']
    if 'nickname' in request.form:
        nickname = request.form['nickname']
    if 'desc' in request.form:
        desc = request.form['desc']
    if 'token' in request.form:
        token = request.form['token']
    gao.editUser(
        password,
        sex,
        avatar,
        nickname,
        desc,
        token,
    )
    return gao.text


#  手机网络认证
@app.route('/api/loginApp', methods=['POST'])
def api_login_app():
    token = is_keys(request.form, "token")
    ip = is_keys(request.form, "ip")
    gao.loginApp(ip, token)
    return gao.text


#  到这结束


if __name__ == '__main__':
    app.run()
