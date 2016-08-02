package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.before.Industry;
import web.service.stock_presentation.IndustryService;

import java.util.ArrayList;

/**
 * Created by yqq on 2016.5.26.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class IndustryImplTest {

    private static Logger logger = Logger.getLogger(IndustryImplTest.class);

    @Autowired
    private IndustryService industryService;

    @Test
    public void test1() {
        ArrayList<Industry> tabTablesDatas = industryService.getIndustryAnalysis();
        for(Industry temp:tabTablesDatas){
            System.out.println(JSON.toJSONString(temp.getStockGradeVOs()));
        }
        logger.info(JSON.toJSONString(tabTablesDatas));
    }
}
