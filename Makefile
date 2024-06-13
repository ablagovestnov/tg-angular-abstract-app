build:
	docker build -t tg-angular-abstract-app .
run:
	docker run -d -p 80:80 --name tg-angular-abstract-app-container tg-angular-abstract-app

buildrun:
	-docker build -t tg-angular-abstract-app .
	-docker container rm -f tg-angular-abstract-app-container || true
	docker run -d -p 80:80 --name tg-angular-abstract-app-container tg-angular-abstract-app
