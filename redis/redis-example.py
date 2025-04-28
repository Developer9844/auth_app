import redis
import json
import time

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Function to fetch and process data from Redis
def fetch_and_process_data():
    # Loop over the Redis keys that you want to monitor
    # For example, keys matching "Struct{id=" (change this pattern as needed)
    keys = r.keys("Struct{id=*}")

    if keys:
        for key in keys:
            # Fetch data for each key
            data = r.get(key)

            # Parse the data from JSON
            if data:
                post_data = json.loads(data)
                post = post_data.get("payload", {}).get("after", {})
                if post:
                    post_id = post.get("id")
                    content = post.get("content")
                    print(f"Post ID: {post_id}, Content: {content}")
                else:
                    print(f"No post data available for key: {key}")
            else:
                print(f"Data not found for key: {key}")
    else:
        print("No matching keys found in Redis.")


fetch_and_process_data()