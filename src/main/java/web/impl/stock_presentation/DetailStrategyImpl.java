package web.impl.stock_presentation;

import org.springframework.stereotype.Service;
import web.dao.StockDataMapper;
import web.pojo.before.TabTablesData;
import web.service.stock_presentation.DetailStrategyService;
import web.vo.before.DetailStrategyVO;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by zcj on 16/5/8.
 */
@Service("detailStrategyService")
public class DetailStrategyImpl implements DetailStrategyService{

    @Resource
    private StockDataMapper stockDataMapper;

    //参数 星星0.3%  涨势15% 阳线 2.5%
    //A类现象上涨,B类现象下跌

    //构造函数可能会用到
//    private ArrayList<TabTablesData> datas;
//
//    public DetailStrategyImpl(String id){
//        LocalDate end = LocalDate.now();
//        LocalDate start = end.minusDays(15);
//        this.datas = stockDataMapper.getTabTablesData(id , start.toString() ,end.toString());
//    }

    @Override
    public DetailStrategyVO getDetailStrategy(String id) {
        DetailStrategyVO detailStrategyVO = new DetailStrategyVO();
        detailStrategyVO.DawnStarBL = this.isDawnStar(id);
        detailStrategyVO.DuskStarBL = this.isDuskStar(id);
        detailStrategyVO.ShutStarBL = this.isShutStar(id);
        detailStrategyVO.HangOnBL = this.isHangOn(id);
        detailStrategyVO.PregnantBL = this.isPregnant(id);
        detailStrategyVO.DarkCloudeBL = this.isDarkCloud(id);
        detailStrategyVO.DawnLightBL = this.isDawnLight(id);
        detailStrategyVO.RedSolderBL = this.isRedSolder(id);
        return detailStrategyVO;
    }

