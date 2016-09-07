package web.daoTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.UserSystem.StockPoolMapper;
import web.pojo.after.SingleStockPo;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by linyufan on 16/8/31.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class StockPoolTest {
    @Resource
    StockPoolMapper stockPoolMapper;
    @Test
    public void test(){
        Map stockmap = new HashMap<>();
        ArrayList<String> stocklist = new ArrayList<>();
        stocklist.add("sh600001");
        String listname = "stockpool_19";
//        System.out.println(listname);
        stockmap.put("listname" ,listname);
        stockmap.put("idlist" ,stocklist);
//        stockPoolMapper.addStocklist(listname);
        for (int i=0;i<stocklist.size();i++) {
            stockPoolMapper.addintoStocklist(listname,stocklist.get(i));
        }
    }

    @Test
    public void test1(){
//         stockPoolMapper.deletePool("2","22");
        stockPoolMapper.droptable("stockpool_19");
    }

    @Test
    public void test2(){
      ArrayList<SingleStockPo> singleStockPos=  stockPoolMapper.getStockinfo("stockpool_22");
        for (SingleStockPo singleStockPo:singleStockPos){
            System.out.println(JSON.toJSON(singleStockPo));
        }
    }


}
