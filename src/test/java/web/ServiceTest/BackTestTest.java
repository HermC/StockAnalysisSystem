package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.after.BackTestResultPo;
import web.service.BackTestBL.BackTestService;

import javax.annotation.Resource;

/**
 * Created by linyufan on 16/9/8.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class BackTestTest {
    @Resource
    BackTestService backTestService;
    @Test
    public void test(){
        BackTestResultPo backTestResultPo = backTestService.runPythonBackTest("12","2","2016-01-20","2016-09-06");
        System.out.println(JSON.toJSON(backTestResultPo));

    }
}
