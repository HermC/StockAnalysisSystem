package web.impl.stock_presentation;

import org.springframework.stereotype.Service;
import web.dao.stock_presentation.StockDataMapper;
import web.pojo.before.PyTradeData;
import web.pojo.before.ForecastData;
import web.pojo.before.PytradeDataPo;
import web.service.stock_presentation.ForecastDataService;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by Hermit on 16/5/25.
 */
@Service("forecastDataService")
public class ForecastDataImpl implements ForecastDataService {

    @Resource
    private StockDataMapper stockDataMapper;

    @Override
    public ArrayList<ForecastData> getForecastData(String id) {
        LocalDate start = LocalDate.now();
        LocalDate end = LocalDate.now().plusDays(15);
        ArrayList<ForecastData> list = stockDataMapper.getForecastData(id, start.toString(), end.toString());

        return list;
    }

    @Override
    public ArrayList<PyTradeData> getPyTrade(String id) {
        PytradeDataPo pytradeDataPo = stockDataMapper.getPyTrade(id);

        if (pytradeDataPo ==null){
            return null;
        }else {
            LocalDate now = LocalDate.now();
            ArrayList<PyTradeData> list = new ArrayList<>();

            PyTradeData temp = new PyTradeData();
            temp.date = now.toString();
            temp.close = pytradeDataPo.price0;
            list.add(temp);

            PyTradeData temp1 = new PyTradeData();
            temp1.date = now.minusDays(-1).toString();
            temp1.close = pytradeDataPo.price1;
            list.add(temp1);

            PyTradeData temp2 = new PyTradeData();
            temp2.date = now.minusDays(-2).toString();
            temp2.close = pytradeDataPo.price2;
            list.add(temp2);

            PyTradeData temp3 = new PyTradeData();
            temp3.date = now.minusDays(-3).toString();
            temp3.close = pytradeDataPo.price3;
            list.add(temp3);

            PyTradeData temp4 = new PyTradeData();
            temp4.date = now.minusDays(-4).toString();
            temp4.close = pytradeDataPo.price4;
            list.add(temp4);

            PyTradeData temp5 = new PyTradeData();
            temp5.date = now.minusDays(-5).toString();
            temp5.close = pytradeDataPo.price5;
            list.add(temp5);

            PyTradeData temp6 = new PyTradeData();
            temp6.date = now.minusDays(-6).toString();
            temp6.close = pytradeDataPo.price6;
            list.add(temp6);

            PyTradeData temp7 = new PyTradeData();
            temp7.date = now.minusDays(-7).toString();
            temp7.close = pytradeDataPo.price7;
            list.add(temp7);

            PyTradeData temp8 = new PyTradeData();
            temp8.date = now.minusDays(-8).toString();
            temp8.close = pytradeDataPo.price8;
            list.add(temp8);

            PyTradeData temp9 = new PyTradeData();
            temp9.date = now.minusDays(-9).toString();
            temp9.close = pytradeDataPo.price9;
            list.add(temp9);

            PyTradeData temp10 = new PyTradeData();
            temp10.date = now.minusDays(-10).toString();
            temp10.close = pytradeDataPo.price10;
            list.add(temp10);

            PyTradeData temp11 = new PyTradeData();
            temp11.date = now.minusDays(-11).toString();
            temp11.close = pytradeDataPo.price11;
            list.add(temp11);

            PyTradeData temp12 = new PyTradeData();
            temp12.date = now.minusDays(-12).toString();
            temp12.close = pytradeDataPo.price12;
            list.add(temp12);

            PyTradeData temp13 = new PyTradeData();
            temp13.date = now.minusDays(-13).toString();
            temp13.close = pytradeDataPo.price13;
            list.add(temp13);

            PyTradeData temp14 = new PyTradeData();
            temp14.date = now.minusDays(-14).toString();
            temp14.close = pytradeDataPo.price14;
            list.add(temp14);
            if(list.size() == 0){
                return  null;
            }else {
                return list;
            }
        }

    }

    @Override
    public ArrayList<PyTradeData> getPyTradeList(String id) {
        ArrayList<PyTradeData> list = stockDataMapper.getPyTradeList(id);
        if(list.size() == 0){
            return  null;
        }else {
            return list;
        }
    }

    @Override
    public ArrayList<ForecastData> getPyTradeForecast(String id) {
        LocalDate start = LocalDate.now();
        LocalDate end = LocalDate.now().plusDays(15);
        ArrayList<ForecastData> list = stockDataMapper.getPyTradeForecast(id, start.toString(), end.toString());
        if(list.size() == 0){
            return  null;
        }else {
            return list;
        }
    }
}
