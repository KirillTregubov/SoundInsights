from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
  return '<a href="/hello">to hello</a><div>Index route (edit me to see changes upon reload)</div>'

@app.route('/hello')
def hello():
    return '<a href="/">to index</a><div>Hello route</div>'

# if __name__ == '__main__':
  # app.run(host = '0.0.0.0', port = 5000, debug=True)