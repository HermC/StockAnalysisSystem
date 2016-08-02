package web.ServiceTest;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.IndustryGradeMapper;
import web.impl.stock_presentation.IndustryImpl;
import web.pojo.before.Industry;
import web.service.stock_presentation.IndustryService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/26.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class IndustryTest {
    private static Logger logger = Logger.getLogger(IndustryImpl.class);

    @Resource
    private IndustryService industryService;
    @Resource
    private IndustryGradeMapper industryGradeMapper;
    @Test
    public void test(){
        ArrayList<Industry> industry = industryService.getIndustryAnalysis();
//        for(int i = 0;i<56;i++) {
//            System.out.println(industry.get(i).stockGradeVOs.size());
//        }
////        ArrayList<Industry> industry = industryGradeMapper.getIndustryAssess();
//        System.out.println(industry.get(0).id);
//        for (int i = 0;i<industry.get(0).stockGradeVOs.size();i++) {
//            System.out.println(industry.get(0).stockGradeVOs.get(i).name);
//        }
//        ArrayList<StockGradeVO> stockGradeVOs = industryGradeMapper.getStockGrade(industry.get(0).id);
//
//        System.out.println(stockGradeVOs.size());
//        System.out.println(JSON.toJSONString(stockGradeVOs.get(0)));


//        for (int i = 0;i<industry.get(33).turnoverRank.size();i++) {
//            System.out.println(industry.get(33).turnoverRank.get(i).name);
//            System.out.println(industry.get(33).turnoverRank.get(i).turnoverRate);
//            System.out.println();
//
//        }

        for (int i = 0;i<industry.get(33).deviationRank.size();i++) {
            System.out.println(industry.get(33).deviationRank.get(i).name);
            System.out.println(industry.get(33).deviationRank.get(i).deviation);
            System.out.println();

        }
    }

}
