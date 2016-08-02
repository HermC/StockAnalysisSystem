package web.dao;

import org.springframework.stereotype.Repository;
import web.pojo.before.StockInfo;
import web.pojo.before.StockSeason;

import java.util.ArrayList;

/**
 * Created by zcj on 16/5/8.
 * 返回公司相关信息
 */
@Repository
public interface StockInfoMapper {

    /**
     * 获取公司相关信息
     * @param id 公司id
     * @return
     */
    public StockInfo getStockInfo(String id);

    /**
     *
     * @param id
     * @return
     */
    public ArrayList<StockSeason> getStockSeason(String id);
}
