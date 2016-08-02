package web.daoTest;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.before.StockRelativeData;
import web.service.stock_presentation.RelativeService;

import javax.annotation.Resource;

/**
 * Created by Hermit on 16/5/29.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class RelativeDataTest {
    private static Logger logger = Logger.getLogger(ForecastDataTest.class);

    @Resource
    RelativeService relativeService;

    @Test
    public void test() {
        StockRelativeData stockRelativeData = relativeService.getRelativeData("sh600000");
        System.out.println(stockRelativeData.stockid+" "+stockRelativeData.devia_corrcoef);
    }
}
