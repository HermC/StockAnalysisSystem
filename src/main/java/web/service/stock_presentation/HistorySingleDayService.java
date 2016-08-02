package web.service.stock_presentation;

import web.pojo.before.StockCurrent;

import java.time.LocalDate;

/**
 * Created by yqq on 2016.5.11.
 */
public interface HistorySingleDayService {
    /**
     *
     * @param id 股票id
     * @param date 日期
     * @return 股票历史分时数据
     */
    public StockCurrent getHisCurrentInfo(String id, LocalDate date);

}
