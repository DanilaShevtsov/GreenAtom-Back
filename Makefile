up-local:
	docker network create greenatom
	docker-compose -f docker-compose.yml up --build -d
up:
	rm -rf ./dist && npm run start:dev