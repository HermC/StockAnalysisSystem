package web.service.stock_presentation;

import web.pojo.before.PyTradeData;
import web.pojo.before.ForecastData;

import java.util.ArrayList;

/**
 * Created by Hermit on 16/5/25.
 */
public interface ForecastDataService {

    /**
     *
     * @param id 股票id
     * @return 预测数据
    * */
    public ArrayList<ForecastData> getForecastData(String id);


    /**
     * BP预测
     */
    public ArrayList<PyTradeData> getPyTrade(String id);

    /**
     *
     * @param id
     * @return
     */
    public ArrayList<PyTradeData> getPyTradeList(String id);


    public ArrayList<ForecastData> getPyTradeForecast(String id);
}
