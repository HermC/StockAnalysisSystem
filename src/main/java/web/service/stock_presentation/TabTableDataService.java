package web.service.stock_presentation;

import web.pojo.before.TabTablesData;

import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by yqq on 2016.5.15.
 */
public interface TabTableDataService {

    public ArrayList<TabTablesData> getTablesInfo(String id, LocalDate begin, LocalDate end);
}
