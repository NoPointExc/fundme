DROP TRIGGER IF EXISTS reach_max;

-- detect fully funded
 CREATE TRIGGER reach_max AFTER INSERT ON Pledge
    FOR EACH ROW
    UPDATE Project SET Project.status = 'working' 
	WHERE Project.status = 'funding' AND Project.pname = New.pname 
	AND Project.pname = NEW.pname 
	AND Project.max_fund <= (SELECT SUM(amount) FROM Pledge 
	    WHERE Pledge.pname = NEW.pname GROUP BY Pledge.pname);
