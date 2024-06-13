build:
	docker build -t tg-angular-abstract-app .
run:
  docker container rm tg-angular-abstract-app-container
	docker run -d -p 80:80 --name tg-angular-abstract-app-container tg-angular-abstract-app
