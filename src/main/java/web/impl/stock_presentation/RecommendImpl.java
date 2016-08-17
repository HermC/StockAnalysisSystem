package web.impl.stock_presentation;

import org.springframework.stereotype.Service;
import web.dao.stock_presentation.StockDataMapper;
import web.pojo.before.SingleInfo;
import web.service.stock_presentation.RecommendService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/9.
 */
@Service("recommendService")
public class RecommendImpl implements RecommendService {


    @Resource
    private StockDataMapper stockDataMapper;

    @Override
    public ArrayList<SingleInfo> getStopRecommend() {

        ArrayList<SingleInfo> result = stockDataMapper.getStopRecommend();
        return result;

    }

    @Override
    public ArrayList<SingleInfo> getKDJRecommend() {

        ArrayList<SingleInfo> result = stockDataMapper.getKDJRecommend();
        return result;

    }

    @Override
    public ArrayList<SingleInfo> getRSIRecommend() {

        ArrayList<SingleInfo> result = stockDataMapper.getRSIRecommend();
        return result;

    }

    @Override
    public ArrayList<SingleInfo> getBOLLRecommend() {
        ArrayList<SingleInfo> result = stockDataMapper.getBOLLRecommend();
        return result;
    }
}
