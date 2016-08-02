package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.before.FavouriteStock;
import web.service.stock_presentation.FavouriteStockService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/28.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class StockFavouriteTest {
    @Resource
    private FavouriteStockService favouriteStockService;

    @Test
    public void test(){
        ArrayList<String> idlist = new ArrayList<>();
        idlist.add("sh600000");
        idlist.add("sh600004");
        idlist.add("sh600007");
//        idlist.add("sh4");

        ArrayList<FavouriteStock> result = favouriteStockService.getFavourite(idlist);

        for (int i = 0;i<result.size();i++){
            System.out.println(JSON.toJSON(result.get(i)));
        }
    }
}
