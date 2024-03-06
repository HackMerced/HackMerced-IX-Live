import bcrypt
import time

from app import *

from flask_login import LoginManager, login_required, login_user, logout_user, current_user

loginManager = LoginManager()
loginManager.init_app(app)
loginManager.login_view = "login"

@loginManager.user_loader
def load_user(id: int):
	return Account.query.get(id)

@app.route("/login", methods=["POST"])
def login():

	user = Account.get_user(request.form["uid"])

	if user == False:
		time.sleep(1)  # Prevent brute.
		return render_template("index.html", failed=True)

	if user.password == None:
		return redirect(url_for(f"register", uid=request.form["uid"]))
	else:
		return redirect(url_for(f"unlock", uid=request.form["uid"]))

@app.route("/register", methods=["POST"])
def register_account():

	user = Account.get_user(request.form["uid"])

	if user == False:
		time.sleep(1)  # Prevent brute.
		return render_template("index.html", failed=True)

	# Prevent claiming an already claimed account.
	if user.password != None:
		return render_template("index.html", failed=True)

	# Make sure their password matched.
	if request.form["password"] != request.form["confirm"]:
		return render_template("index.html", passwordFailed=True)

	# Claim the account.
	if not user.claim(
		request.form["password"],
		request.form["name"],
		request.form["surname"],
		request.form["email"],
		request.form["phone"],
		request.form["school"],
		request.form["major"]
	):
		return render_template("index.html", failed=True)

	return render_template("index.html", success=True)

@app.route("/unlock", methods=["POST"])
def unlock_account():

	user = Account.login_by_uid(request.form["uid"], request.form["password"])

	if user == False:
		time.sleep(1)  # Prevent brute.
		return render_template("index.html", failed=True)

	login_user(user)
	return redirect(url_for("application"))

@app.route("/admin/login", methods=["POST"])
def login_admin():

	# Password based login.
	user = Account.login(request.form["username"], request.form["password"])

	if user == False:
		time.sleep(1)  # Prevent brute.
		return render_template("admin/login.html", failed=True)

	login_user(user)
	return redirect(url_for("admin"))

@app.route("/admin/password/change", methods=["POST"])
@login_required
def admin_password_change_api():

	try:
		assert bcrypt.checkpw(request.form["password-current"].encode(), current_user.password)
		assert request.form["password-new"] == request.form["password-confirm"]
	except:
		return render_template("admin/password/change.html", failed=True)

	current_user.password = bcrypt.hashpw(request.form["password-new"].encode(), bcrypt.gensalt(4))
	db.session.commit()

	return redirect(url_for("admin"))

@app.route("/logout", methods=["GET"])
@login_required
def logout():

	if current_user.type == 1:
		logout_user()
		return render_template("admin/login.html")
	else:
		logout_user()
		return render_template("index.html")

