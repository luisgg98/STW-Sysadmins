import requests
import json

#from pymongo import MongoClient
#client = MongoClient('localhost:27017')
#db = client.zitation
#db.companies.delete_many({})

## Poblate with 90 users
url = 'https://stw-zitation.herokuapp.com/api/users'
headers = {'content-type': 'application/json'}
payload = {'phone': '676416354', 'first_name': 'Federico', 'last_name': 'Garcia', 'email': 'adsf@unizar.es', 'password': 'fede1234'}

# 90 users
for x in range(10,100):
    payload['phone'] = 6764163*100+x
    payload['email'] = 'fede{}@unizar.es'.format(x)
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    r.status_code'''


## Poblate with 90 companies
'''url = 'https://stw-zitation.herokuapp.com/api/companies'
headers = {'content-type': 'application/json'}
payload = {'nif': '', 'name': 'Peluqueria Ramon', 'email': 'ramonpeluqueria{}@gmail.com', 'password': 'ramon1234', 'street':'Avenida Gomez de Avellaneda', 'streetnumber': '53', 'zipcode': '50018', 'category': 'Ocio'}

for x in range(10,100):
    payload['nif'] = 'AB{}'.format(x)
    payload['email'] = 'ramonpeluqueria{}@gmail.com'.format(x)
    r = requests.post(url, data=json.dumps(payload), headers=headers)

'''## Take 10 last companies Bearer token and update schedule
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': '', 'password': 'ramon1234'}
for x in range(90,100):
    payload['email'] = 'ramonpeluqueria{}@gmail.com'.format(x)
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    print(r.status_code)
    print('Bearer token obtained')
    response = r.json()
    bearer = response['token']
    company_id = response['company']['id']
    # Recogido el token, realizamos el update
    headers_update = {'content-type': 'application/json', 'Authorization': ''}
    headers_update['Authorization'] = bearer
    url_update = 'http://localhost:3000/api/companies/{}'.format(company_id)
    payload_update = {"duration": "20","schedule": {"monday": {"open_1": "9:00","close_1": "21:00"},"tuesday": {"open_1": "9:00","close_1": "21:00"},"wednesday": {"open_1": "9:00","close_1": "21:00"},"thursday": {"open_1": "9:00","close_1": "21:00"},"friday": {"open_1": "9:00","close_1": "21:00"},"saturday": {"open_1": "9:00","close_1": "21:00"},"sunday": {"open_1": "9:00","close_1": "21:00"}}}
    r = requests.patch(url_update, data=json.dumps(payload_update), headers=headers_update)
    print('Company updated sucessfully')'''