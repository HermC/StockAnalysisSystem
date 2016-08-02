package web.impl.stock_presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.dao.StockGradeMapper;
import web.service.stock_presentation.GradeService;
import web.vo.before.StockGradeVO;

import java.time.LocalDate;
import java.util.*;

/**
 * Created by yqq on 2016.5.11.
 * 一周内股票表现评分
 * 短线数据分析,评估热门程度,便于股民短线套利
 *
 */
@Service("gradeService")
public class GradeImpl implements GradeService{
    @Autowired
    StockGradeMapper stockGradeMapper;

    @Override
    public StockGradeVO getCurrentInfo(String id) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(14);
//        System.out.println(id);
//        System.out.println(end);

        StockGradeVO stockGradeVO = stockGradeMapper.getStockGrade(id);
        stockGradeVO.statisticses = stockGradeMapper.getStatistic(id , start.toString(), end.toString());
      //wozhizhangle
        if(stockGradeVO.statisticses.size()==0){
            stockGradeVO.name = "";
        }else{
            stockGradeVO.name = stockGradeVO.statisticses.get(0).name;
        }
        return stockGradeVO;
    }

    @Override
    public ArrayList<StockGradeVO> getGradeList() {
        ArrayList<StockGradeVO> list = stockGradeMapper.getStockGradeList();
        Collections.sort(list);
        return list;
    }

}
