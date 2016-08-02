package web.impl.stock_presentation;

import org.springframework.stereotype.Service;
import web.dao.StockFavouriteMapper;
import web.pojo.before.FavouriteStock;
import web.service.stock_presentation.FavouriteStockService;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by linyufan on 16/5/28.
 */
@Service("favouriteStockImpl")
public class FavouriteStockImpl implements FavouriteStockService {
    @Resource
    private StockFavouriteMapper stockFavouriteMapper;
    @Override
    public ArrayList<FavouriteStock> getFavourite(ArrayList<String> idlist) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(7);
//        ArrayList<FavouriteStock> favouriteStocks = new ArrayList<>();
//        favouriteStocks = stockFavouriteMapper.getBenchFavourite(start.toString(),end.toString());
//        ArrayList<String> temoidlist = new ArrayList<>();
//        for (int i = 1; i<idlist.size();i++) {
//            temoidlist.add(idlist.get(i));
//        }
        Map map = new HashMap<>();
        map.put("idlist" , idlist);
        map.put("startdate" ,start.toString());
        map.put("enddate" , end.toString());
        ArrayList<FavouriteStock> favouriteStocks = stockFavouriteMapper.getFavourite(map);
//        for(FavouriteStock favouriteStock:tempfavourite) {
//            favouriteStocks.add(favouriteStock);
//        }
       return favouriteStocks;
    }
}
