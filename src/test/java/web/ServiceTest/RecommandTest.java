package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.stock_presentation.StockDataMapper;
import web.pojo.before.SingleInfo;
import web.service.stock_presentation.RecommendService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/9.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class RecommandTest {
    @Resource
    private RecommendService recommendService;

    @Resource
    private StockDataMapper stockDataMapper;
    @Test
   public void stoptest(){
        ArrayList<SingleInfo> singleInfoArrayList =stockDataMapper.getStopRecommend();
        for(SingleInfo singleInfo:singleInfoArrayList){
            System.out.println((JSON.toJSON(singleInfo)));
        }
    }

    @Test
    public void kdjtest(){
        ArrayList<SingleInfo> singleInfoArrayList = recommendService.getKDJRecommend();
        for(SingleInfo singleInfo:singleInfoArrayList){
            System.out.println((JSON.toJSON(singleInfo)));
        }
    }

    @Test
    public void rsitest(){
        ArrayList<SingleInfo> singleInfoArrayList = recommendService.getRSIRecommend();
        for(SingleInfo singleInfo:singleInfoArrayList){
            System.out.println((JSON.toJSON(singleInfo)));
        }
    }

    @Test
    public void bolltest(){
        ArrayList<SingleInfo> singleInfoArrayList = recommendService.getBOLLRecommend();
        for(SingleInfo singleInfo:singleInfoArrayList){
            System.out.println((JSON.toJSON(singleInfo)));
        }
    }

}
