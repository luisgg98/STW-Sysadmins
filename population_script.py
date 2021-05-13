import json
import requests


def create_company(payload):
    headers = {'content-type': 'application/json'}
    url = 'https://stw-zitation.herokuapp.com/api/companies'
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    if r.status_code != 201:
        print('Something went wrong with company: {}'.format(payload['name']))
    return r.json()['_id']


def create_user(payload):
    url = 'https://stw-zitation.herokuapp.com/api/users'
    headers = {'content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    if r.status_code != 201:
        print('Something went wrong with user: {}'.format(payload['first_name']))
    return r.json()['_id']


def log_user(payload):
    url = 'https://stw-zitation.herokuapp.com/api/users/login'
    headers = {'content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    if r.status_code != 200:
        print('Something went wrong with user: {}'.format(payload['first_name']))
    return r.json()['token']


def update_company_return_token(company, update):
    url = 'https://stw-zitation.herokuapp.com/api/companies/login'
    headers = {'content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(company), headers=headers)
    if r.status_code != 200:
        print('Error login: {}'.format(company['email']))
    bearer = r.json()['token']
    company_id = r.json()['company']['_id']
    ## Update company schedule and service duration in order to generate time_slots
    headers = {'content-type': 'application/json', 'Authorization': bearer}
    url = 'https://stw-zitation.herokuapp.com/api/companies/{}'.format(company_id)
    r = requests.patch(url, data=json.dumps(update), headers=headers)
    if r.status_code != 200:
        print('Error updating: {}'.format(company_id))
        print(r.text)
    return bearer


def create_service(nif, service, bearer):
    url = 'https://stw-zitation.herokuapp.com/api/companies/' + nif + '/services'
    headers = {'content-type': 'application/json', 'Authorization': bearer}
    r = requests.post(url, data=json.dumps(service), headers=headers)
    if r.status_code != 201:
        print('Error creating service')
    return r.json()['_id']


def create_booking(user_id, booking):
    url = 'https://stw-zitation.herokuapp.com/api/users/login'
    headers = {'content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(company), headers=headers)
    if r.status_code != 201:
        print('Error login: {}'.format(company['email']))
    bearer = r.json()['token']

    url = 'https://stw-zitation.herokuapp.com/api/users/' + user_id + '/bookings'
    headers = {'content-type': 'application/json', 'Authorization': bearer}
    r = requests.post(url, data=json.dumps(booking), headers=headers)
    if r.status_code != 201:
        print('Error creating booking')
    return r.json()['_id']


def create_master():
    url = 'https://stw-zitation.herokuapp.com/api/admin/'
    payload = {
        'password': 'stw20-21',
        'email': 'zitationstw@unizar.es'
    }
    headers = {'content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(payload), headers=headers)


# url = 'https://stw-zitation.herokuapp.com/api/api/companies/' + company.nif + '/opinions'
def populate_opinions(companies, users, tokens):
    opinions = [
        {'comment': 'Me gusta este lugar.', 'user_id': users[0], 'stars': 5},
        {'comment': 'No me gusta este lugar.', 'user_id': users[1], 'stars': 0},
        {'comment': 'Es un lugar maravilloso.', 'user_id': users[2], 'stars': 3},
        {'comment': 'Me turbo flipa.', 'user_id': users[3], 'stars': 5},
    ]
    for x in companies:
        url = 'https://stw-zitation.herokuapp.com/api/companies/' + x.nif + '/opinions'
        for i in range(len(opinions)):
            headers = {'content-type': 'application/json', 'Authorization': tokens[i]}
            r = requests.patch(url, data=json.dumps(opinions[i]), headers=headers)
            if r.status_code != 201:
                print('Error updating: commenting')
            print(i)


# Create master
print('Creating users...')
create_master()
## Populate USERS collection
isabel = {'phone': '676416354', 'first_name': 'Isabel', 'last_name': 'Casado', 'email': 'isabel85Wrong@gmail.es',
          'password': 'Isabel1234-'}
isabel_id = create_user(isabel)
isabel_token = log_user(isabel)

facundo = {'phone': '678010101', 'first_name': 'Facundo', 'last_name': 'Diaz', 'email': 'facu90Wrong@gmail.com',
           'password': 'Facundo1234-'}
facundo_id = create_user(facundo)
facundo_token = log_user(facundo)

borja = {'phone': '679010101', 'first_name': 'Borja', 'last_name': 'Pavon', 'email': 'pavon90Wrong@gmail.com',
         'password': 'Borja1234-'}
borja_id = create_user(borja)
borja_token = log_user(borja)

ramon = {'phone': '680010101', 'first_name': 'Ramon', 'last_name': 'Emilio', 'email': 'ramon90Wrong@gmail.com',
         'password': 'Ramon1234-'}
ramon_id = create_user(ramon)
ramon_token = log_user(ramon)

miguel = {'phone': '610010101', 'first_name': 'Miguel', 'last_name': 'Maltorres', 'email': 'maltorres90Wrong@gmail.com',
          'password': 'Maltorres1234-'}
miguel_id = create_user(miguel)
miguel_token = log_user(miguel)

print('Users created!')
## Populate COMPANIES collection
print('Creating companies...')
deportivo1 = {'nif': 'A12345678', 'name': 'Centro Deportivo Municipal Alberto Maestro', 'email': 'deportivo1@gmail.com',
              'password': 'deportivo1234', 'street': 'Camino de las Torres', 'streetnumber': '2', 'zipcode': '50002',
              'category': 'Deporte', 'service_duration': 30, 'capacity': 10}
create_company(deportivo1)

deportivo2 = {'nif': 'B12345678', 'name': 'Centro Deportivo Municipal La Granja', 'email': 'deportivo2@gmail.com',
              'password': 'deportivo1234', 'street': 'Camino Cabaldós', 'streetnumber': '45', 'zipcode': '50013',
              'category': 'Deporte', 'service_duration': 30, 'capacity': 10}
create_company(deportivo2)

ocio1 = {'nif': 'C12345678', 'name': 'Warhammer', 'email': 'ocio1@gmail.com', 'password': 'deportivo1234',
         'street': 'Calle Francisco de Vitoria', 'streetnumber': '14', 'zipcode': '50008', 'category': 'Ocio',
         'service_duration': 30, 'capacity': 10}
create_company(ocio1)

ocio2 = {'nif': 'D12345678', 'name': 'Fox', 'email': 'ocio2@gmail.com', 'password': 'deportivo1234',
         'street': 'Av. Cesáreo Alierta', 'streetnumber': '10', 'zipcode': '50008', 'category': 'Ocio',
         'service_duration': 30, 'capacity': 10}
create_company(ocio2)

civico1 = {'nif': 'V12345678', 'name': 'Centro Cívico Delicias', 'email': 'civico1@gmail.com',
           'password': 'deportivo1234', 'street': 'Av. Navarra', 'streetnumber': '54', 'zipcode': '50010',
           'category': 'Administración pública', 'service_duration': 30, 'capacity': 10}
create_company(civico1)

admin1 = {'nif': 'F12345678', 'name': 'Ayuntamiento de Zaragoza: Servicio de Educación', 'email': 'admin1@gmail.com',
          'password': 'deportivo1234', 'street': 'Calle de Miguel Servet', 'streetnumber': '57', 'zipcode': '50013',
          'category': 'Administración pública', 'service_duration': 30, 'capacity': 10}
create_company(admin1)

admin2 = {'nif': 'E12345678', 'name': 'Zaragoza Activa', 'email': 'admin2@gmail.com', 'password': 'deportivo1234',
          'street': 'Calle Mas de las Matas', 'streetnumber': '20', 'zipcode': '50014',
          'category': 'Administración pública', 'service_duration': 30, 'capacity': 10}
create_company(admin2)

salud1 = {'nif': 'G12345678', 'name': 'Voga', 'email': 'salud1@gmail.com', 'password': 'deportivo1234',
          'street': 'Av. Juan Carlos I', 'streetnumber': '43', 'zipcode': '50009', 'category': 'Salud y Belleza'
    , 'service_duration': 30, 'capacity': 10}
create_company(salud1)

salud2 = {'nif': 'H12345678', 'name': 'Farmacia', 'email': 'salud2@gmail.com', 'password': 'deportivo1234',
          'street': 'Calle de Miguel Servet', 'streetnumber': '84', 'zipcode': '50013', 'category': 'Salud y Belleza'
    , 'service_duration': 30, 'capacity': 10}
create_company(salud2)

comercio1 = {'nif': 'I12345678', 'name': 'Mercado Central de Zaragoza', 'email': 'comercio1@gmail.com',
             'password': 'deportivo1234', 'street': 'Av. de César Augusto', 'streetnumber': '110', 'zipcode': '50003',
             'category': 'Comercio'
    , 'service_duration': 30, 'capacity': 10}
create_company(comercio1)

comercio2 = {'nif': 'J12345678', 'name': 'Carrefour', 'email': 'comercio2@gmail.com', 'password': 'deportivo1234',
             'street': 'Calle de María Zambrano', 'streetnumber': '71', 'zipcode': '50018', 'category': 'Comercio'
    , 'service_duration': 30, 'capacity': 10}
create_company(comercio2)

print('Companies created!')
## Populate SERVICES collection
## Collect Bearer token in order to be able to authentificate

print('Updating companies...')
company = {'email': deportivo1['email'], 'password': deportivo1['password']}
update = {'service_duration': 20, 'capacity': 3, 'schedule': {'monday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'tuesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'wednesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'thursday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'friday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'saturday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'sunday': {'open_1': '9:00', 'close_1': '21:00'}}}
deportivo1_token = update_company_return_token(company, update)

## Collect Bearer token in order to be able to authentificate
company = {'email': ocio1['email'], 'password': ocio1['password']}
update = {'service_duration': 30, 'capacity': 3, 'schedule': {'monday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'tuesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'wednesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'thursday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'friday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'saturday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'sunday': {'open_1': '9:00', 'close_1': '21:00'}}}
ocio1_token = update_company_return_token(company, update)

## Collect Bearer token in order to be able to authentificate
company = {'email': deportivo2['email'], 'password': deportivo2['password']}
update = {'service_duration': 15, 'capacity': 3, 'schedule': {'monday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'tuesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'wednesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'thursday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'friday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'saturday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'sunday': {'open_1': '9:00', 'close_1': '21:00'}}}
deportivo2_token = update_company_return_token(company, update)

## Collect Bearer token in order to be able to authentificate
company = {'email': ocio2['email'], 'password': ocio2['password']}
update = {'service_duration': 15, 'capacity': 3, 'schedule': {'monday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'tuesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'wednesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'thursday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'friday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'saturday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'sunday': {'open_1': '9:00', 'close_1': '21:00'}}}
ocio2_token = update_company_return_token(company, update)

## Collect Bearer token in order to be able to authentificate
company = {'email': admin1['email'], 'password': admin1['password']}
update = {'service_duration': 15, 'capacity': 3, 'schedule': {'monday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'tuesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'wednesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'thursday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'friday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'saturday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'sunday': {'open_1': '9:00', 'close_1': '21:00'}}}
admin1_token = update_company_return_token(company, update)

## Collect Bearer token in order to be able to authentificate
company = {'email': admin2['email'], 'password': admin2['password']}
update = {'service_duration': '15', 'capacity': '3', 'schedule': {'monday': {'open_1': '9:00', 'close_1': '21:00'},
                                                                  'tuesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                                  'wednesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                                  'thursday': {'open_1': '9:00', 'close_1': '21:00'},
                                                                  'friday': {'open_1': '9:00', 'close_1': '21:00'},
                                                                  'saturday': {'open_1': '9:00', 'close_1': '21:00'},
                                                                  'sunday': {'open_1': '9:00', 'close_1': '21:00'}}}
admin2_token = update_company_return_token(company, update)

## Collect Bearer token in order to be able to authentificate
company = {'email': salud1['email'], 'password': salud1['password']}
update = {'service_duration': 15, 'capacity': 3, 'schedule': {'monday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'tuesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'wednesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'thursday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'friday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'saturday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'sunday': {'open_1': '9:00', 'close_1': '21:00'}}}
admin2_token = update_company_return_token(company, update)

## Collect Bearer token in order to be able to authentificate
company = {'email': salud2['email'], 'password': salud2['password']}
update = {'service_duration': 15, 'capacity': 3, 'schedule': {'monday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'tuesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'wednesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'thursday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'friday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'saturday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'sunday': {'open_1': '9:00', 'close_1': '21:00'}}}
salud2_token = update_company_return_token(company, update)

## Collect Bearer token in order to be able to authentificate
company = {'email': comercio1['email'], 'password': comercio1['password']}
update = {'service_duration': 15, 'capacity': 3, 'schedule': {'monday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'tuesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'wednesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'thursday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'friday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'saturday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'sunday': {'open_1': '9:00', 'close_1': '21:00'}}}
comercio1_token = update_company_return_token(company, update)

## Collect Bearer token in order to be able to authentificate
company = {'email': comercio2['email'], 'password': comercio2['password']}
update = {'service_duration': 15, 'capacity': 3, 'schedule': {'monday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'tuesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'wednesday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'thursday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'friday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'saturday': {'open_1': '9:00', 'close_1': '21:00'},
                                                              'sunday': {'open_1': '9:00', 'close_1': '21:00'}}}
comercio2_token = update_company_return_token(company, update)
print('Companies updated!')
print('Creating services...')
##Creating services for 1 company
services_1 = [{'description': 'Reservar campo de futbol sala', 'price': 11},
              {'description': 'Reservar campo de balonmano', 'price': 10},
              {'description': 'Reservar pista para baloncesto', 'price': 9},
              {'description': 'Reservar pista de padel', 'price': 11},
              {'description': 'Reservar campo de waterpolo', 'price': 11},
              {'description': 'Reservar sala de baile', 'price': 11}]

services_deportivo1_id = []
for x in services_1:
    id = create_service(deportivo1['nif'], x, deportivo1_token)
    services_deportivo1_id.append(id)

services_deportivo2_id = []
for x in services_1:
    id = create_service(deportivo2['nif'], x, deportivo2_token)
    services_deportivo2_id.append(id)

services_2 = [{'description': 'Reservar mesa', 'price': 11},
              {'description': 'Organizar evento', 'price': 10},
              {'description': 'Alquilar local', 'price': 9}]

services_ocio1_id = []
for x in services_2:
    id = create_service(ocio1['nif'], x, ocio1_token)
    services_ocio1_id.append(id)

services_ocio2_id = []
for x in services_2:
    id = create_service(ocio2['nif'], x, ocio2_token)
    services_ocio2_id.append(id)

services_3 = [{'description': 'Tarea administrativa', 'price': 11},
              {'description': 'Visita guiada', 'price': 10}]

services_admin1_id = []
for x in services_3:
    id = create_service(admin1['nif'], x, admin1_token)
    services_admin1_id.append(id)

services_admin2_id = []
for x in services_3:
    id = create_service(admin2['nif'], x, admin2_token)
    services_admin2_id.append(id)

services_4 = [{'description': 'Hora para comprar', 'price': 11}]

services_comercio1_id = []
for x in services_4:
    id = create_service(comercio1['nif'], x, comercio1_token)
    services_admin1_id.append(id)

services_comercio2_id = []
for x in services_4:
    id = create_service(comercio2['nif'], x, comercio2_token)
    services_comercio2_id.append(id)

services_salud1_id = []
for x in services_4:
    id = create_service(salud1['nif'], x, salud1_token)
    services_salud1_id.append(id)

services_salud2_id = []
for x in services_4:
    id = create_service(salud2['nif'], x, salud2_token)
    services_salud2_id.append(id)

print('Services created!')
print('Creating Opinions...')

print('Opinions created!')
companies = [
    ocio1.nif,
    ocio2.nif,
    deportivo1.nif,
    deportivo2.nif,
    salud1.nif,
    salud2.nif,
    comercio1.nif,
    comercio2.nif,
    admin1.nif,
    admino2.nif,
]

users = [
    facundo_id,
    miguel_id,
    isabel_id,
    borja_id
]
tokens = [
    facundo_token,
    miguel_token,
    isabel_token,
    borja_token

]

populate_opinions(companies, users, tokens)
print('Opinions populated!')

##BOOKING
