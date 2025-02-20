from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector
import datetime

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1YiI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.RSq0eQtMWrxk4xxSiF8kD9B1L_8WExdEy-pCzrwSuYY'
jwt = JWTManager(app)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="ankush-katkurwar",
    password="Anku$h9844.",
    database="facebook2")
cursor = db.cursor()

# Database migration
def migrate():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            full_name VARCHAR(255),
            bio TEXT,
            profile_pic TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    db.commit()

migrate()

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = bcrypt.generate_password_hash(data.get("password")).decode('utf-8')
    full_name = data.get("full_name", "")
    
    cursor.execute("INSERT INTO users (username, password, full_name) VALUES (%s, %s, %s)", 
                   (username, password, full_name))
    db.commit()
    return jsonify({"message": "User registered successfully"})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    cursor.execute("SELECT id, password FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    
    if user and bcrypt.check_password_hash(user[1], password):
        access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(hours=1))
        return jsonify({"access_token": access_token})
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/api/profile", methods=["GET", "PUT"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    
    if request.method == "GET":
        cursor.execute("SELECT username, full_name, bio, profile_pic FROM users WHERE username = %s", (current_user,))
        user = cursor.fetchone()
        if user:
            return jsonify({
                "username": user[0], 
                "full_name": user[1], 
                "bio": user[2], 
                "profile_pic": user[3]
            })
        return jsonify({"error": "User not found"}), 404

    elif request.method == "PUT":
        data = request.json
        updates = []
        values = []

        # Handle username, full_name, bio, profile_pic updates
        if "username" in data:
            updates.append("username = %s")
            values.append(data["username"])
        
        if "full_name" in data:
            updates.append("full_name = %s")
            values.append(data["full_name"])
        
        if "bio" in data:
            updates.append("bio = %s")
            values.append(data["bio"])
        
        if "profile_pic" in data:
            updates.append("profile_pic = %s")
            values.append(data["profile_pic"])
        
        # Handle password update
        if "old_password" in data and "new_password" in data:
            cursor.execute("SELECT password FROM users WHERE username = %s", (current_user,))
            stored_password = cursor.fetchone()

            if stored_password and bcrypt.check_password_hash(stored_password[0], data["old_password"]):
                new_hashed_password = bcrypt.generate_password_hash(data["new_password"]).decode("utf-8")
                updates.append("password = %s")
                values.append(new_hashed_password)
            else:
                return jsonify({"error": "Old password is incorrect"}), 400

        if updates:
            query = f"UPDATE users SET {', '.join(updates)} WHERE username = %s"
            values.append(current_user)
            cursor.execute(query, tuple(values))
            db.commit()

        return jsonify({"message": "Profile updated successfully"})


@app.route("/api/posts", methods=["GET", "POST"])
@jwt_required()
def handle_posts():
    current_user = get_jwt_identity()

    # Fetch the user_id, full_name, and username
    cursor.execute("SELECT id, full_name, username FROM users WHERE username = %s", (current_user,))
    user = cursor.fetchone()
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_id, full_name, username = user  # Extract user details

    if request.method == "POST":
        data = request.json
        cursor.execute("INSERT INTO posts (user_id, content) VALUES (%s, %s)", (user_id, data.get("content")))
        db.commit()
        
        return jsonify({
            "full_name": full_name,
            "username": username,
            "content": data.get("content")
        })

    # Fetch all posts with user details
    cursor.execute("""
        SELECT users.username, users.full_name, posts.content 
        FROM posts 
        JOIN users ON posts.user_id = users.id 
        ORDER BY posts.created_at DESC
    """)
    
    posts = cursor.fetchall()
    return jsonify([
        {"username": p[0], "full_name": p[1], "content": p[2]} for p in posts
    ])




@app.route("/api/posts/<int:post_id>", methods=["PUT", "DELETE"])
@jwt_required()
def modify_post(post_id):
    current_user = get_jwt_identity()
    
    if request.method == "PUT":
        data = request.json
        new_content = data.get("content")

        # Check if post exists and belongs to user
        cursor.execute("SELECT user FROM posts WHERE id = %s", (post_id,))
        post = cursor.fetchone()
        if not post or post[0] != current_user:
            return jsonify({"error": "Unauthorized or post not found"}), 403

        cursor.execute("UPDATE posts SET content = %s WHERE id = %s", (new_content, post_id))
        db.commit()
        return jsonify({"message": "Post updated successfully"}), 200

    elif request.method == "DELETE":
        # Check if post exists and belongs to user
        cursor.execute("SELECT user FROM posts WHERE id = %s", (post_id,))
        post = cursor.fetchone()
        if not post or post[0] != current_user:
            return jsonify({"error": "Unauthorized or post not found"}), 403

        cursor.execute("DELETE FROM posts WHERE id = %s", (post_id,))
        db.commit()
        return jsonify({"message": "Post deleted successfully"}), 200



@app.route('/api/posts/full', methods=['GET'])
@jwt_required()
def get_posts_with_fullname():
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT users.id, users.full_name, users.username, posts.content 
        FROM posts 
        JOIN users ON posts.user_id = users.id
    """)
    posts = cursor.fetchall()
    cursor.close()
   
    return jsonify(posts)


if __name__ == "__main__":
    app.run(debug=True)
