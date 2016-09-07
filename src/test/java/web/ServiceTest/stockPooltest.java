package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.after.StockPool;
import web.service.UserSystemBL.StockPoolService;

import javax.annotation.Resource;
import javax.json.Json;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/8/31.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class stockPooltest {

    @Resource
    StockPoolService stockPoolService;
    @Test
    public void test1(){
        ArrayList<String> stocklist = new ArrayList<>();
        stocklist.add("sh600001");

        System.out.println(stockPoolService.addPool("2", stocklist,"wodeshujuku"));

    }

    @Test
    public void test2(){
        ArrayList<String> stocklist = new ArrayList<>();
        stocklist.add("sh600010");
//        stockPoolService.addToPool("2","23",stocklist);
        stockPoolService.deleteFromPool("2","23",stocklist);
    }

    @Test
    public void test3(){
        ArrayList<StockPool> stockPools = stockPoolService.getAllPool("2");
        for (StockPool stockPool:stockPools){
            System.out.println(JSON.toJSON(stockPool));
        }
    }

    @Test
    public void test4(){
        stockPoolService.updatename("2","23","yzy");
    }
}
