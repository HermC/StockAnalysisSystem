package web.service.stock_presentation;

import web.vo.before.StockInsTextVO;

/**
 * Created by zcj on 16/5/7.
 * 股票投资指导接口,提供文字以及建模分析
 *
 */
public interface InstructionTextService {

    /**
     * 股票文字分析
     * @return 文字分析+
     */
    public StockInsTextVO getStockAnalysis(String id) throws Exception;





}
