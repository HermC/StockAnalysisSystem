package web.daoTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.BackTestBL.BackTestMapper;
import web.pojo.after.BackTestDailyResultPo;

import javax.annotation.Resource;
import javax.json.Json;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/9/7.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class BackTestTest {

    @Resource
    public BackTestMapper backTestMapper;

    @Test
    public void test1(){
        System.out.println( backTestMapper.getJson("2","2"));
        backTestMapper.setPython("2","2","qwerty");
    }

    @Test
    public void test2(){
        ArrayList<BackTestDailyResultPo> backTestDailyResultPos = backTestMapper.getResult("result_1");
        for(BackTestDailyResultPo backTestDailyResultPo:backTestDailyResultPos){
            System.out.println(JSON.toJSON(backTestDailyResultPo));
        }
    }

    @Test
    public void test3(){
        System.out.println(backTestMapper.getResultid("3","8"));
    }
}
