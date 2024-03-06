from app import *
from routes.admin import *

from flask_login import current_user, login_required

@app.route("/", methods=["GET"])
@app.route("/login", methods=["GET"])
def index():

	if current_user.is_authenticated:
		return redirect(url_for("application"))
	return render_template("index.html")

@app.route("/register", methods=["GET"])
def register():

	uid = request.args["uid"]
	return render_template("register.html", uid=uid)

@app.route("/password", methods=["GET"])
def unlock():

	uid = request.args["uid"]
	return render_template("password.html", uid=uid)

@app.route("/app", methods=["GET"])
@login_required
def application():

	return render_template("app.html")

@app.route("/prizes", methods=["GET"])
@login_required
def prizes():

	return render_template("prizes.html")

@app.route("/schedule", methods=["GET"])
@login_required
def schedule():

	return render_template("schedule.html")

@app.route("/punches", methods=["GET"])
@login_required
def punches():

	return render_template("punches.html")

@app.route("/profile", methods=["GET"])
@login_required
def profile():

	return render_template("profile.html",
		name=current_user.name,
		surname=current_user.surname,
		school=current_user.school,
		email=current_user.email,
		phone=current_user.phone,
		major=current_user.major,
	)

#@app.route("/asset-pack", methods=["GET"])
#def asset_pack():
#
#	return render_template("asset-pack.html")
#
