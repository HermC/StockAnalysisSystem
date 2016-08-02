package web.service.stock_presentation;

import web.vo.before.DetailStrategyVO;

/**
 * Created by zcj on 16/5/8.
 * 后期优化
 * 股票详细投资策略
 */
public interface DetailStrategyService {

    public DetailStrategyVO getDetailStrategy(String id);

    /**
     * 黎明之星
     */
    public boolean isDawnStar(String id);

    /**
     * 黄昏之星
     * @return
     */
    public boolean isDuskStar(String id);

    /**
     * 射击之星
     * @return
     */
    public boolean isShutStar(String id);

    /**
     * 吊颈
     * @return
     */
    public boolean isHangOn(String id);

    /**
     * 怀孕
     * @return
     */
    public boolean isPregnant(String id);

    /**
     * 乌云
     * @return
     */
    public boolean isDarkCloud(String id);

    /**
     * 曙光
     * @return
     */
    public boolean isDawnLight(String id);

    /**
     * 红三兵
     * @return
     */
    public boolean isRedSolder(String id);

}
