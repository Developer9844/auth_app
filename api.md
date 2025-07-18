curl -X POST http://127.0.0.1:5000/api/register \
-H "Content-Type: application/json" \
-d '{"username": "ankush", "password": "ankush@123", "full_name": "ankush k", "bio": "Hello!", "profile_pic": "/home/ankush-katkurwar/Pictures/profile.png"}'





curl -X GET http://127.0.0.1:5000/api/profile \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk0OTM5OCwianRpIjoiODQ0NDZmMGYtN2NlYS00YzgyLWE2YmYtYWY2YmZjYmVmOTg1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFua3VzaCIsIm5iZiI6MTczOTk0OTM5OCwiY3NyZiI6IjNlMTI4MmVkLWZiZDYtNDZkMi04MTU4LTZlNmFmMTYyMDNkNSIsImV4cCI6MTczOTk1Mjk5OH0.GiNi_wsU8DqohveWGF1L4Kl7TqZiloYBxEV8eQhPop8"




Running on http://127.0.0.1:5000/

curl -X POST http://127.0.0.1:5000/api/register \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "testpass", "full_name": "Test User"}'

curl -X POST http://127.0.0.1:5000/api/login \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "testpass"}'



curl -X GET http://127.0.0.1:5000/api/profile \
-H "Authorization: Bearer your_jwt_token_here"

curl -X PUT http://127.0.0.1:5000/api/profile \
-H "Authorization: Bearer your_jwt_token_here" \
-H "Content-Type: application/json" \
-d '{"username": "ankush", "password": "ankush@123", "full_name": "ankush k", "bio": "Hello!"}'







http://127.0.0.1:5000/api/my-posts




curl -X POST http://127.0.0.1:5000/api/profile/upload \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MTA4NTI3OSwianRpIjoiNmE2MTZhNDItZDI4Zi00YzBiLWJhY2UtYjU0MjZkODVmZDE0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFua3VzaDk4NDQiLCJuYmYiOjE3NDEwODUyNzksImNzcmYiOiI5NDg1N2MxZS1lMDM1LTQ5OTYtOTA2Zi01NzY2MjQ0MzVjMTciLCJleHAiOjE3NDEwODg4Nzl9.gA95jNrGTreDLQMFyT4uzvrj1X18JFaJxQ6MH87DuXQ" \
-F "file=@/home/ankush-katkurwar/Documents/profile.jpg"


curl -X POST http://127.0.0.1:5000/api/upload \
     -F "file=@/home/ankush-katkurwar/Documents/profile.jpg"




curl -X GET http://127.0.0.1:5000/api/my-posts \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NDcxOTA0OCwianRpIjoiY2VhYTM4YTctNGNlMi00OTRmLWFkMzgtZjgwZWUxOTQ4MjkxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFua3VzaDk4NDQiLCJuYmYiOjE3NDQ3MTkwNDgsImNzcmYiOiJkM2M3ZmUzZi04NTIyLTQzN2EtYjFjZC1kYzJjOTYxMDRhODIiLCJleHAiOjE3NDQ3MjI2NDh9.xb29KARYrqetPAP3_VEceDWCvX4MYx8Awen0glh3s9E"


curl -X GET http://127.0.0.1:5000/api/posts \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk0OTM5OCwianRpIjoiODQ0NDZmMGYtN2NlYS00YzgyLWE2YmYtYWY2YmZjYmVmOTg1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFua3VzaCIsIm5iZiI6MTczOTk0OTM5OCwiY3NyZiI6IjNlMTI4MmVkLWZiZDYtNDZkMi04MTU4LTZlNmFmMTYyMDNkNSIsImV4cCI6MTczOTk1Mjk5OH0.GiNi_wsU8DqohveWGF1L4Kl7TqZiloYBxEV8eQhPop8"


curl -X POST http://127.0.0.1:5000/api/posts \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2MjQzOSwianRpIjoiMTczZTAwMTctMDM4OS00NGQ2LTk2NjgtNjZlZjdjZThjYWNhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InNhcmFoIiwibmJmIjoxNzM5OTYyNDM5LCJjc3JmIjoiNTcxNDQ4OTYtZDUzYS00ZTU1LThhM2MtNjMyYzEwNWMyNmY5IiwiZXhwIjoxNzM5OTY2MDM5fQ.WfejOfcAJCYRb0ZQYx3lL-zcVZmBXJb4SpC-vZABHr0" \
-H "Content-Type: application/json" \
-d '{"content": "Hello, this is my first post!"}'



curl -X GET http://127.0.0.1:5000/api/posts/full -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MDYzMzc1MywianRpIjoiNGNiMGYyYjItY2FhMS00YWY5LTlkYmEtZDUxOThmODAzNjllIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFkbWluXzAwMSIsIm5iZiI6MTc0MDYzMzc1MywiY3NyZiI6Ijc5ZWYwNGExLWFjMmYtNDYxZS05MmExLTE2YzQ4YTJlYzg2MSIsImV4cCI6MTc0MDYzNzM1M30.WUOGGkhvNDXxrwkeh5TXz4GnjeeCBDO6x1syXVDrib8"





