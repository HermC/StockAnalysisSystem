package web.impl.stock_presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.dao.StockDataMapper;
import web.pojo.before.StockRelativeData;
import web.service.stock_presentation.RelativeService;

/**
 * Created by Hermit on 16/5/29.
 */
@Service("relativeService")
public class RelativeImpl implements RelativeService {

    @Autowired
    StockDataMapper stockDataMapper;

    @Override
    public StockRelativeData getRelativeData(String id) {

        return stockDataMapper.getRelativeData(id);
    }
}
