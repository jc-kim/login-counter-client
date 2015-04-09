import flask

app = flask.Flask(__name__)
app.config['API_ROOT'] = 'http://swpp1.thejc.kr'


@app.route('/')
def index():
    return flask.render_template('index.html')


if __name__ == '__main__':
    app.run(debug=False, host='localhost', port=5000)
