package web.impl.stock_presentation;

import org.springframework.stereotype.Service;
import web.dao.StockDataMapper;
import web.pojo.before.TabTablesData;
import web.service.stock_presentation.TabTableDataService;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by yqq on 2016.5.15.
 */

@Service("TabTableDataImpl")
public class TabTableDataImpl implements TabTableDataService {
    @Resource
    StockDataMapper stockDataMapper;

    @Override
    public ArrayList<TabTablesData> getTablesInfo(String id, LocalDate begin, LocalDate end) {
    if (id.equals("hs300") || id.equals("sz399001") || id.equals("sh000001"))
            return stockDataMapper.getBenchTabtable(id, begin.toString(),end.toString());
        else
            return stockDataMapper.getTabTablesData(id, begin.toString(),end.toString());
    }
}
