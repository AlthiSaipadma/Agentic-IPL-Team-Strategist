import requests
import json

url = "http://localhost:8000/generate-team"
payload = {
    "venue": "MA Chidambaram Stadium, Chennai",
    "pitch": "Spin-friendly",
    "weather": "High Humidity",
    "toss": "Bowl First",
    "opponent": "Mumbai Indians"
}

try:
    response = requests.post(url, json=payload, timeout=60)
    print(f"Status Code: {response.status_code}")
    print("Response:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
