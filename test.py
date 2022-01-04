import requests
import json
r = requests.get("http://127.0.0.1:5000/test/password")
try:
    a = json.loads(r.text)

except json.JSONDecodeError:
    print(True)
    pass