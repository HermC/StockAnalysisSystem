package web.impl.stock_presentation;

import org.springframework.stereotype.Service;
import web.Tools.Realtime;
import web.pojo.before.StockCurrent;
import web.service.stock_presentation.InstructionTextService;
import web.vo.before.StockInsTextVO;

/**
 * Created by linyufan on 16/5/8.
 */
@Service("investInstructionService")
public class InstructionTextImpl implements InstructionTextService {
//    @Resource

//    StockProvideMapper stockProvideMapper;

    @Override
    public StockInsTextVO getStockAnalysis(String id) throws Exception {

        StockCurrent currentInfo = Realtime.getStockRealtime(id);

        StockInsTextVO stockInstruction = new StockInsTextVO();
        stockInstruction.UpDownAnalysis = this.getUpDownAnalysis(currentInfo);
        stockInstruction.PBAnalysis = this.getPBAnalysis(currentInfo);
        stockInstruction.PEAnalysis = this.getPEAnalysis(currentInfo);
        stockInstruction.WeibiAnalysis = this.getWeiBiAnalysis(currentInfo);
        stockInstruction.InOutAnalysis = this.getInOutAnalysis(currentInfo);
        stockInstruction.VolumeAnalysis = this.getVolumeAnalysis(currentInfo);
        stockInstruction.TurnOverAnalysis = this.getTurnOverAnalysis(currentInfo);
        return stockInstruction;
    }

    // 注,有的数据只需要用到最后一天的,或者实时的数据

    /**
     * getStockAnalysis文字分析的内部`方法
     * @param
     * @return 分析结果
     */
    private String getUpDownAnalysis(StockCurrent currentInfo ) {
        double updown = 0;
        try {
            if(currentInfo.amplitude.equals("--")) return "";
            updown = Double.parseDouble(currentInfo.amplitude.replaceAll("[^0-9\\.\\-]", ""))/100;
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return "";
        }
        String result = "";
        if(updown > 0){
            if(updown < 0.02){
                result += "股价略微上涨,参考其他数据没有发现下跌信号,可以小量入手";
            }
            if(updown >= 0.02 && updown < 0.08){
                result += "股价上涨较多,如果量价配合好,涨情较为健康,可以考虑短线套利,如果这种涨势出现较早,该股有连续潜力,同时在高位要提防庄家出货";
            }
            if(updown >= 0.08 ){
                result += "股价大幅上涨,如果经常出现这种涨幅可能是常庄股,可以跟踪,配合其他指标套利,若股票此时处于低位,可能是新庄家介入导致涨幅剧增" +
                        "若股价在k线图处在高位,此时要提防庄家出货";
            }
            result += "";
        }
        if(updown < 0){
            result += "该股股价下跌,如果没有出现异常信号,建议暂时不要投资该股,其次如果近一阶段累积了足够的下跌能量,股价见底,可以考虑操作";
        }
        if(updown == 0){
            result += "股票还未出现上涨或下跌,可以参考其他数据或静观变化";
        }
        return result;
    }


    private String getPBAnalysis(StockCurrent currentInfo ) {
        double pb = 0;
        try {
            if(currentInfo.pb.equals("--")) return "";
            pb = Double.parseDouble(currentInfo.pb);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return "";
        }
        String result = "";
        if(pb>1.5) {
            result += "市净率较小,投资收益可能不如其他投资方式";
        }else{
            result += "市净率较小,投资收益可以与银行等投资方式相当";
        }

        if(pb>0.8 && pb<1.5){
            result += ",市净率处于正常范围,风险较小,有投资价值";
        }
        if(pb>=1.5 && pb<3){
            result += ", 市净率相对较高,如果公司经营状况确实比较出色,建议投资";
        }


        return result;
    }

    private String getPEAnalysis(StockCurrent currentInfo ) {
        Double pe = null;
        try {
            if(currentInfo.pe.equals("--")) return "";
            pe = Double.parseDouble(currentInfo.pe);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return "";
        }
        String result = "";
        result += "市盈率是一项风险指标";
        if(pe>=50){
            result += ",此时该股市盈率为";
            result += pe.toString();
            result += ",市盈率处于较高的状态,如果该股之前涨情较好受追捧,可以适当看高,应当适当考虑该股风险,作出相应的投资";
        }
        if(pe>30 && pe<50){
            result += ",此时该股市盈率为";
            result += pe.toString();
            result += ",属于正常范围,通过市盈率分析可以静观变化" ;
        }
        if(pe<=30){
            result +=  ",此时该股市盈率为";
            result += pe.toString();
            result +=  ",市盈率偏低,投资该股的风险较小,若此前经历下跌周期,可能因为不被多数人看好,需谨慎对待";
        }

        return result;
    }


