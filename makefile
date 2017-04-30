start:
	@echo 'http://localhost:3000/'
	npm start
smallface:
	@echo ':)'
clean: db
	rm -rf node_modules/
all: clean db install start
	@echo 'clean node.js moduels and database...'
	@echo 'init database & node.js moduels...'
	@echo 'start server ...'
install:
	npm install
data:
	python2 sql/db_pump.py  | sudo mysql fund_me
db: table trigger data
	@echo 'tables and triggers created'
table:
	cat sql/fundme.sql | sudo mysql
trigger: db
	cat sql/trigger.sql  | sudo mysql fund_me
doc:
	apidoc -i routes/ -o public/doc/
