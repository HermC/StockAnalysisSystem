package web.dao.stock_presentation;

import org.springframework.stereotype.Repository;
import web.pojo.before.StockCurrent;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by zcj on 16/5/8.
 * 股票历史分时信息表
 * 暂时没有
 */
@Repository
public interface StockCurrentMapper {

    /**
     *
     * @param id 股票id
     * @param date 时间
     * @return 一天的历史信息
     */
    public StockCurrent getCurrentInfo(String id , LocalDate date);

    /**
     *
     * @param id 股票id
     * @param date 时间
     * @param Column 列名
     * @return 列array
     */
    public ArrayList getCurrentColumn(String id, Date date,String Column);
}
