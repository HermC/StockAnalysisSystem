package web.daoTest;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.stock_presentation.StockInfoMapper;
import web.pojo.before.StockInfo;
import web.pojo.before.StockSeason;
import web.service.stock_presentation.StockInfoService;

import javax.annotation.Resource;
import java.util.ArrayList;


/**
 * Created by yqq on 2016.5.16.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class StockInfoMapperTest {
    private static Logger logger = Logger.getLogger(StockDataMapperTest.class);

    @Autowired
    private StockInfoMapper stockInfoMapper;

    @Resource
    private StockInfoService stockInfoService;

    @Test
    public void test() {
            StockInfo stockInfo = stockInfoMapper.getStockInfo("sh600000");

            logger.info(JSON.toJSONString(stockInfo));


        ArrayList<StockSeason> stockSeasons = stockInfoService.getStockSeason("sh600000");

        for(int i=0;i<stockSeasons.size();i++){
            System.out.println(stockSeasons.get(i).date);
        }
    }
}
