package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.daoTest.StockDataMapperTest;
import web.pojo.before.StockInfo;
import web.pojo.before.StockSeason;
import web.service.stock_presentation.StockInfoService;

import java.util.ArrayList;

/**
 * Created by yqq on 2016.5.16.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class StockInfoTest {
    private static Logger logger = Logger.getLogger(StockDataMapperTest.class);

    @Autowired
    private StockInfoService stockInfoService;

    @Test
    public void test() {
        StockInfo stockInfo = stockInfoService.getStockInfo("sh600000");

        logger.info(JSON.toJSONString(stockInfo));
    }

    @Test
    public void test1(){
        ArrayList<StockSeason> stockSeason = stockInfoService.getStockSeason("sh600000");

        System.out.println(JSON.toJSON(stockSeason));
    }
}
