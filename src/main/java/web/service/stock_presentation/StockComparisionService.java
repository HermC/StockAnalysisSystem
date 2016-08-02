package web.service.stock_presentation;

import web.vo.before.StockComparison;

/**
 * Created by linyufan on 16/5/26.
 */

public interface StockComparisionService {

    /**
     * 股票对比数据
     * @param id
     * @return
     */
    public StockComparison getStockComparsion(String id);
}
