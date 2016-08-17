package web.dao.stock_presentation;

import org.springframework.stereotype.Repository;
import web.pojo.before.FavouriteStock;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created by linyufan on 16/5/28.
 */
@Repository
public interface StockFavouriteMapper {

    public ArrayList<FavouriteStock> getFavourite(Map map);

    public ArrayList<FavouriteStock> getBenchFavourite(String start ,String end);

//    public ArrayList<FavouriteStock>
}
