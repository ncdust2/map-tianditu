#!/usr/bin/python
# -*- coding:utf-8 -*-

#author:ncdust2
#email:87658356@qq.com 

from flask import Flask
import os, re
import pandas as pd
app = Flask(__name__)
from flask_cors import CORS
CORS(app,  supports_credentials=True)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/wel')
def welcome():
    return 'welcome' 

@app.route('/markers')
def markers():
    df = []
    for root, ds, fs in os.walk('./markers'):
        for f in fs:
            fullname = os.path.join(root, f)
            if f.split('.')[-1] in ('xlsx', 'xls'):
                df.append(pd.read_excel(fullname))
            elif f.split('.')[-1] in ('csv'):
                df.append(pd.read_csv(fullname))
                 
    df = pd.concat(df)
#    return repr(df)
    return df.to_json(orient='records' , force_ascii=False)

@app.route('/<path:fallback>')
def fallback(fallback):       # Vue Router 的 mode 为 'hash' 时可移除该方法
    if fallback.startswith('css/') or fallback.startswith('js/')\
            or fallback.startswith('img/') or fallback.startswith('apk') or fallback == 'favicon.ico':
        return app.send_static_file( fallback)
    else:
        return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host = '0.0.0.0', debug = True, port = '5000')

