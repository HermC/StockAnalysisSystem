package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.before.StockRelativeData;
import web.service.stock_presentation.RelativeService;

import javax.annotation.Resource;

/**
 * Created by linyufan on 16/6/3.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class RelativeImplTest {

    @Resource
    private RelativeService relativeService;

    @Test
    public void relativeTest(){
        StockRelativeData stockRelativeData = relativeService.getRelativeData("sh600000");
        System.out.println(JSON.toJSON(stockRelativeData));
    }
}
