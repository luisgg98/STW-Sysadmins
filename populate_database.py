import requests
import json


from pymongo import MongoClient
client = MongoClient('localhost:27017')
db = client.zitation
db.companies.delete_many({})
db.users.delete_many({})
db.services.delete_many({})
db.bookings.delete_many({})
db.opinions.delete_many({})
db.votes.delete_many({})
'''

## Populate USERS collection
#url = 'https://stw-zitation.herokuapp.com/api/users'
url = 'http://localhost:3000/api/users'
headers = {'content-type': 'application/json'}
payload = {'phone': '676416354', 'first_name': 'Isabel', 'last_name': 'Casado', 'email': 'isabel85@gmail.es', 'password': 'Isabel1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with user: {}'.format(payload['first_name']))

payload = {'phone': '678010101', 'first_name': 'Facundo', 'last_name': 'Diaz', 'email': 'facu90@gmail.com', 'password': 'Facundo1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with user: {}'.format(payload['first_name']))

payload = {'phone': '679010101', 'first_name': 'Borja', 'last_name': 'Pavon', 'email': 'pavon90@gmail.com', 'password': 'Borja1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with user: {}'.format(payload['first_name']))

payload = {'phone': '680010101', 'first_name': 'Ramon', 'last_name': 'Emilio', 'email': 'ramon90@gmail.com', 'password': 'Ramon1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with user: {}'.format(payload['first_name']))

## Populate COMPANIES collection

#url = 'https://stw-zitation.herokuapp.com/api/companies'
url = 'http://localhost:3000/api/companies'
payload = {'nif': 'A12345678', 'name': 'Centro Deportivo Municipal Alberto Maestro', 'email': 'deportivo1@gmail.com', 'password': 'deportivo1234', 'capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30', 'street':'Camino de las Torres', 'streetnumber': '2', 'zipcode': '50002', 'category': 'Deporte'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'B12345678', 'name': 'Centro Deportivo Municipal La Granja', 'email': 'deportivo2@gmail.com', 'password': 'deportivo1234', 'capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30','street':'Camino Cabaldós', 'streetnumber': '45', 'zipcode': '50013', 'category': 'Deporte'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'C12345678', 'name': 'Warhammer', 'email': 'ocio1@gmail.com', 'password': 'deportivo1234', 'street':'Calle Francisco de Vitoria','capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30', 'streetnumber': '14', 'zipcode': '50008', 'category': 'Ocio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'D12345678', 'name': 'Fox', 'email': 'ocio2@gmail.com', 'password': 'deportivo1234', 'street':'Av. Cesáreo Alierta','capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30' ,'streetnumber': '10', 'zipcode': '50008', 'category': 'Ocio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'V12345678', 'name': 'Centro Cívico Delicias', 'email': 'civico1234@gmail.com', 'password': 'deportivo1234', 'capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30', 'street':'Av. Navarra', 'streetnumber': '54', 'zipcode': '50010', 'category': 'Administración pública'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'F12345678', 'name': 'Ayuntamiento de Zaragoza: Servicio de Educación', 'email': 'admin1@gmail.com', 'password': 'deportivo1234', 'capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30', 'street':'Calle de Miguel Servet', 'streetnumber': '57', 'zipcode': '50013', 'category': 'Administración pública'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'E12345678', 'name': 'Zaragoza Activa', 'email': 'admin2@gmail.com', 'password': 'deportivo1234', 'street':'Calle Mas de las Matas', 'capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30', 'streetnumber': '20', 'zipcode': '50014', 'category': 'Administración pública'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'G12345678', 'name': 'Voga', 'email': 'salud1@gmail.com', 'password': 'deportivo1234', 'street':'Av. Juan Carlos I', 'capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30', 'streetnumber': '43', 'zipcode': '50009', 'category': 'Salud y Belleza'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'H12345678', 'name': 'Farmacia', 'email': 'salud2@gmail.com', 'password': 'deportivo1234', 'street':'Calle de Miguel Servet', 'capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30','streetnumber': '84', 'zipcode': '50013', 'category': 'Salud y Belleza'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'I12345678', 'name': 'Mercado Central de Zaragoza', 'email': 'comercio1@gmail.com', 'password': 'deportivo1234', 'capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30','street':'Av. de César Augusto', 'streetnumber': '110', 'zipcode': '50003', 'category': 'Comercio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'J12345678', 'name': 'Carrefour', 'email': 'comercio2@gmail.com', 'password': 'deportivo1234', 'street':'Calle de María Zambrano', 'capacity':'2', 'schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}, 'service_duration':'30','streetnumber': '71', 'zipcode': '50018', 'category': 'Comercio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Something went wrong with company: {}'.format(payload['name']))


## Populate SERVICES collection
## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'comercio2@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_nif = r.json()['company']['nif']

url = 'http://localhost:3000/api/companies/{}/services'.format(company_nif)
headers = {'content-type': 'application/json', 'Authorization': '{}'.format(bearer)}
payload = {'description': 'Reservar campo de futbol sala', 'price':'11'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
service_id = r.json()['_id']
if (r.status_code != 201):
    print('Error creating service')
print('>> Service')
print(r.json())

## Create booking
url = 'http://localhost:3000/api/users/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'isabel85@gmail.es', 'password': 'Isabel1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
user_id = r.json()['user']['_id']
url = 'http://localhost:3000/api/users/{}/bookings'.format(user_id)
headers = {'content-type': 'application/json', 'Authorization': '{}'.format(bearer)}
payload = {'service':'{}'.format(service_id), 'date':'2021-05-10', 'time':'9:00'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 201):
    print('Error creating booking')
'''