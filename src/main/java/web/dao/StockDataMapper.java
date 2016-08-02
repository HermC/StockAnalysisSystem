package web.dao;

import org.springframework.stereotype.Repository;
import web.pojo.before.*;

import java.util.ArrayList;

/**
 * Created by zxz on 16/5/15.
 * 返回股票相关信息
 */
@Repository
public interface StockDataMapper {
    public ArrayList<TabTablesData> getTabTablesData(String id, String start , String end);

    public ArrayList<TabTablesData> getBenchTabtable(String id ,String start ,String end);


//    ArrayList<CandleData> getCandleData(String id, String start , String end);
//
//
//
//    public ArrayList<Double> getPe(String id,int num);
//
//    public ArrayList<Double> getPb(String id,int num);
//
//    public ArrayList<Double> getVolume(String id,int num);
//
//    //暂时没有委比的数据，所以拿的是换手率
//    public ArrayList<Double> getWeibi(String id,int num);
//
//    public ArrayList<Double> getUpDown(String id,int num);


    public ArrayList<CandleData> getCandleData(String id, String start , String end);



    public ArrayList<ForecastData> getForecastData(String id, String start, String end);

    public PytradeDataPo getPyTrade(String id);

    public ArrayList<PyTradeData> getPyTradeList(String id);

    public ArrayList<ForecastData> getPyTradeForecast(String id,String start ,String end);

    public StockRelativeData getRelativeData(String id);


    public  ArrayList<SingleInfo> getStopRecommend();

    public  ArrayList<SingleInfo> getKDJRecommend();

    public  ArrayList<SingleInfo> getRSIRecommend();

    public  ArrayList<SingleInfo> getBOLLRecommend();


}