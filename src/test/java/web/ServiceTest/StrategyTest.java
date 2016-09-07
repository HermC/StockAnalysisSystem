package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.after.StrategyPo;
import web.service.BackTestBL.StrategyService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/9/2.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class StrategyTest {
    @Resource
    StrategyService strategyService;

//    @Test
//    public void test1(){
//        System.out.println(strategyService.addStrategy("2","张思动","123","456"));
//    }

//    @Test
//    public void test2(){
//        strategyService.updateStrategyName("2","7","yzy");
////        strategyService.updateStrategyJson("2","3","yzy");
////        strategyService.updateStrategyPython("2","3","yzy");
////        strategyService.deleteStrategy("2","3");
//    }

    @Test
    public void test3(){
       StrategyPo strategyPo = strategyService.selectStrategy("2","3");
        System.out.println(JSON.toJSON(strategyPo));
    }

//    @Test
//    public void test4(){
//        ArrayList<StrategyPo> temp = strategyService.getAllStategy("2");
//        for (StrategyPo tempS:temp){
//            System.out.println(JSON.toJSON(tempS));
//        }
//    }
}

