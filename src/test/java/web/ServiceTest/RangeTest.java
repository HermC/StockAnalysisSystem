package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.before.StockRange;
import web.service.stock_presentation.RangeService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/15.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class RangeTest {
    @Resource
    private RangeService rangeService;

    @Test
    public void test(){
        ArrayList<StockRange> stockRanges = rangeService.getStockRange();
        System.out.println(stockRanges.size());
        for (StockRange stockRange:stockRanges){
            System.out.println(JSON.toJSON(stockRange));
        }
    }
}
