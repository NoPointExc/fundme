start:
	@echo 'http://localhost:3000/'
	npm start
smallface:
	@echo ':)'
clean:
	cat sql/fundme.sql | sudo mysql
	rm -rf node_modules/
all: clean db install start
	@echo 'clean node.js moduels and database...'
	@echo 'init database & node.js moduels...'
	@echo 'start server ...'
install:
	node install
db: clean
	python sql/db_pump.py  | sudo mysql fund_me
tg: db
	cat sql/trigger.sql  | sudo mysql fund_me

