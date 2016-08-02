package web.daoTest;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.StockGradeMapper;
import web.service.stock_presentation.GradeService;
import web.vo.before.StockGradeVO;

import javax.annotation.Resource;
import java.time.LocalDate;

/**
 * Created by linyufan on 16/5/24.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class StockGradeMapperTest {
    private static Logger logger = Logger.getLogger(StockGradeMapperTest.class);

    @Autowired
    private StockGradeMapper stockMapper;

    @Resource
    GradeService gradeService;

    @Test
    public void test(){
        StockGradeVO stockGradeVO = stockMapper.getStockGrade("sh600000");
        System.out.println(stockGradeVO.id);
        System.out.println(stockGradeVO.pbAssess);
    }

    @Test
    public void test1(){
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(7);
//        GradeService gradeService = new GradeImpl();
        String id = "sh600000";
//        StockGradeVO stockGradeVO = stockMapper.getStockGrade("sh600000");
        StockGradeVO stockGradeVO = gradeService.getCurrentInfo("sh600004");
//        StockGradeVO stockGradeVO = gradeService.getCurrentInfo("sh600002");
//        ArrayList<GradeStatistics> gradeStatisticses = stockMapper.getStatistic("sh600000",start.toString(),end.toString());
//        System.out.println(gradeStatisticses.get(0).committee);
        for (int i = 0 ;i< stockGradeVO.statisticses.size();i++) {
            System.out.println(stockGradeVO.statisticses.get(i).date);
            System.out.println(stockGradeVO.statisticses.get(i).name);
            System.out.println(stockGradeVO.statisticses.get(i).committee);
            System.out.println(stockGradeVO.statisticses.get(i).deviation);
            System.out.println(stockGradeVO.statisticses.get(i).pb);
            System.out.println(stockGradeVO.statisticses.get(i).pe);
            System.out.println(stockGradeVO.statisticses.get(i).quantity);
            System.out.println();
        }
//        System.out.println(stockGradeVO1.statisticses.size());
    }

}