    private String getWeiBiAnalysis(StockCurrent currentInfo) {
        Double weibi = null;
        try {
            if(currentInfo.committee.equals("--")) return "";
            weibi = Double.parseDouble(currentInfo.committee.replaceAll("[^0-9\\.\\-]", ""))/100;
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return "";
        }
        String result = "";
        if(weibi < 0 ){
            if(weibi == -1) {
                result += "只有卖盘而没有买盘,市场的抛盘非常大,几乎所有人认为利空,应当抛盘";
            }else{
                result += "卖盘大于买盘,较多人对股票期望不高";
            }

            if (currentInfo.out2>1000 || currentInfo.out3>1000 || currentInfo.out4>1000){
                result += ",由于分析发现在非卖一的位置挂着千手以上的大单,需谨慎观察是否有异常委盘,显示抛压似乎很沉重,但如果此时股价并不明显下跌" +
                        "这样的大笔直接卖出也不多见,显示没有主动性砸盘,而且如果盘内成交较为活跃,在底部累计涨幅不大的情况下,很有可能是拉升前兆";
            }
        }
        if(weibi > 0){
            if(weibi == 1){
                result += "只有买盘而没有卖盘,市场买盘非常有力,市场非常看好该股";
            }else{
                result += "买盘大于卖盘,较多的人对股票有期待";
            }
            if(currentInfo.in2>1000 || currentInfo.in3>1000 || currentInfo.in4>1000){
                result += ",由于分析发现在非卖一的位置出现千手以上的大买单,需谨慎观察是否有异常委盘,如果该股经历了震荡下跌,谨慎观察是否是主力护盘" +
                        "但之后反弹明显无量,盘中主动抛盘较多,重新下跌抛盘踊跃,可能是主力出货的先兆";
            }
        }
        if(weibi == 0){
            result += "买盘卖盘实力相当,不存在差值,经过委比分析,建议观望变化";
        }
        return result;
    }


    private String getInOutAnalysis(StockCurrent currentInfo ) {

        double in = 0;
        double out = 0;
        double updown = 0;
        double vo = 0;
        try {
            if(currentInfo.inner_count.equals("--")||currentInfo.outer_count.equals("--")||
                    currentInfo.amplitude.equals("--")||currentInfo.quantity_ratio.equals("--"))
                return "";
            in = Double.parseDouble(currentInfo.inner_count.replaceAll("[^0-9\\.\\-]", ""))*100;
            out = Double.parseDouble(currentInfo.outer_count.replaceAll("[^0-9\\.\\-]", ""))*100;
            updown = Double.parseDouble(currentInfo.amplitude.replaceAll("[^0-9\\.\\-]", ""))/100;
            vo = Double.parseDouble(currentInfo.quantity_ratio);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return "";
        }
        String result = "";
        if(in<out){
            result += "外盘数量大于内盘,买方力量较强";
        }else{
            result += "外盘数量大于内盘,卖方力量较强";
        }

        if(currentInfo.out1>500 || currentInfo.out2>500 || currentInfo.out3>500 || currentInfo.out4>500
                || currentInfo.out5>500){
            if(updown>=0){
                result += ",上有盖板(大笔卖单),股价不跌,若此时出现大量隐形外盘,此时为大幅上涨先兆";
                return result;
            }
        }
        if(currentInfo.in1>500 || currentInfo.in2>500 || currentInfo.in3>500 || currentInfo.in4>500
                || currentInfo.in5>500  ){
            result += ",下有托盘(大量买单),若此时有大量隐形内盘,需要小心庄家出货";
            return  result;
        }
        if(in<10000 && out<10000){
            result += ",内外盘都较小";
            if (updown>0)
                result += ",股价小幅上涨,可能是庄家在锁定筹码,轻轻托着股价向上走";

        }else {
            if (in < out) {
                if (updown <= 0)
                    result += ",股价没有上涨,警惕庄家出货";
                else {
                    result += ",股价仍在上涨,可以看高一线";
                }

            }else {
                if(updown<0 && vo>1){
                    result += ",价增量跌,如果是连续两天,抓紧出货";
                }else{
                    result += ",通过内外盘指标,建议观望";
                }
            }
        }
        return result;
    }


