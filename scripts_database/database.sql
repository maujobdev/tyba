CREATE DATABASE tyba;

CREATE SCHEMA audit;

CREATE SEQUENCE audit.sq_audit_log_id
INCREMENT 1
MINVALUE 1
MAXVALUE 2147483647
START 1
CACHE 1;

CREATE TABLE audit.log(
    id integer NOT NULL DEFAULT nextval('audit.sq_audit_log_id'::regclass),
    table_name varchar(100) NOT NULL,
	operation varchar(10) NOT NULL,
    data jsonb NOT NULL,
	date timestamp NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_audit_log_id PRIMARY KEY(id)
);

CREATE SCHEMA security;

CREATE SEQUENCE security.sq_security_user_id
INCREMENT 1
MINVALUE 1
MAXVALUE 2147483647
START 1
CACHE 1;

CREATE TABLE security.user(
    id integer NOT NULL DEFAULT nextval('security.sq_security_user_id'::regclass),
    name varchar(100) NOT NULL,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    token_active boolean NOT NULL DEFAULT false,
    CONSTRAINT pk_security_user_id PRIMARY KEY(id),
    CONSTRAINT uk_security_user_username UNIQUE(username)
);

INSERT INTO security.user(name,username,password)
VALUES(
	'Mauricio',
	'Admin',
	'd033e22ae348aeb5660fc2140aec35850c4da997'
);

CREATE OR REPLACE FUNCTION security.fn_security_login(
	p_username varchar,
	p_password varchar
) RETURNS jsonb
AS
$BODY$
	DECLARE
		v_response jsonb;
	BEGIN
	
		SELECT
			JSON_BUILD_OBJECT(
				'data',JSON_BUILD_OBJECT(
					'id',id,
					'name',name,
            		'username',username,
					'password',password,
					'tokenActive',token_active
				),
				'operation','UPDATE',
				'table','security.user'
			)
		INTO
			v_response
        FROM security.user
        WHERE
            username=p_username
            AND password=p_password;
			
		IF v_response IS NOT NULL THEN
			UPDATE security.user
			SET
				token_active=true
			WHERE
				id=cast(cast(v_response->>'data' AS jsonb)->>'id' AS integer);
		END IF;
		
		RETURN v_response;
		
	END
$BODY$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION security.fn_security_logout(
	p_id integer
) RETURNS jsonb
AS
$BODY$
	DECLARE
		v_response jsonb;
	BEGIN
	
		UPDATE security.user
		SET
			token_active=false
		WHERE
			id=p_id
		RETURNING		
			JSON_BUILD_OBJECT(
				'data',JSON_BUILD_OBJECT(
					'id',id,
					'name',name,
            		'username',username,
					'password',password,
					'tokenActive',token_active
				),
				'operation','UPDATE',
				'table','security.user'
			) INTO v_response;
		
		RETURN v_response;
		
	END
$BODY$
LANGUAGE 'plpgsql';