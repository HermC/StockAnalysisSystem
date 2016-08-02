package web.daoTest;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.service.stock_presentation.StockComparisionService;
import web.vo.before.StockComparison;

import javax.annotation.Resource;

/**
 * Created by Hermit on 16/5/26.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class StockComparisionTest {
    private static Logger logger = Logger.getLogger(StockComparison.class);

    @Resource
    StockComparisionService stockComparisionService;

    @Test
    public void test() {
        StockComparison stockComparison = stockComparisionService.getStockComparsion("sh600007");
        System.out.println(stockComparison.id+stockComparison.getForecastData());
    }
}
