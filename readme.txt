EN EL DIRECTORIO ./scripts_database estan todos los scripts de base de datos a ejecutar
en el motor

EN EL FILE .env ESTAN LAS VARIABLES DE ENTORNO: datos de conexion base de datos
y API_KEY de google maps

VERSIÓN DE POSTGRESQL:
13 aunque es compatible desde la 9

VERSIÓN DE NODE UTILIZADA: 14.15.5

END POINTS DE EJEMPLO:

REGISTRAR USUARIO:
    METHOD: POST
    URI: http://localhost:3800/user
    BODY: {
        "name": "mauricio",
        "username": "Admin",
        "password": "d033e22ae348aeb5660fc2140aec35850c4da997"
    }
    RESPONSE: 
    {
        "tag": "SUCCESS",
        "data": {
            "id": 16,
            "name": "mauricio",
            "username": "Admin",
            "password": "d033e22ae348aeb5660fc2140aec35850c4da997",
            "token_active": false
        }
    }

LOGIN:
    METHOD: POST
    URI: http://localhost:3800/login
    BODY: {
        "username": "Admin",
        "password": "d033e22ae348aeb5660fc2140aec35850c4da997"
    }
    RESPONSE: {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE2LCJuYW1lIjoiaG9sYSIsInVzZXJuYW1lIjoiaG9sYSIsImlhdCI6MTY1NTYwNzQwOH0.04noh0o9v5VAGBPACZpV6BlLg9YE0zfyNFkDUA5TK-E"
    }

LOGOUT:
    METHOD: POST
    URI: http://localhost:3800/login/logout
    HEADER-AUTHORIZATION: Bearer token
    RESPONSE:
    {
        "tag": "SUCCESSFULL LOGOUT"
    }

OBTENER TRANSACCIONES:
    METHOD: GET
    URI: http://localhost:3800/log
    HEADER-AUTHORIZATION: Bearer token
    RESPONSE:
        {
    "tag": "SUCCESS",
    "data": [
        {
            "id": 3,
            "table_name": "security.user",
            "operation": "UPDATE",
            "data": {
                "id": 1,
                "name": "Mauricio Pinzon",
                "password": "d033e22ae348aeb5660fc2140aec35850c4da997",
                "username": "Admin",
                "tokenActive": true
            },
            "date": "2022-06-18T23:45:16.421Z"
        },
        {
            "id": 4,
            "table_name": "security.user",
            "operation": "UPDATE",
            "data": {
                "id": 1,
                "name": "Mauricio Pinzon",
                "password": "d033e22ae348aeb5660fc2140aec35850c4da997",
                "username": "Admin",
                "tokenActive": true
            },
            "date": "2022-06-18T23:47:05.631Z"
        },...

OBTENER RESTAURANTES CERCANOS:
    METHOD: GET
    HEADER-AUTHORIZATION: Bearer token
    URI: http://localhost:3800/places
        RESPONSE:
        {
            "tag": "SUCCESS",
            "data": [
                {...
