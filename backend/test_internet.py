import requests
url = "https://www.google.com"
try:
    r = requests.get(url, timeout=5)
    print(f"Google status: {r.status_code}")
except Exception as e:
    print(f"Error: {e}")
