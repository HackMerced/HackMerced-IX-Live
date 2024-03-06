from app import *

import bcrypt

@app.route("/api/user/create", methods=["POST"])
@login_required
def api_user_create():

	# Admin only.
	if current_user.type != 1:
		return {"Response": "401 Unauthorized"}, 401

	try:
		uid = int(request.form["uid"], 16)
		user = Account(uid=uid)
		db.session.add(user)
		db.session.commit()
		return {"Response": "200 OK"}, 200
	except:
		return {"Response": "400 Bad Request"}, 400

@app.route("/api/user/list", methods=["GET"])
@login_required
def api_user_list():

	# Admin only.
	if current_user.type != 1:
		return {"Response": "401 Unauthorized"}, 401

	try:
		users = Account.query.filter_by(type=0).all()
		response = [
			{
				"id": u.id,
				"uid": hex(u.uid)[2:].zfill(8),
				"name": f"{u.name} {u.surname}",
				"email": u.email,
				"phone": u.phone,
				"school": u.school,
				"major": u.major,
				"points": u.update_points()
			}
			for u in users
		]
		return {"Response": "200 OK", "Users": response}, 200
	except:
		return {"Response": "500 Internal Server Error"}, 500

@app.route("/api/user/delete/<id>", methods=["POST"])
@login_required
def api_user_delete(id):

	# Admin only.
	if current_user.type != 1:
		return {"Response": "401 Unauthorized"}, 401

	try:
		account = Account.query.filter_by(id=int(id)).delete()
		db.session.commit()
		return {"Response": "200 OK"}, 200
	except:
		return {"Response": "500 Internal Server Error"}, 500

@app.route("/api/user/edit/profile", methods=["POST"])
@login_required
def api_user_edit_profile():

	try:
		current_user.name     = request.form["name"]
		current_user.surname  = request.form["surname"]
		current_user.email    = request.form["email"]
		current_user.phone    = request.form["phone"]
		current_user.school   = request.form["school"]
		current_user.major    = request.form["major"]
		db.session.commit()
		return {"Response": "200 OK"}, 200
	except:
		return {"Response": "500 Internal Server Error"}, 500

@app.route("/api/user/edit/password", methods=["POST"])
@login_required
def api_user_edit_password():

	try:
		assert bcrypt.checkpw(request.form["oldPass"].encode(), current_user.password)
		assert request.form["password"] == request.form["confirm"]
		current_user.password = bcrypt.hashpw(request.form["password"].encode(), bcrypt.gensalt(4))
		db.session.commit()
		return {"Response": "200 OK"}, 200
	except:
		return {"Response": "500 Internal Server Error"}, 500

@app.route("/api/user/info", methods=["GET"])
@login_required
def api_user_info():

	try:

		current_user.update_points()
		stamps = [{"name": s.name, "slots": s.slots, "punches": s.punches(current_user.id)}
			for s in Stamp.query.all()]
		rewards = [{"id": r.id, "reward": r.reward, "text": r.text, "value": r.value, "stock": r.remaining(),
			"total": r.stock, "status": r.status(current_user.id)} for r in Reward.query.all()]

		breakdown = []

		for a in Attendance.query.filter_by(user=current_user.id).all():
			e = Event.query.filter_by(id=a.event).first()
			breakdown.append(f"+{e.points} Attended \"{e.title}\"")

		for c in Submit.query.filter_by(user=current_user.id).all():
			c = Code.query.filter_by(id=c.code).first()
			breakdown.append(f"+{c.value} Submitted code \"{c.note}\"")

		for r in Redemption.query.filter_by(user=current_user.id).all():
			rw = Reward.query.filter_by(id=r.reward).first()
			breakdown.append(f"-{rw.value} Redeemed reward \"{rw.reward}\"")

		return {
			"Response": "200 OK",
			"User": {
				"uid": f"{current_user.uid: 08X}",
				"name": current_user.name,
				"email": current_user.email,
				"points": current_user.points,
				"stamps": stamps,
				"rewards": rewards,
				"breakdown": breakdown[::-1],
			}
		}, 200
	except:
		return {"Response": "500 Internal Server Error"}, 500

@app.route("/api/user/locator/create", methods=["POST"])
@login_required
def api_user_locator_create():

	# Admin only.
	if current_user.type != 1:
		return {"Response": "401 Unauthorized"}, 401

	try:
		uid = int(request.form["uid"], 16)
		user = Account(uid=uid, type=2)
		db.session.add(user)
		db.session.commit()
		return {"Response": "200 OK"}, 200
	except:
		return {"Response": "400 Bad Request"}, 400

@app.route("/api/user/locator/list", methods=["GET"])
@login_required
def api_user_locator_list():

	# Admin only.
	if current_user.type != 1:
		return {"Response": "401 Unauthorized"}, 401

	try:
		users = Account.query.filter_by(type=2).all()
		response = [{"id": u.id, "uid": hex(u.uid)[2:].zfill(8)} for u in users]
		return {"Response": "200 OK", "Users": response}, 200
	except:
		return {"Response": "500 Internal Server Error"}, 500

