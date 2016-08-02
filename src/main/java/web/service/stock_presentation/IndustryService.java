package web.service.stock_presentation;

import web.pojo.before.Industry;

import java.util.ArrayList;

/**
 * 行业分析排名及股票雷达图
 * Created by zcj on 16/5/8.
 */
public interface IndustryService {

    /**
     * 行业分析以及热门行业推荐
     * @return
     */
    public ArrayList<Industry> getIndustryAnalysis();

}
