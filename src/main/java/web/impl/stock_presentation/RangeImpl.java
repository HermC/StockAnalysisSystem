package web.impl.stock_presentation;

import org.springframework.stereotype.Service;
import web.dao.DailyRangeMapper;
import web.pojo.before.StockRange;
import web.service.stock_presentation.RangeService;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/15.
 */
@Service("rangeImpl")
public class RangeImpl implements RangeService{

    @Resource
    private DailyRangeMapper dailyRangeMapper;

    @Override
    public ArrayList<StockRange> getStockRange() {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(30);
        ArrayList<StockRange> stockRanges = dailyRangeMapper.getRange(start.toString(),end.toString());
        ArrayList<StockRange> result = new ArrayList<>();
        for(int i=0;i<15;i++){
            result.add(stockRanges.get(14-i));
        }
        return result;
    }
}
