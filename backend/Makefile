buildrun:
	-docker build -t tg-angular-abstract-backend .
	-docker container rm -f tg-angular-abstract-backend-container || true
	docker run -d -p 3000:3000 --name tg-angular-abstract-backend-container tg-angular-abstract-backend