    //A
    @Override
    public boolean isDawnStar(String id) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(15);
        ArrayList<TabTablesData> datas = stockDataMapper.getTabTablesData(id , start.toString() ,end.toString());
        int result = this.inUp(datas);
        if(result == -1){
            TabTablesData tempTabtableData = datas.get(datas.size()-3);
            double deviation = (tempTabtableData.open - tempTabtableData.close)/tempTabtableData.open;
            if(deviation > -0.02)
                return false;
            deviation = (tempTabtableData.open - tempTabtableData.close)/tempTabtableData.open;
            if(Math.abs(deviation) >= 0.003 )
                return false;
            deviation = (tempTabtableData.open - tempTabtableData.close)/tempTabtableData.open;
            if(deviation < 0.02)
                return false;
            else
                return true;

        }
        else
            return false;
    }


    //B
    @Override
    public boolean isDuskStar(String id) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(15);
        ArrayList<TabTablesData> datas = stockDataMapper.getTabTablesData(id , start.toString() ,end.toString());
        int result = this.inUp(datas);
        if(result == 1){
            TabTablesData tempTabtableData = datas.get(datas.size()-3);
            double deviation = (tempTabtableData.open - tempTabtableData.close)/tempTabtableData.open;
            if(deviation < 0.02)
                return false;
            deviation = (tempTabtableData.open - tempTabtableData.close)/tempTabtableData.open;
            if(Math.abs(deviation) >= 0.003 )
                return false;
            deviation = (tempTabtableData.open - tempTabtableData.close)/tempTabtableData.open;
            if(deviation > -0.02)
                return false;
            else
                return true;

        }
        else {
            return false;
        }
    }

    //B
    @Override
    public boolean isShutStar(String id) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(15);
        ArrayList<TabTablesData> datas = stockDataMapper.getTabTablesData(id , start.toString() ,end.toString());
        int result = this.inUp(datas);
        if(result == 1){
            TabTablesData tempTabtableData1 = datas.get(datas.size()-1);
            TabTablesData tempTabtableData0 = datas.get(datas.size()-2);
            if(tempTabtableData0.close < tempTabtableData1.open ){
                if (Math.abs(tempTabtableData1.open  - tempTabtableData1.close)*2 < tempTabtableData1.high - Math.max(tempTabtableData1.open,tempTabtableData1.close)
                        && (Math.min(tempTabtableData1.open,tempTabtableData1.close) - tempTabtableData1.low) / tempTabtableData1.low < 0.003)
                    return true;
            return false;
            }
            else
                return false;
        }
        else {
            return false;
        }
    }

    //B
    @Override
    public boolean isHangOn(String id) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(15);
        ArrayList<TabTablesData> datas = stockDataMapper.getTabTablesData(id , start.toString() ,end.toString());
        int result = this.inUp(datas);
        if(result == 1){
            TabTablesData tempTabtableData1 = datas.get(datas.size()-1);


                if (Math.abs(tempTabtableData1.open  - tempTabtableData1.close)*2 <  Math.min(tempTabtableData1.open,tempTabtableData1.close - tempTabtableData1.low)
                        && (tempTabtableData1.high-Math.max(tempTabtableData1.open,tempTabtableData1.close)) / tempTabtableData1.high < 0.003)
                    return true;
                else
                    return false;

        }
        else {
            return false;
        }
    }

    //A or B , 转势
    @Override
    public boolean isPregnant(String id) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(10);
        ArrayList<TabTablesData> datas = stockDataMapper.getTabTablesData(id , start.toString() ,end.toString());
        TabTablesData tempTabtableData1 = datas.get(datas.size()-1);
        TabTablesData tempTabtableData0 = datas.get(datas.size()-2);
        if(Math.max(tempTabtableData0.close,tempTabtableData0.open) > Math.max(tempTabtableData1.close,tempTabtableData1.open)
                && Math.min(tempTabtableData0.close ,tempTabtableData0.open) <Math.min(tempTabtableData1.close,tempTabtableData1.open))
            return true;
        else
            return false;
    }

    //B
    @Override
    public boolean isDarkCloud(String id) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(10);
        ArrayList<TabTablesData> datas = stockDataMapper.getTabTablesData(id , start.toString() ,end.toString());
        TabTablesData tempTabtableData1 = datas.get(datas.size()-1);
        TabTablesData tempTabtableData0 = datas.get(datas.size()-2);
        if((tempTabtableData0.close-tempTabtableData0.open)/tempTabtableData0.open > 0.02
                && (tempTabtableData1.close - tempTabtableData1.open)/tempTabtableData1.open < -0.02){
            if(tempTabtableData1.open > tempTabtableData0.close && tempTabtableData1.close < (tempTabtableData0.close + tempTabtableData0.open)/2)
                return true;
            else
                return false;
        }
        else {
            return false;
        }
    }

    //A
    @Override
    public boolean isDawnLight(String id) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(10);
        ArrayList<TabTablesData> datas = stockDataMapper.getTabTablesData(id , start.toString() ,end.toString());
        TabTablesData tempTabtableData1 = datas.get(datas.size()-1);
        TabTablesData tempTabtableData0 = datas.get(datas.size()-2);
        if((tempTabtableData0.close-tempTabtableData0.open)/tempTabtableData0.open < -0.02
                && (tempTabtableData1.close - tempTabtableData1.open)/tempTabtableData1.open > 0.02){

            if(tempTabtableData1.open < tempTabtableData0.close && tempTabtableData1.close > (tempTabtableData0.close + tempTabtableData0.open)/2)
                return true;
            else
                return false;
        }
        else {
            return false;
        }
    }


    //A
    @Override
    public boolean isRedSolder(String id) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(15);
        ArrayList<TabTablesData> datas = stockDataMapper.getTabTablesData(id , start.toString() ,end.toString());

        ArrayList<TabTablesData> datas1 = new ArrayList<>();
        for(int i=0;i<datas.size()-3;i++){
            datas1.add(datas.get(i));
        }
        int result = this.inUp(datas1);

        if(result == -1){
            TabTablesData tempTabtableData2 = datas.get(datas.size()-1);
            TabTablesData tempTabtableData1 = datas.get(datas.size()-2);
            TabTablesData tempTabtableData0 = datas.get(datas.size()-3);

            if((tempTabtableData0.close - tempTabtableData0.open)/tempTabtableData0.open > 0.02 &&
                    (tempTabtableData1.close - tempTabtableData1.open)/tempTabtableData1.open > 0.02 &&
                    (tempTabtableData2.close - tempTabtableData2.open)/tempTabtableData2.open > 0.02){
                if(tempTabtableData0.close < tempTabtableData1.close && tempTabtableData1.close <tempTabtableData2.close
                        && tempTabtableData2.high - tempTabtableData2.close >(tempTabtableData2.close-tempTabtableData2.high)*2)
                    return true;
            }
            return false;
        }
        else {
            return false;
        }
    }


    public int inUp(ArrayList<TabTablesData> datas){
        int result = 0;
        int upcount = 0;
        int downcount = 0;
        for(int i=1;i<datas.size()-1;i++){
//            TabTablesData tempTabtableData = datas.get(i);
            if(datas.get(i).close > datas.get(i-1).close)
                upcount++;
            else
                downcount++;
        }
        if(upcount > downcount){

            double deviation = 0;
            for(int i=datas.size()-2;i>0;i--){
                deviation += (datas.get(i).close - datas.get(i-1).close)/datas.get(i-1).close;
                if (deviation >= 0.15)
                    result = 1;
            }

        }else {
            double deviation = 0;
            for(int i=datas.size()-2;i>0;i--){
                deviation += (datas.get(i).close - datas.get(i-1).close)/datas.get(i-1).close;
                if (deviation <= -0.15)
                    result = -1;
            }
        }
        return  result ;
    }

//    public boolean inDown(ArrayList<TabTablesData> datas){
//
//
//        return false;
//    }



}
