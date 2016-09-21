package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import jdk.nashorn.internal.ir.annotations.Reference;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.after.VirtualTradePo;
import web.service.BackTestBL.VirtualTradeService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/9/2.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class VirtualTradeTest {

    @Autowired
    VirtualTradeService virtualTradeService;

    @Test
    public void test1(){
        System.out.println(virtualTradeService.addtrade("1","qwerty",1000,"2017","11","23"));
    }

    @Test
    public void test2(){
        virtualTradeService.deletetrade("2","1");

    }

    @Test
    public void test3(){
        VirtualTradePo virtualTradePo = virtualTradeService.getTrade("1","2");
        System.out.println(JSON.toJSON(virtualTradePo));
    }

    @Test
    public void test4(){
        ArrayList<VirtualTradePo> list = virtualTradeService.getAllTrade("2");
        for(VirtualTradePo virtualTradePo:list){
            System.out.println(JSON.toJSON(virtualTradePo));
        }
    }

    @Test
    public void test5(){
//        VirtualTradePo virtualTradePo = virtualTradeService.stopVTrade("2","6");
        VirtualTradePo virtualTradePo = virtualTradeService.restartVTrade("2","6");
        System.out.println(JSON.toJSON(virtualTradePo));
    }
}