    private String getTurnOverAnalysis(StockCurrent currentInfo ) {
        double turnover = 0;
        try {
            if(currentInfo.turnover.equals("--")) return "";
            turnover = Double.parseDouble(currentInfo.turnover.replaceAll("[^0-9\\.\\-]", ""))/100;
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return "";
        }
        String result = "";
        if(turnover < 0.002){
            result += "该股出现过低的换手率,如果这种情况持续较长时间,大于5个交易日,股价见底,此后容易出现上涨行情";
        }
        if(turnover >= 0.002 && turnover < 0.015){
            result += "多空双方的意见一致,股票基本会按照原有的运行趋势进一步发展,多数情况下是小幅下跌或者横盘运行";
        }
        if(turnover >= 0.015 && turnover < 0.03){
            result += "换手率处在正常水平.从此项数据出发,建议静待变化";
        }
        if(turnover >= 0.03 && turnover < 0.05){
            result += "换手率显示股票交易较为活跃,股票行情较好,可以进一步参考其他数据";
        }
        if(turnover >= 0.05 && turnover < 0.2){
            result += "换手率较高,该股放量,需要仔细观察以下三种情况"  ;
            result += "1.该股在过去的一阶段交易,股价低靡,这种较高换手率若能维持,可能有新增资金介入,出现涨势甚至成为强势股的可能性很大";
            result += "2.该股已经处在高位,而换手率成交量同时放大,应当谨慎对待,可能有资金撤出,之后会出现下跌行情可能性较大";
            result += "3.注意异常情况,长时间放量可能是大买家对倒自救,应当警惕";
        }
        if(turnover >= 0.2){
            result += "该股出现换手率过高的情况,需要谨慎对待,股票如果累积了涨势,可能会出现下跌的情况";
        }

        return result;
    }


    private String getVolumeAnalysis(StockCurrent currentInfo ) {
        double dao = 0;
        double updown = 0;
        try {
            if(currentInfo.quantity_ratio.equals("--")) return "";
            dao = Double.parseDouble(currentInfo.quantity_ratio);
            if(currentInfo.amplitude.equals("--")) return "";
            updown = Double.parseDouble(currentInfo.amplitude.replaceAll("[^0-9\\.\\-]", ""))/100;
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return "";
        }

        String result = "基于量比分析,";
        if(dao<1 && updown>0.1){
            result += "涨停板时量比很小,杀跌的可能性不大,上涨空间无可限量,第二天开盘即封涨停的可能性极高";
        }
        else {
            if(dao<=0.5) {
                result += "股票交易不活跃,这种缩量需谨慎,可能股票本身期望不高,也存在庄家长期控股的可能,后者存在一定市场机会";
            }
            if (dao <= 1.5 && dao >0.5){
                result += "交易量处于正常水平,该股活跃度正常,可以参考其他指标进行分析";
            }
            if(dao<=2.5 && dao>1.5){
                result += "成交量温和上涨,属于温和放量";
                if(updown>0){
                    result += ",股价在抬升,升势相对健康,可以考略持股或入股";
                }
                if(updown==0){
                    result += ",此时股票价格稳定,建议观望";
                }
                if(updown<0){
                    result += ",股价处于下跌状态,跌势可能难以在短期内结束,从量的方面判断,应考虑止损退出";
                }

            }
            if(dao<=5 && dao>2.5){
                result += "该股处于明显放量,若股价相应地突破重要支撑或者阻力位置,则突破有效的几率额高,可以相应采取措施";
            }
            if(dao>5 && dao<=10){
                result += "该股处于剧烈放量,需要查看股票前一阶段的纪录,若股票之前长期处于低位,出现剧烈放量突破,涨势的后续空间巨大," +
                        "若该股之前已经有了巨大涨幅,此时出现剧烈放量,值得高度警惕";


            }
            if(dao>10 && dao<=20){
                result += "可以考虑反向操作,需要查看股票前一阶段的纪录";
                result += ",若该股处于涨势之中出现这种放量,可能出现主力转移,说明见顶的可能性比较大,即使不是彻底反转,至少涨势会休整相当长一段时间" ;
                result += ",若股票处于绵绵阴跌的后期,突然出现这种巨大的量比,说明该股在此处下降的能量几乎彻底释放";
            }
            if(dao>20){
                result += "该股处于极端放量,反转意义特别强烈,仔细观察股票近阶段表现,经过连续上涨成交量极端放大,股价出现滞胀现象,时涨势停止的强烈信号" +
                        "但跌势中出现极端放量,是建仓的大好时机";

            }

        }
        return result;
    }



}