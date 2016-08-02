package web.service.stock_presentation;

import web.pojo.before.StockInfo;
import web.pojo.before.StockSeason;

import java.util.ArrayList;

/**
 * Created by yqq on 2016.5.11.
 * 之后行业也可能会有相关新闻
 */
public interface StockInfoService {
    /**
     *
     * @param id 股票ID
     * @return 公司相关数据
     */
    public StockInfo getStockInfo(String id);


    /**
     * 季度信息
     * @param id
     * @return
     */
    public ArrayList<StockSeason> getStockSeason(String id);
}
