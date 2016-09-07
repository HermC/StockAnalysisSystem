package web.dao.UserSystem;

import org.apache.ibatis.annotations.Param;
import org.apache.maven.plugins.annotations.Parameter;
import org.springframework.stereotype.Repository;
import web.pojo.after.SingleStockPo;
import web.pojo.after.StockPool;
import web.pojo.after.VirtualTradePo;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created by linyufan on 16/8/31.
 */
@Repository
public interface StockPoolMapper {

    //1
    public void addpool(String userid , String poolname);

    public String getpoolidByname(String userid ,String poolname);

    public void addStocklist(@Param("listname") String listname);

//    public void addintoStocklist(Map map);

    public void addintoStocklist(@Param("listname")String listname ,@Param("id")String stockid);


    //2
    public void deletePool(@Param("uid")String uid,@Param("poolid")String poolid);

    public void droptable(@Param("listname")String listname);

    //3
    public void addtopool(@Param("listname")String listname , @Param("stockid")String stockid);

    //4
    public void deletefrompool(@Param("listname")String listname ,@Param("stockid")String stockid);

    //5
    public ArrayList<StockPool> getAllPool(String userid);

    public ArrayList<SingleStockPo> getStockinfo(@Param(("listname")) String listname);

    public ArrayList<VirtualTradePo> getVtrade(String poolid);

    //6
    public void updatename(String userid,String stockpoolid,String stockpoolname);


}
