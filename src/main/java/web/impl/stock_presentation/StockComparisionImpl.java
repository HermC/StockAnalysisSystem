package web.impl.stock_presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.dao.StockGradeMapper;
import web.service.stock_presentation.ForecastDataService;
import web.service.stock_presentation.StockComparisionService;
import web.service.stock_presentation.TabTableDataService;
import web.vo.before.StockComparison;
import web.vo.before.StockGradeVO;

import javax.annotation.Resource;
import java.time.LocalDate;

/**
 * Created by linyufan on 16/5/26.
 */
@Service("stockComparisionService")
public class StockComparisionImpl implements StockComparisionService {
    @Autowired
    StockGradeMapper stockGradeMapper;

    @Resource
    private ForecastDataService forecastDataService;
    @Resource
    private TabTableDataService tabTableDataService;

    @Override
    public StockComparison getStockComparsion(String id) {
        StockComparison stockComparison = new StockComparison();
        stockComparison.id = id;
        stockComparison.forecastData = forecastDataService.getForecastData(id);

        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(14);
        StockGradeVO stockGradeVO = stockGradeMapper.getStockGrade(id);
        stockGradeVO.statisticses = stockGradeMapper.getStatistic(id , start.toString(), end.toString());
        //wozhizhangle
        if (stockGradeVO.statisticses.size() !=0) {
            stockComparison.name = stockGradeVO.statisticses.get(0).name;
        }
        stockComparison.stockGradeVO = stockGradeVO;

        stockComparison.tabTablesDatas = tabTableDataService.getTablesInfo(id,start, end);

        return stockComparison;
    }
}
