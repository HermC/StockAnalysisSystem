package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.before.PyTradeData;
import web.service.stock_presentation.ForecastDataService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/5.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class PytradeTest {

    @Resource
    private ForecastDataService forecastDataService;

    @Test
    public void test(){
        ArrayList<PyTradeData> list = forecastDataService.getPyTradeList("sh600000");
        for (PyTradeData pyTradeData : list){
            System.out.println(JSON.toJSON(pyTradeData));
        }
    }
}
