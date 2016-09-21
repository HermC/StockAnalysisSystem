package web.impl.UserSystemBL;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import web.dao.UserSystem.StockPoolMapper;
import web.pojo.after.StockPool;
import web.pojo.enumPo.AddState;
import web.pojo.enumPo.DeleteState;
import web.pojo.enumPo.UpdateState;
import web.service.UserSystemBL.StockPoolService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by linyufan on 16/8/17.
 */
@Service("stockPoolImpl")
public class StockPoolImpl implements StockPoolService {
    @Resource
    StockPoolMapper stockPoolMapper;

    @Override
    public String addPool(String userid,ArrayList<String> stocklist,String poolname) {
//        stockPoolMapper.addStocklist(poolid,stocklist);
        stockPoolMapper.addpool(userid,poolname);
        String poolid =stockPoolMapper.getpoolidByname(userid,poolname);

        String listname = "stockpool_"+poolid;
        stockPoolMapper.addStocklist(listname);
        for (int i=0;i<stocklist.size();i++) {
            stockPoolMapper.addintoStocklist(listname,stocklist.get(i));
        }
        return poolid;
    }

    @Override
    public DeleteState deletePool(String userid, String poolid) {
        stockPoolMapper.deletePool(userid,poolid);
        String listname = "stockpool_"+poolid;
        stockPoolMapper.droptable(listname);
        return DeleteState.删除成功;
    }

    @Override
    public UpdateState addToPool(String userid, String poolid, ArrayList<String>  stockid) {
        String listname = "stockpool_"+poolid;
        for(int i=0;i<stockid.size();i++) {
            stockPoolMapper.addtopool(listname, stockid.get(i));
        }
        return UpdateState.修改成功;
    }

    @Override
    public DeleteState deleteFromPool(String userid, String poolid,ArrayList<String>  stockid) {
        String listname = "stockpool_"+poolid;
        for(int i=0;i<stockid.size();i++) {
            stockPoolMapper.deletefrompool(listname, stockid.get(i));
        }
        return DeleteState.删除成功;
    }

    @Override
    public ArrayList<StockPool> getAllPool(String userid) {
        ArrayList<StockPool> stockPools = stockPoolMapper.getAllPool(userid);
        for (StockPool stockPool:stockPools){
            String temp = "stockpool_"+stockPool.poolId;
            stockPool.setStockinfolist(stockPoolMapper.getStockinfo(temp));
            stockPool.setVtradelist(stockPoolMapper.getVtrade(stockPool.poolId));

        }

        return stockPools;
    }

    @Override
    public UpdateState updatename(String userid, String stockpoolid, String stockpoolname) {
        stockPoolMapper.updatename(userid,stockpoolid,stockpoolname);
        return UpdateState.修改成功;
    }
}