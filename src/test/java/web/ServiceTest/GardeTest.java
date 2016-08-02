package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.service.stock_presentation.GradeService;
import web.vo.before.StockGradeVO;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/13.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class GardeTest   {
    @Resource
    private GradeService gradeService;
    @Test
    public void test(){
        String id = "sh600000";
        StockGradeVO stockGradeVO = gradeService.getCurrentInfo(id);
        System.out.println(JSON.toJSON(stockGradeVO));
    }

    @Test
    public void test1(){
        ArrayList<StockGradeVO> list = gradeService.getGradeList();
        for(StockGradeVO stockGradeVO:list){
            System.out.println(JSON.toJSON(stockGradeVO));
        }
    }
}
