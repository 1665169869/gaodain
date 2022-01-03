import logging
from flask import Flask, render_template, redirect
app = Flask(__name__, static_url_path='')


@app.route('/')
def index():
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
    return redirect('/login/', 302)


@app.route('/login/')
def login_():
    return redirect('/login/password', 302)


@app.route('/login/password')
def login_password():
    return render_template('login/password.html')


@app.route('/login/send')
def login_send():
    return render_template('login/send.html')


@app.errorhandler(404)
def page_not_found(error=None):
    logging.info(error)
    return redirect('/login', 302)


@app.route('/api/send')
def apiSendNote():
    pass


@app.route('/api/login')
def apiLogin():
    pass


@app.route('/api/smsLogin')
def apiSmsLogin():
    pass


@app.route('/api/editUser')
def apiEditUser():
    pass


if __name__ == '__main__':
    app.run()
