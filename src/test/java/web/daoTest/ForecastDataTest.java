package web.daoTest;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.before.ForecastData;
import web.service.stock_presentation.ForecastDataService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by Hermit on 16/5/25.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class ForecastDataTest {
    private static Logger logger = Logger.getLogger(ForecastDataTest.class);

//    @Autowired
//    private StockDataMapper stockDataMapper;

    @Resource
    private ForecastDataService forecastDataService;

    @Test
    public void test() {
//        ForecastData forecastData = stockDataMapper.getForecastData("sh600000").get(0);

//        System.out.println(forecastData.close_low_fst);

        ArrayList<ForecastData> list = forecastDataService.getPyTradeForecast("sh600216");

        System.out.println("start");

        for(int i=0;i<list.size();i++){
            System.out.println(list.get(i).date);
        }

        System.out.println("end");

    }

    @Test
    public void bptest(){
//        ArrayList<PyTradeData> list=stockDataMapper.getPyTrade("sh601898");
//
//        System.out.println(JSON.toJSON(list.get(0)));

    }
}
