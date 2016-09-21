package web.Tools.backtesting;

import com.alibaba.fastjson.JSON;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.impl.BackTestBL.BackTestImpl;
import web.pojo.after.BackTestResultPo;
import web.service.BackTestBL.BackTestService;

import javax.annotation.Resource;

/**
 * Created by linyufan on 16/9/9.
 */

public class BackTestingTest {
//    @Resource
//    BackTestService backTestService;

//    @Test
    public static void  main(String[] args){


//        try {
////            BackTesting backTesting = new BackTesting(100, 3, "2011-01-01", "2014-01-01");
//
//
//        } catch (ClassNotFoundException e) {
//            e.printStackTrace();
//        }
        BackTestService backTestService = new BackTestImpl();

        BackTestResultPo backTestResultPo = backTestService.runPythonBackTest("100","2", "2011-01-01", "2014-01-01");

        System.out.println(JSON.toJSON(backTestResultPo));


    }
}
