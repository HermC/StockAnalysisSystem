package web.dao.stock_presentation;

import org.springframework.stereotype.Repository;
import web.pojo.before.Industry;
import web.pojo.before.IndustryInnerRank;
import web.vo.before.StockGradeVO;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/24.
 */
@Repository
public interface IndustryGradeMapper {

    public ArrayList<Industry> getIndustryAssess();

    public ArrayList<StockGradeVO> getStockGrade(String industryid);

    public ArrayList<IndustryInnerRank> getTurnoverRateRank(String industryid);

    public ArrayList<IndustryInnerRank> getDeviationRank(String industryid);

    public ArrayList<IndustryInnerRank> getPriceRank(String industryid);

}
