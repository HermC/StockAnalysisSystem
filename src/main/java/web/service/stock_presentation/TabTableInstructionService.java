package web.service.stock_presentation;

import web.pojo.before.TabTablesData;
import web.vo.before.TabTableInsVO;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/21.
 * 标签式图表,图示分析
 * kdj rsi boll
 */
public interface TabTableInstructionService {

    /**
     * 获取标签式图表的解析
     *
     */
    public ArrayList<TabTableInsVO> getTablesInfo(ArrayList<TabTablesData> list);
}
