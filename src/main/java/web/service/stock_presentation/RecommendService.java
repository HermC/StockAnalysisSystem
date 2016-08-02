package web.service.stock_presentation;

import web.pojo.before.SingleInfo;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/9.
 */
public interface RecommendService {

    public ArrayList<SingleInfo> getStopRecommend();


    public ArrayList<SingleInfo> getKDJRecommend();

    public ArrayList<SingleInfo> getRSIRecommend();

    public ArrayList<SingleInfo> getBOLLRecommend();
}
