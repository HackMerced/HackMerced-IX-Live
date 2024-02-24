from flask import Flask, render_template

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def index():
    return render_template('schedule.html')  

@app.route('/template')
def home():
    return render_template('template.html')

if __name__ == '__main__':
    app.run()
