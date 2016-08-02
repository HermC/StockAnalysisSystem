package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.before.ForecastData;
import web.pojo.before.PyTradeData;
import web.service.stock_presentation.ForecastDataService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/2.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class ForecastTest {
    @Resource
    private ForecastDataService forecastDataimpl;

//    @Test
//    public void favouriteTest(){
////        ForecastData forecastData = forecastDataimpl.getForecastData("sh600000");
//        ArrayList<PyTradeData> pyTradeData = forecastDataimpl.getPyTrade("sh600000");
////        System.out.println(JSON.toJSON(forecastData));
//        System.out.println(JSON.toJSON(pyTradeData.get(0)));
//    }

    @Test
    public void test(){
        ArrayList<ForecastData> list = forecastDataimpl.getPyTradeForecast("sz002644");
        for (ForecastData forecastData:list){
            System.out.println(JSON.toJSON(forecastData));
        }
    }
}
