clean:
	cat sql/fundme.sql | sudo mysql
db: clean
	python sql/db_pump.py  | sudo mysql fund_me
tg: db
	cat sql/trigger.sql  | sudo mysql fund_me

