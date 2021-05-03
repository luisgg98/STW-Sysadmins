import requests
import json

#from pymongo import MongoClient
#client = MongoClient('localhost:27017')
#db = client.zitation
#db.companies.delete_many({})

url = 'https://stw-zitation.herokuapp.com/api/users'
headers = {'content-type': 'application/json'}
payload = {'phone': '676416354', 'first_name': 'Isabel', 'last_name': 'Casado', 'email': 'isabel85@gmail.es', 'password': 'Isabel1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code

payload = {'phone': '678010101', 'first_name': 'Facundo', 'last_name': 'Diaz', 'email': 'facu90@gmail.com', 'password': 'Facundo1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code

payload = {'phone': '679010101', 'first_name': 'Borja', 'last_name': 'Pavon', 'email': 'pavon90@gmail.com', 'password': 'Borja1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code

payload = {'phone': '680010101', 'first_name': 'Ramon', 'last_name': 'Emilio', 'email': 'ramon90@gmail.com', 'password': 'Ramon1234-'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code

url = 'https://stw-zitation.herokuapp.com/api/companies'
payload = {'nif': 'A12345678', 'name': 'Centro Deportivo Municipal Alberto Maestro', 'email': 'deportivo1@gmail.com', 'password': 'deportivo1234', 'street':'Camino de las Torres', 'streetnumber': '2', 'zipcode': '50002', 'category': 'Deporte'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code
payload = {'nif': 'B12345678', 'name': 'Centro Deportivo Municipal La Granja', 'email': 'deportivo2@gmail.com', 'password': 'deportivo1234', 'street':'Camino Cabaldós', 'streetnumber': '45', 'zipcode': '50013', 'category': 'Deporte'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code

payload = {'nif': 'C12345678', 'name': 'Warhammer', 'email': 'ocio1@gmail.com', 'password': 'deportivo1234', 'street':'Calle Francisco de Vitoria', 'streetnumber': '14', 'zipcode': '50008', 'category': 'Ocio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code
payload = {'nif': 'D12345678', 'name': 'Fox', 'email': 'ocio2@gmail.com', 'password': 'deportivo1234', 'street':'Av. Cesáreo Alierta', 'streetnumber': '10', 'zipcode': '50008', 'category': 'Ocio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code
payload = {'nif': 'D12345678', 'name': 'Ayuntamiento de Zaragoza: Servicio de Educación', 'email': 'admin1@gmail.com', 'password': 'deportivo1234', 'street':'Calle de Miguel Servet', 'streetnumber': '57', 'zipcode': '50013', 'category': 'Administración pública'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code
payload = {'nif': 'E12345678', 'name': 'Zaragoza Activa', 'email': 'admin2@gmail.com', 'password': 'deportivo1234', 'street':'Calle Mas de las Matas', 'streetnumber': '20', 'zipcode': '50014', 'category': 'Administración pública'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code

payload = {'nif': 'G12345678', 'name': 'Voga', 'email': 'salud1@gmail.com', 'password': 'deportivo1234', 'street':'Av. Juan Carlos I', 'streetnumber': '43', 'zipcode': '50009', 'category': 'Salud y Belleza'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code

payload = {'nif': 'H12345678', 'name': 'Farmacia', 'email': 'salud2@gmail.com', 'password': 'deportivo1234', 'street':'Calle de Miguel Servet', 'streetnumber': '84', 'zipcode': '50013', 'category': 'Salud y Belleza'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code


payload = {'nif': 'I12345678', 'name': 'Mercado Central de Zaragoza', 'email': 'comercio1@gmail.com', 'password': 'deportivo1234', 'street':'Av. de César Augusto', 'streetnumber': '110', 'zipcode': '50003', 'category': 'Comercio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code

payload = {'nif': 'J12345678', 'name': 'Carrefour', 'email': 'comercio2@gmail.com', 'password': 'deportivo1234', 'street':'Calle de María Zambrano', 'streetnumber': '71', 'zipcode': '50018', 'category': 'Comercio'}
r = requests.post(url, data=json.dumps(payload), headers=headers)
r.status_code


'''
## Poblate with 90 companies
url = 'https://stw-zitation.herokuapp.com/api/companies'
headers = {'content-type': 'application/json'}
payload = {'nif': '', 'name': 'Peluqueria Ramon', 'email': 'ramonpeluqueria{}@gmail.com', 'password': 'ramon1234', 'street':'Avenida Gomez de Avellaneda', 'streetnumber': '53', 'zipcode': '50018', 'category': 'Ocio'}

for x in range(10,100):
    payload['nif'] = 'AB{}'.format(x)
    payload['email'] = 'ramonpeluqueria{}@gmail.com'.format(x)
    r = requests.post(url, data=json.dumps(payload), headers=headers)'''

## Take 10 last companies Bearer token and update schedule
'''## Poblate with 90 users
url = 'https://stw-zitation.herokuapp.com/api/companies/login'
headers = {'content-type': 'application/json', 'accept': 'application/json'}
payload = {'email': '', 'password': 'ramon1234'}
for x in range(90,100):
    payload['email'] = 'ramonpeluqueria{}@gmail.com'.format(x)
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    print(r.status_code)
    response = r.json()
    bearer = response['token']
    company_id = response['company']['id']
    # Recogido el token, realizamos el update
    headers_update = {'content-type': 'application/json', 'Authorization': ''}
    headers_update['Authorization'] = bearer
    url_update = 'http://localhost:3000/api/companies/{}'.format(company_id)
    payload_update = {"duration": "20","schedule": {"monday": {"open_1": "9:00","close_1": "21:00"},"tuesday": {"open_1": "9:00","close_1": "21:00"},"wednesday": {"open_1": "9:00","close_1": "21:00"},"thursday": {"open_1": "9:00","close_1": "21:00"},"friday": {"open_1": "9:00","close_1": "21:00"},"saturday": {"open_1": "9:00","close_1": "21:00"},"sunday": {"open_1": "9:00","close_1": "21:00"}}}
    r = requests.patch(url_update, data=json.dumps(payload_update), headers=headers_update)
    '''
