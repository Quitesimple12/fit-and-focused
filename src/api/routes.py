from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favourite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def signup():
    request_body = request.get_json(force=True)

    required_fields = ["email", "password"]
    for field in required_fields:
        if field not in request_body or not request_body[field]:
            raise APIException(f'the "{field}" field cannot be empty', 400)
        
    verify_email = User.query.filter_by(email=request_body["email"]).first()
    if verify_email:
        raise APIException("An account with this email already exists", 400)
    
    user = User(email=request_body["email"], password=request_body["password"], is_active=True)

    db.session.add(user)

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)
    
    response_body = {
        "msg": "Successfully created user",
        "user": user.serialize()
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json(force=True)
    email = request_body["email"]
    password = request_body["password"]

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify("Incorrect Credentials"), 401

    access_token = create_access_token(identity=user.id)
    print(access_token)

    response_body = {
        "msg": "logged in",
        "user": user.serialize(),
        "token": access_token
    }
    print(response_body)
    return jsonify(response_body), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).first()

    if not user:
        return jsonify(success=False, message="User doesn't exist"), 404
    
    response_body = {
        "logged_in_as": current_user,
        "user": user.serialize()
    }
    return jsonify(success=True, response= response_body), 200

@api.route('/update', methods=['PUT'])
@jwt_required()
def update():
    request_body = request.get_json(force=True)
    email = request_body["email"]
    password = request_body["password"]

    user = User.query.filter_by(id=get_jwt_identity()).first()
    user.email=email
    user.password=password
    
    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "successfully updated account info",
        "user": user.serialize(),
    }

    return jsonify(response_body), 200

@api.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_account():
    current_user_id = get_jwt_identity()
    print (current_user_id)
    user = User.query.filter_by(id=current_user_id).first()

    if not user:
        return jsonify(success=False, message='User not found'), 404
    
    try:
        db.session.delete(user)
        db.session.commit()
    except:
        raise APIException('Internal error', 500)
    
@api.route('/user/favourites', methods=['GET'])
@jwt_required()
def get_favourites():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()\
    
    if not user:
        return jsonify(success=False, message='User not found'), 404
    
    user = user.serialize()
    favourites =  user['favourites']
    return jsonify(success=True, message='Here are your favourites', favourites = favourites), 200

@api.route('/user/favourites', methods=['POST'])
@jwt_required()
def add_favourites():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify(success=False, message='User not found'), 404
    
    body = request.json
    if body["title"] is None or body["api_id"] is None or body["image"] is None:
        return jsonify(success=False, message='Please send all required fields'), 400
    
    checkFavourite = Favourite.query.filter_by(api_id=body["api_id"]).first()
    if checkFavourite: return jsonify(success=False, message='This favourite already exists'), 400

    favourite = Favourite(title = body["title"], api_id = body["api_id"], image = body["image"], user_id = user_id,)

    db.session.add(favourite)
    db.session.commit()
    db.session.refresh(favourite)

    return jsonify(success=True, message = 'Your favourite was successfully added',), 200

@api.route('/user/favourites', methods=['DELETE'])
@jwt_required()
def delete_favourite():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    if not user:
        return jsonify(success=False, message='User not found'), 404
        
    body = request.json
    api_id = body.get("api_id")

    if not api_id:
        return jsonify(success=False, message="API ID is required"), 400

    favourite = Favourite.query.filter_by(api_id=api_id, userid=current_user_id).first()

    if not favourite:
        return jsonify(success=False, message='Favourite not found'), 404

    db.session.delete(favourite)
    db.session.commit()

    return jsonify(success=True, message='Favourite deleted successfully'), 200   

