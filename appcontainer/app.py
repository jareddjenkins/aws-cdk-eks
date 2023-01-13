from flask import Flask
import time
import requests
import json
# from ec2_metadata import ec2_metadata

app = Flask('hello-cloudbuild')

@app.route('/')
def hello():
  data = {}
  data['message'] = "Automate all the things!"
  data['time'] = int(time.time())
  return (json.dumps(data))

  
if __name__ == '__main__':
  app.run(host = '0.0.0.0', port = 8080)