curl -X GET http://127.0.0.1:5000/api/my-posts -H "Authorization: Bearer your_jwt_token_here"
[
  {
    "content": "hello, good evening",
    "id": 13
  },
  {
    "content": "time is 14.17",
    "id": 19
  }
]

 curl -X PUT http://127.0.0.1:5000/api/posts/35 -H "Authorization: Bearer your_jwt_token_here" -H "Content-Type: application/json" -d '{"content": "Hello,"}'
{
  "message": "Post updated successfully"
}

curl -X DELETE http://127.0.0.1:5000/api/posts/35 -H "Authorization: Bearer your_jwt_token_here"
{
  "message": "Post deleted successfully"
}





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


curl -X POST http://127.0.0.1:5000/api/profile/update-picture \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MDY0OTAyMSwianRpIjoiMWVkODFjNWQtNjlmNi00NDAzLWFiY2YtNTc5MjhmMTQ4Yjk3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFkbWluXzAwMSIsIm5iZiI6MTc0MDY0OTAyMSwiY3NyZiI6IjU3YmNmMGQyLTIwOTMtNDRmMi05YTc2LWFjMTkwOTc0OGVjMSIsImV4cCI6MTc0MDY1MjYyMX0.sTxrQ0GxG3Fhl03-8JdKZQe9-zvYHH_-hHX5SjkYZi0" \
-F "file=@/home/ankush-katkurwar/Documents/profile.jpg"





curl -X GET http://127.0.0.1:5000/api/profile/picture \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MDY0OTAyMSwianRpIjoiMWVkODFjNWQtNjlmNi00NDAzLWFiY2YtNTc5MjhmMTQ4Yjk3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFkbWluXzAwMSIsIm5iZiI6MTc0MDY0OTAyMSwiY3NyZiI6IjU3YmNmMGQyLTIwOTMtNDRmMi05YTc2LWFjMTkwOTc0OGVjMSIsImV4cCI6MTc0MDY1MjYyMX0.sTxrQ0GxG3Fhl03-8JdKZQe9-zvYHH_-hHX5SjkYZi0"




curl -X GET http://127.0.0.1:5000/api/pictures/profile.jpg  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MTA5MDc4OCwianRpIjoiZTM1YjIyMWMtNWY3Yi00ODdhLTkxNzktMzg0M2VmNjg0NDFjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFua3VzaDk4NDQiLCJuYmYiOjE3NDEwOTA3ODgsImNzcmYiOiJhZjJmMTJlMi1hODUxLTQ1YmUtYjliOC0zMTBjMGZhN2FkMmQiLCJleHAiOjE3NDEwOTQzODh9.PeyXf-jXDLkqsNIikQgKl9Li8RKqGRkUcxZqTSb_hjw"




curl -X POST http://127.0.0.1:5000/api/login  -H "Content-Type: application/json"  -d '{"username": "Ankush9844", "password": "Ankush@9844"}'
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MTA5MDc4OCwianRpIjoiZTM1YjIyMWMtNWY3Yi00ODdhLTkxNzktMzg0M2VmNjg0NDFjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFua3VzaDk4NDQiLCJuYmYiOjE3NDEwOTA3ODgsImNzcmYiOiJhZjJmMTJlMi1hODUxLTQ1YmUtYjliOC0zMTBjMGZhN2FkMmQiLCJleHAiOjE3NDEwOTQzODh9.PeyXf-jXDLkqsNIikQgKl9Li8RKqGRkUcxZqTSb_hjw"
}

curl -X POST http://127.0.0.1:5000/api/pictures  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MTA5MDc4OCwianRpIjoiZTM1YjIyMWMtNWY3Yi00ODdhLTkxNzktMzg0M2VmNjg0NDFjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFua3VzaDk4NDQiLCJuYmYiOjE3NDEwOTA3ODgsImNzcmYiOiJhZjJmMTJlMi1hODUxLTQ1YmUtYjliOC0zMTBjMGZhN2FkMmQiLCJleHAiOjE3NDEwOTQzODh9.PeyXf-jXDLkqsNIikQgKl9Li8RKqGRkUcxZqTSb_hjw" -F "file=@/home/ankush-katkurwar/Documents/profile.jpg"
{
  "file_path": "/profile_pictures/Ankush9844/profile.jpg",
  "message": "File uploaded"
}

curl -X GET http://127.0.0.1:5000/api/pictures/profile.jpg  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MTA5MDc4OCwianRpIjoiZTM1YjIyMWMtNWY3Yi00ODdhLTkxNzktMzg0M2VmNjg0NDFjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFua3VzaDk4NDQiLCJuYmYiOjE3NDEwOTA3ODgsImNzcmYiOiJhZjJmMTJlMi1hODUxLTQ1YmUtYjliOC0zMTBjMGZhN2FkMmQiLCJleHAiOjE3NDEwOTQzODh9.PeyXf-jXDLkqsNIikQgKl9Li8RKqGRkUcxZqTSb_hjw"
Warning: Binary output can mess up your terminal. Use "--output -" to tell 
Warning: curl to output it to your terminal anyway, or consider "--output 
Warning: <FILE>" to save to a file.



curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "Ankush9844", "password": "Ankush@9844"}'



kubectl exec -it kong-dp-kong-55868755fd-fb5wl -n kong -- curl -X POST http://chat-app-backend-svc.default.svc.cluster.local:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "ankush", "password": "ankush@123"}'


