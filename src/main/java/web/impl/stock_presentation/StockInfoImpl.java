package web.impl.stock_presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.dao.StockInfoMapper;
import web.pojo.before.StockInfo;
import web.pojo.before.StockSeason;
import web.service.stock_presentation.StockInfoService;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/26.
 */

@Service("StockInfoImpl")
public class StockInfoImpl implements StockInfoService {
    @Autowired
    private StockInfoMapper stockInfoMapper;
    @Override
    public StockInfo getStockInfo(String id) {
        StockInfo stockInfo = stockInfoMapper.getStockInfo(id);
        return stockInfo;
    }

    @Override
    public ArrayList<StockSeason> getStockSeason(String id) {
        return stockInfoMapper.getStockSeason(id);
    }
}
