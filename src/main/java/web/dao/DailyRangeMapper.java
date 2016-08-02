package web.dao;

import org.springframework.stereotype.Repository;
import web.pojo.before.StockRange;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/15.
 */
@Repository
public interface DailyRangeMapper {

    public ArrayList<StockRange> getRange(String start ,String end);
}
