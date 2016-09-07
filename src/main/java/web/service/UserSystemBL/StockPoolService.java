package web.service.UserSystemBL;

import web.pojo.after.StockPool;
import web.pojo.enumPo.AddState;
import web.pojo.enumPo.DeleteState;
import web.pojo.enumPo.UpdateState;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/7/22.
 */

//股票池增删改查
public interface StockPoolService {



    public String addPool(String userid,ArrayList<String> stocklist,String poolname);

//    public StockPool selectPool(String poolid);

    public DeleteState deletePool(String userid , String poolid);

    public UpdateState addToPool(String userid , String poolid , ArrayList<String> stockid);

    public DeleteState deleteFromPool(String userid , String poolid , ArrayList<String>  stockid);


    public ArrayList<StockPool> getAllPool(String userid);

    public UpdateState updatename(String userid,String stockpoolid,String stockpoolname);
}
