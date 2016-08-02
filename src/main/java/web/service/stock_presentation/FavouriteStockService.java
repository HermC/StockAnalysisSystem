package web.service.stock_presentation;

import web.pojo.before.FavouriteStock;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/28.
 */
public interface FavouriteStockService {

    public ArrayList<FavouriteStock> getFavourite(ArrayList<String> idlist);
}
