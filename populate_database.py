import requests
import json

from pymongo import MongoClient
client = MongoClient('localhost:27017')
db = client.zitation
db.companies.delete_many({})
db.users.delete_many({})
db.services.delete_many({})
db.bookings.delete_many({})
'''

## Populate USERS collection

#url = 'https://stw-zitation.herokuapp.com/api/users'
url = 'http://localhost:3000/api/users'
headers = {'content-type': 'application/json'}
payload = {'phone': '676416354', 'first_name': 'Isabel', 'last_name': 'Casado', 'email': 'isabel85@gmail.es', 'password': 'Isabel1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with user: {}'.format(payload['name']))

payload = {'phone': '678010101', 'first_name': 'Facundo', 'last_name': 'Diaz', 'email': 'facu90@gmail.com', 'password': 'Facundo1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with user: {}'.format(payload['name']))

payload = {'phone': '679010101', 'first_name': 'Borja', 'last_name': 'Pavon', 'email': 'pavon90@gmail.com', 'password': 'Borja1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with user: {}'.format(payload['name']))

payload = {'phone': '680010101', 'first_name': 'Ramon', 'last_name': 'Emilio', 'email': 'ramon90@gmail.com', 'password': 'Ramon1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with user: {}'.format(payload['name']))

## Populate COMPANIES collection

#url = 'https://stw-zitation.herokuapp.com/api/companies'
url = 'http://localhost:3000/api/companies'
payload = {'nif': 'A12345678', 'name': 'Centro Deportivo Municipal Alberto Maestro', 'email': 'deportivo1@gmail.com', 'password': 'deportivo1234', 'street':'Camino de las Torres', 'streetnumber': '2', 'zipcode': '50002', 'category': 'Deporte'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'B12345678', 'name': 'Centro Deportivo Municipal La Granja', 'email': 'deportivo2@gmail.com', 'password': 'deportivo1234', 'street':'Camino Cabaldós', 'streetnumber': '45', 'zipcode': '50013', 'category': 'Deporte'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'C12345678', 'name': 'Warhammer', 'email': 'ocio1@gmail.com', 'password': 'deportivo1234', 'street':'Calle Francisco de Vitoria', 'streetnumber': '14', 'zipcode': '50008', 'category': 'Ocio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'D12345678', 'name': 'Fox', 'email': 'ocio2@gmail.com', 'password': 'deportivo1234', 'street':'Av. Cesáreo Alierta', 'streetnumber': '10', 'zipcode': '50008', 'category': 'Ocio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'V12345678', 'name': 'Centro Cívico Delicias', 'email': 'civico1234@gmail.com', 'password': 'deportivo1234', 'street':'Av. Navarra', 'streetnumber': '54', 'zipcode': '50010', 'category': 'Administración pública'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'F12345678', 'name': 'Ayuntamiento de Zaragoza: Servicio de Educación', 'email': 'admin1@gmail.com', 'password': 'deportivo1234', 'street':'Calle de Miguel Servet', 'streetnumber': '57', 'zipcode': '50013', 'category': 'Administración pública'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'E12345678', 'name': 'Zaragoza Activa', 'email': 'admin2@gmail.com', 'password': 'deportivo1234', 'street':'Calle Mas de las Matas', 'streetnumber': '20', 'zipcode': '50014', 'category': 'Administración pública'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'G12345678', 'name': 'Voga', 'email': 'salud1@gmail.com', 'password': 'deportivo1234', 'street':'Av. Juan Carlos I', 'streetnumber': '43', 'zipcode': '50009', 'category': 'Salud y Belleza'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'H12345678', 'name': 'Farmacia', 'email': 'salud2@gmail.com', 'password': 'deportivo1234', 'street':'Calle de Miguel Servet', 'streetnumber': '84', 'zipcode': '50013', 'category': 'Salud y Belleza'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'I12345678', 'name': 'Mercado Central de Zaragoza', 'email': 'comercio1@gmail.com', 'password': 'deportivo1234', 'street':'Av. de César Augusto', 'streetnumber': '110', 'zipcode': '50003', 'category': 'Comercio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))

payload = {'nif': 'J12345678', 'name': 'Carrefour', 'email': 'comercio2@gmail.com', 'password': 'deportivo1234', 'street':'Calle de María Zambrano', 'streetnumber': '71', 'zipcode': '50018', 'category': 'Comercio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Something went wrong with company: {}'.format(payload['name']))


## Populate SERVICES collection
## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json'}
payload = {'email': 'deportivo1@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_id = r.json()['company']['_id']
## Update company schedule and service duration in order to generate time_slots
headers = {'content-type': 'application/json', 'Authorization': bearer}
#url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
url = 'http://localhost:3000/api/companies/{}'.format(company_id)
payload = {'service_duration': '20', 'capacity': '3','schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}}
r = requests.patch(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error updating: {}'.format(company_id))
    print(r.text)

## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'ocio1@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_id = r.json()['company']['_id']
## Update company schedule and service duration in order to generate time_slots
headers = {'content-type': 'application/json', 'Authorization': bearer}
#url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
url = 'http://localhost:3000/api/companies/{}'.format(company_id)
payload = {'service_duration': '30', 'capacity': '3','schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}}
r = requests.patch(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error updating: {}'.format(company_id))

## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'deportivo2@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_id = r.json()['company']['_id']
## Update company schedule and service duration in order to generate time_slots
headers = {'content-type': 'application/json', 'Authorization': bearer}
#url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
url = 'http://localhost:3000/api/companies/{}'.format(company_id)
payload = {'service_duration': '15', 'capacity': '3','schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}}
r = requests.patch(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error updating: {}'.format(company_id))

## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'ocio2@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_id = r.json()['company']['_id']
## Update company schedule and service duration in order to generate time_slots
headers = {'content-type': 'application/json', 'Authorization': bearer}
#url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
url = 'http://localhost:3000/api/companies/{}'.format(company_id)
payload = {'service_duration': '15', 'capacity': '3','schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}}
r = requests.patch(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error updating: {}'.format(company_id))

## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'admin1@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_id = r.json()['company']['_id']
## Update company schedule and service duration in order to generate time_slots
headers = {'content-type': 'application/json', 'Authorization': bearer}
#url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
url = 'http://localhost:3000/api/companies/{}'.format(company_id)
payload = {'service_duration': '15', 'capacity': '3','schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}}
r = requests.patch(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error updating: {}'.format(company_id))

## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'admin2@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_id = r.json()['company']['_id']
## Update company schedule and service duration in order to generate time_slots
headers = {'content-type': 'application/json', 'Authorization': bearer}
#url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
url = 'http://localhost:3000/api/companies/{}'.format(company_id)
payload = {'service_duration': '15', 'capacity': '3','schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}}
r = requests.patch(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error updating: {}'.format(company_id))

## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'salud1@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_id = r.json()['company']['_id']
## Update company schedule and service duration in order to generate time_slots
headers = {'content-type': 'application/json', 'Authorization': bearer}
#url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
url = 'http://localhost:3000/api/companies/{}'.format(company_id)
payload = {'service_duration': '15', 'capacity': '3','schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}}
r = requests.patch(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error updating: {}'.format(company_id))

## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'salud2@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_id = r.json()['company']['_id']
## Update company schedule and service duration in order to generate time_slots
headers = {'content-type': 'application/json', 'Authorization': bearer}
#url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
url = 'http://localhost:3000/api/companies/{}'.format(company_id)
payload = {'service_duration': '15', 'capacity': '3','schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}}
r = requests.patch(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error updating: {}'.format(company_id))

## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'comercio1@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_id = r.json()['company']['_id']
## Update company schedule and service duration in order to generate time_slots
headers = {'content-type': 'application/json', 'Authorization': bearer}
#url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
url = 'http://localhost:3000/api/companies/{}'.format(company_id)
payload = {'service_duration': '15', 'capacity': '3','schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}}
r = requests.patch(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error updating: {}'.format(company_id))

## Collect Bearer token in order to be able to authentificate
#url = 'https://stw-zitation.herokuapp.com/api/companies/login'
url = 'http://localhost:3000/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': 'comercio2@gmail.com', 'password': 'deportivo1234'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error login: {}'.format(payload['email']))
bearer = r.json()['token']
company_id = r.json()['company']['_id']
## Update company schedule and service duration in order to generate time_slots
headers = {'content-type': 'application/json', 'Authorization': bearer}
#url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
url = 'http://localhost:3000/api/companies/{}'.format(company_id)
payload = {'service_duration': '15', 'capacity': '3','schedule': {'monday': {'open_1': '9:00','close_1': '21:00'},'tuesday': {'open_1': '9:00','close_1': '21:00'},'wednesday': {'open_1': '9:00','close_1': '21:00'},'thursday': {'open_1': '9:00','close_1': '21:00'},'friday': {'open_1': '9:00','close_1': '21:00'},'saturday': {'open_1': '9:00','close_1': '21:00'},'sunday': {'open_1': '9:00','close_1': '21:00'}}}
r = requests.patch(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error updating: {}'.format(company_id))

url = 'http://localhost:3000/api/companies/A12345678/services'
headers = {'content-type': 'application/json'}
payload = {'description': 'Reservar campo de futbol sala', 'price':'11'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error creating service')
print(r.json())

url = 'http://localhost:3000/api/users/6097a3ac66fe8b679cb763ea/bookings'
headers = {'content-type': 'application/json'}
payload = {'service':'6097a57166fe8b679cb763f9', 'date':'2021-05-10', 'time':'9:00'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
if (r.status_code != 200):
    print('Error creating booking')
print(r.json())
'''