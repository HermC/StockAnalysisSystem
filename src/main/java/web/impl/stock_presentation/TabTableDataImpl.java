package web.impl.stock_presentation;

import org.springframework.stereotype.Service;
import web.dao.stock_presentation.StockDataMapper;
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
    if (id.equals("399300") || id.equals("399001") || id.equals("000001"))
            return stockDataMapper.getBenchTabtable(id, begin.toString(),end.toString());
        else
            return stockDataMapper.getTabTablesData(id, begin.toString(),end.toString());
    }
}
