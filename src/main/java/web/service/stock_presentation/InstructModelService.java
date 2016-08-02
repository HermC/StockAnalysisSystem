package web.service.stock_presentation;

import web.vo.before.StockInsModelVO;

/**
 * Created by yqq on 2016.5.11.
 * 股票模型分析
 * 之后与大盘相关性分析也可以放在这里
 */
public interface InstructModelService {
    /**
     * 股票模型分析
     * @param id
     * @return
     */
    public StockInsModelVO getModelAnalysis(String id);
}
