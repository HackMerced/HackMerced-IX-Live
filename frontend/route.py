from app import *

#from flask_login import current_user, login_required

@app.route("/", methods=["GET"])
@app.route("/login", methods=["GET"])
def index():

#	if current_user.is_authenticated:
#		return redirect(url_for("application"))
	return render_template("index.html")

@app.route("/register", methods=["GET"])
def register():

	return render_template("register.html")

@app.route("/password", methods=["GET"])
def login2():

	return render_template("password.html")

@app.route("/app", methods=["GET"])
#@login_required
def application():

	return render_template("app.html")

@app.route("/prizes", methods=["GET"])
def prizes():

	return render_template("prizes.html")

@app.route("/punches", methods=["GET"])
def punches():

	return render_template("punches.html")

