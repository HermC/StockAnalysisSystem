package web.impl.stock_presentation;

import org.springframework.stereotype.Service;
import web.dao.StockCurrentMapper;
import web.pojo.before.StockCurrent;
import web.service.stock_presentation.HistorySingleDayService;

import javax.annotation.Resource;
import java.time.LocalDate;

/**
 * Created by yqq on 2016.5.11.
 * 暂时没用
 */

@Service("historySingleDayService")
public class HistorySingleDayImpl implements HistorySingleDayService {
    @Resource
    StockCurrentMapper stockCurrentMapper;
    @Override
    public StockCurrent getHisCurrentInfo(String id, LocalDate date) {

        return stockCurrentMapper.getCurrentInfo(id, date);
    }
}
