package web.daoTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.StockFavouriteMapper;
import web.pojo.before.FavouriteStock;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by linyufan on 16/6/2.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class StockFavouriteMapperTest {
    @Resource
    private StockFavouriteMapper stockFavouriteMapper;

    @Test
    public void favouriteTest(){
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(7);
        ArrayList<String> idlist = new ArrayList<>();
        idlist.add("sh600000");
        idlist.add("sh600004");
        Map map = new HashMap<>();
        map.put("idlist" , idlist);
        map.put("startdate" ,start.toString());
        map.put("enddate" , end.toString());
        ArrayList<FavouriteStock> favouriteStocks = stockFavouriteMapper.getFavourite(map);
        for(FavouriteStock favouriteStock:favouriteStocks){
            System.out.println(JSON.toJSON(favouriteStock));
        }

//        ArrayList<FavouriteStock> stocks = stockFavouriteMapper.getBenchFavourite(start.toString(),end.toString());
//        for(FavouriteStock stock:stocks){
//            System.out.println(JSON.toJSON(stock));
//        }
    }
}
