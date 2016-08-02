package web.dao;

import org.springframework.stereotype.Repository;
import web.pojo.before.StockPO;

import java.time.LocalDate;
import java.util.ArrayList;


/**
 * Created by zcj on 16/5/8.
 * 提供股票信息
 * 暂时没用
 */
@Repository
public interface StockProvideMapper {


    /**
     * @param id    股票id
     * @param start 开始日期
     * @param end   结束日期
     * @return 股票信息
     */
    public ArrayList<StockPO> getStockInfo(String id, LocalDate start, LocalDate end);

    /**
     *
     * @param id 股票id
     * @param start 开始日期
     * @param end   结束日期
     * @param column 列值
     * @return
     */
    public ArrayList getStockColumn(String id, LocalDate start, LocalDate end, String column);

}


