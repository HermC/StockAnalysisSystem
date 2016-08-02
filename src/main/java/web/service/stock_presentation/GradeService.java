package web.service.stock_presentation;

import web.vo.before.StockGradeVO;

import java.util.ArrayList;

/**
 * Created by yqq on 2016.5.11.
 */
public interface GradeService {

    /**
     *
     * @param id 股票ID
     * @return  股票各项评分
     */
    public StockGradeVO getCurrentInfo(String id);


    public ArrayList<StockGradeVO> getGradeList();
}
