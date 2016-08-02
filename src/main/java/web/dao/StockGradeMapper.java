package web.dao;

import org.springframework.stereotype.Repository;
import web.vo.before.GradeStatistics;
import web.vo.before.StockGradeVO;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/24.
 */
@Repository
public interface StockGradeMapper {
    public StockGradeVO getStockGrade(String id);

    public ArrayList<GradeStatistics> getStatistic(String id , String start,String end);

    public ArrayList<StockGradeVO> getStockGradeList();
}
