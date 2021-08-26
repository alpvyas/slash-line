from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Profile, Team

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/validate-username', methods=['POST'])
def validate_username():
    data = request.json

    username = User.query.filter_by(
        username=data["username"]).scalar()

    if username is not None:
        return jsonify(0)
    else:
        return jsonify(1)


@user_routes.route('/validate-email', methods=['POST'])
def validate_email():
    data = request.json

    email = User.query.filter_by(
        email=data["email"]).scalar()

    if email is not None:
        return jsonify(0)
    else:
        return jsonify(1)


@user_routes.route('/profile/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is not None:
        return jsonify({"user": user.to_dict(), "errors": ""})

    return jsonify(
        {
            "errors": "An unexpected error occurred. Please try again."
        })


@user_routes.route('/setup', methods=['POST'])
def user_setup():
    data = request.json

    profile = Profile(bio=data["bio"],
                      loaction=data["location"],
                      avatar=data["data"],
                      user_id=data["user"])

    db.session.add(profile)
    db.session.commit()
    
    team = Team(name=data["teamName"],
                colors=data["colors"],
                user_id=data["userID"],
                league_id=data["leagueID"])

    db.session.add(team)
    db.session.commit()

    return jsonify(profile.to_dict())
