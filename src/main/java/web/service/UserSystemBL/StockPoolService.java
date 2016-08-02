package web.service.UserSystemBL;

import web.pojo.after.StockPool;
import web.pojo.enumPo.AddState;
import web.pojo.enumPo.DeleteState;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/7/22.
 */

//股票池增删改查
public interface StockPoolService {

    public AddState addPool(ArrayList<String> stocklist);

    public StockPool selectPool(String poolid);

    public StockPool updatePool(StockPool stockPool);

    public DeleteState deletePool(String poolid);


}
