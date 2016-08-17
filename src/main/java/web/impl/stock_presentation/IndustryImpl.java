package web.impl.stock_presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.dao.stock_presentation.IndustryGradeMapper;
import web.pojo.before.Industry;
import web.service.stock_presentation.IndustryService;

import java.util.ArrayList;

/**
 * Created by zcj on 16/5/8.
 */
@Service("industryService")
public class IndustryImpl implements IndustryService {

    @Autowired
    IndustryGradeMapper industryGradeMapper;

    @Override
    public ArrayList<Industry> getIndustryAnalysis() {
        ArrayList<Industry> result = industryGradeMapper.getIndustryAssess();

//        ArrayList<StockGradeVO> stockGradeVOs = new ArrayList<>();

        for (int i=0;i<result.size();i++){

            result.get(i).stockGradeVOs = (industryGradeMapper.getStockGrade(result.get(i).id));
            result.get(i).turnoverRank = industryGradeMapper.getTurnoverRateRank(result.get(i).id);
            result.get(i).deviationRank = industryGradeMapper.getDeviationRank(result.get(i).id);
            result.get(i).priceRank = industryGradeMapper.getPriceRank(result.get(i).id);
        }

       return result;
    }

}