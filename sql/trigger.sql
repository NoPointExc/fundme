DROP TRIGGER IF EXISTS reach_max;
DROP TRIGGER IF EXISTS update_project_current_fund;
DROP EVENT IF EXISTS update_project_status_daily;

-- detect fully funded
 CREATE TRIGGER reach_max AFTER INSERT ON Pledge
    FOR EACH ROW    
    UPDATE Project SET Project.status = 'working' 
	WHERE Project.status = 'funding' AND Project.pname = New.pname 
	AND Project.max_fund <= Project.current_fund;

-- update current_fund in project
 CREATE TRIGGER update_project_current_fund BEFORE INSERT ON Pledge
    FOR EACH ROW
    UPDATE Project SET Project.current_fund = Project.current_fund + NEW.amount
	WHERE Project.status = 'funding' AND Project.pname = New.pname;


-- update project daily
delimiter |

CREATE EVENT update_project_status_daily
    ON SCHEDULE
      EVERY 1 DAY
    COMMENT 'Update out-date project from funding to working or failed daily'
    DO
      BEGIN
        UPDATE Project SET Project.status = 'working'
        WHERE status = 'funding' AND end_time <= NOW() AND current_fund >= min_fund;
		UPDATE Project SET Project.status = 'failed'
        WHERE status = 'funding' AND end_time <= NOW() AND current_fund < min_fund;
      END |

delimiter ;
