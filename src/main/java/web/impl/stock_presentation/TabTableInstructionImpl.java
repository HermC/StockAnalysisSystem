package web.impl.stock_presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.dao.stock_presentation.StockDataMapper;
import web.pojo.before.TabTablesData;
import web.service.stock_presentation.TabTableInstructionService;
import web.vo.before.TabTableInsVO;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/21.
 */
@Service("TabTableInstructionService")
public class TabTableInstructionImpl implements TabTableInstructionService {

    @Autowired
    private StockDataMapper stockDataMapper;

    @Override
    public ArrayList<TabTableInsVO> getTablesInfo(ArrayList<TabTablesData> list) {
        ArrayList<TabTableInsVO> tabTableInsVOArrayList = new ArrayList<>();
        TabTableInsVO ttabTableInsVO = new TabTableInsVO();
        ttabTableInsVO.tabTablesData = list.get(0);
        tabTableInsVOArrayList.add(ttabTableInsVO);
        for(int i=1;i<list.size();i++){
            TabTableInsVO tabTableInsVO = new TabTableInsVO();

            tabTableInsVO.tabTablesData = list.get(i);
            
//            System.out.println(JSON.toJSON(list.get(i-1)));
            //kdj
            if(list.get(i-1).slowK==null||list.get(i-1).slowD==null||
                    list.get(i).slowK==null||list.get(i).slowD==null){

            }else{
                if(list.get(i).slowD>=80){
                    tabTableInsVO.kdjIns = "D线的值大于80,受到很多人的追捧,行情出现超买现象。注意随时可能出现的转折或者反弹。";
                }
                if(list.get(i).slowD<=20){
                    tabTableInsVO.kdjIns = "D线小于20,大多数股民会采取做空策略,行情出现超卖现象。注意随时可能出现的转折或者反弹。";
                }
                if(list.get(i-1).slowK < list.get(i-1).slowD &&
                        list.get(i).slowK > list.get(i).slowD ){
                    tabTableInsVO.kdjgrade = 3;
                    tabTableInsVO.kdjIns = "K线向上突破D线,出现黄金交叉(上升中的短期移动平均线由下而上穿过上升的长期移动平均线),股票在后市有上涨趋势。压力线被向上突破，行情看好。";
                }
                if(list.get(i-1).slowK > list.get(i-1).slowD &&
                        list.get(i).slowK < list.get(i).slowD ){
                    tabTableInsVO.kdjgrade = 2;
                    tabTableInsVO.kdjIns = "K线向下突破D线,出现死亡交叉(下降中的短期移动平均线由上而下穿过下降的长期移动平均线),股票在后市有下跌趋势。支撑线被向下突破，表示股价将继续下落，行情看跌。";
                }
            }

            //boll
            if(list.get(i).close==null||list.get(i).boll_upper==null||list.get(i).boll_low==null
                    ||list.get(i).boll_middle==null||list.get(i-1).boll_low==null||list.get(i-1).boll_middle==null||
                    list.get(i-1).boll_upper==null){

            }else{
                if(list.get(i).close>list.get(i).boll_upper) {
                    tabTableInsVO.bollgrade = 1;
                    tabTableInsVO.bollIns += "股价向上击穿阻力线,股价可能到达了涨势的末期,出现卖点。";
                }
                if(list.get(i).close<list.get(i).boll_low) {
                    tabTableInsVO.bollgrade = 2;
                    tabTableInsVO.bollIns += "股价向下击破支撑线,股价可能到达了跌势的末期,出现买点。";
                }
                double before = (list.get(i-1).boll_upper-list.get(i-1).boll_low)/list.get(i-1).boll_middle;
                double now = (list.get(i).boll_upper-list.get(i).boll_low)/list.get(i).boll_middle;
                if(before<now&&now<0.1) {
                    tabTableInsVO.bollIns += "Boll线上小的两条线的距离逐渐变大,boll线开口变宽。";
                    if (list.get(i).close > list.get(i).boll_middle) {
                        tabTableInsVO.bollgrade = 3; //上涨
                        tabTableInsVO.bollIns += "此时股票价格处于boll线中线之上,行情看好,后市可能会出现上涨趋势。";
                    }
                    else {
                        tabTableInsVO.bollgrade = 2; //下跌
                        tabTableInsVO.bollIns += "此时股票价格处于boll线中线之下,行情看淡,后市可能会出现下跌趋势。请股民朋友谨慎对待";
                    }
                }else if(before>now&&now<0.1){
                    tabTableInsVO.bollIns += "Boll线上下的两条线的距离逐渐变小,Boll线开口变窄。";
                    if (list.get(i).close > list.get(i).boll_middle) {
                        tabTableInsVO.bollgrade = 3; //上涨
                        tabTableInsVO.bollIns += "此时股票价格处于boll线中线之上,行情看好,后市可能会出现上涨趋势。";
                    }
                    else {
                        tabTableInsVO.bollgrade = 2; //下跌
                        tabTableInsVO.bollIns += "此时股票价格处于boll线中线之下,行情看淡,后市可能会出现下跌趋势。";
                    }
                }
            }
            //rsi
            if(list.get(i).rsi12==null){

            }else{
                if(list.get(i).rsi12 >=85){
                    tabTableInsVO.rsigrade = 2 ;
                    tabTableInsVO.rsiIns += "rsi值过大,超过上阻力位置,数值过大,股票后期可能会下跌,建议做空";
                }
                if(list.get(i).rsi12<85&&list.get(i).rsi12>=60)
                {
                    tabTableInsVO.rsiIns += "rsi值较大,行情被很多人所看好,处于涨势中,强买入";
                    tabTableInsVO.rsigrade = 3;
                }

                if(list.get(i).rsi12 <= 15){
                    tabTableInsVO.rsigrade = 2 ;
                    tabTableInsVO.rsiIns += "rsi值过小,行情不被大多数人看好,可能会出现下跌趋势,建议做空";

                }
            }
            //end
            tabTableInsVOArrayList.add(tabTableInsVO);
        }

        return tabTableInsVOArrayList;
    }
}
