package web.vo.before;

/**
 * Created by linyufan on 16/6/3.
 */
public class DetailStrategyVO {

    public String DawnStarIns = "出现黎明之星现象,可能转势上涨在即。";
    public String DawnStarDetail = "黎明之星是由三根K线组成的一个K线组合形态，它是一种行情见底转市的形态。如果这种形态一旦出现在下降" +
            "趋势中应引起注意，因为此时趋势已经发出相对比较明确的反转信号，是一个很好的买入时机。";
    public String DawnStarGraph = "这一组合是在阴线之后,下方首先出现一小阳线或小阳十字线,最后再出现跳空上升的一条大阳线。";
    public int DawnStarLength = 3;
    public boolean DawnStarBL = false;

    public String DuskStarIns = "出现黄昏之星,股价可能见顶,转势在即。";
    public String DuskStarDetail = "黄昏之星的K线组合形态如果出现在上升趋势中应引起注意，因为此时趋势已发出比较明确的" +
            "反转信号或中短期的回调信号，对于我们来说可能是非常好的卖入时机或中短线回避的时机。";
    public String DuskStarGraph = "第一天，市场在一片狂欢之中继续涨势，并且拉出一根长阳线。 第二天，继续冲高，但尾盘回落，形成上影线，" +
            "实体部分窄小，构成星的主体。 第三天，突然下跌，间或出现恐慌性抛压，价格拉出长阴，抹去了前两天大部分走势。" +
            "黄昏之星充当顶部的几率非常之高，在牛势的后期，要特别警惕这种反转信号。";
    public int DuskStartLength = 3;
    public boolean DuskStarBL = false;

    public String ShutStarIns = "出现射击之星现象,股价见顶可能性大,股价可能出现下跌。";
    public String ShutStarDetail = "射击之星又称为“倒转锤头”，仿如枪的准头，是以有此称谓。射击之星可以是阴线或阳线，但实体比较短小，" +
            "上影线较长，其位置主要出现在某只个股的顶部，是一种十分明显的见顶信号。这一形态的形成是开盘价比较低，多头组织力量向上攻，" +
            "一度急升，但尾市卖压加强，收市价又回落至开盘价附近。射击之星因为光芒短暂又被称为“流星”。";
    public String ShutStarGraph = "第一,K线实体要很小，阴线、阳线均可，但影线要很长(是K线实体二倍以上）。如若有下影线，也是很短；" +
            "第二，出现在上升趋势中，通常已有一段较大的涨幅。";
    public int ShutStarLength = 2;
    public boolean ShutStarBL = false;

    public String HangOnIns = "出现上吊线,注意股价下降危险。";
    public String HangOnDetail = "上吊线，由于是处在上升趋势中，市场一般被认为是牛市．要产生出上吊线，当天的价格行为一定在低于开盘价的位置，" +
            "之后反弹使收盘价几乎是在最高价的位置。这时产生出下影线，而这根长下影线显示了一个疯狂卖出是怎么样开始的。如果市场第二天开盘较低，" +
            "就有很多持有多头头寸而等待卖出时机的参与者在一旁观望。上吊线的熊市含义得到确认应该是实体，是阴线，并且第二天开盘较低。";
    public String HangOnGraph = "上吊线是下影线较长，实体部分较短，下影线长度在K线实体的两倍以上的一种特殊K线，对实体收阴收阳没有严格要求，" +
            "一般都出现在上行的趋势中。由于其形状与绞架颇为相似，故而因此得名。";
    public int HangOnLength = 1;
    public boolean HangOnBL = false;

    public String PregnantIns = "出现孕线,会转势,如果出现十字,转势趋势更加强烈。";
    public String PregnantDetail = "这种前长后短的组合形态，形似怀有生孕的妇女一样，所以称为孕线。孕线孕育着希望，趋势随时都可能会反转向上。";
    public String PregnantGraph = "孕线一般分为三种形态：一是前一条图线是一条长大的阳线，第二条图线是一条短小的阴线，称为阴孕阳线，" +
            "简称阴孕线；二是前一条图线是一条长大的阴线，第二条图线是一条短小的阳线，称为阳孕阴线，简称阳孕线；三是前一条图线是一条长大的阳线（或阴线），" +
            "第二条图线是一条十字星线，为十字星孕线，简称星孕线。";
    public int PregnantLength = 2;
    public boolean PregnantBL = false;

    public String DarkCloudeIns = "k线现乌云盖顶,注意转势下跌情况。";
    public String DarkCloudeDetail = "乌云盖顶是一个非常重要且较为常见的看跌反转信号，经常发生在一个超长期的上升趋势中。第二天伴随着成交量高开，" +
            "可能意味着很多新买家终于下定决心入市，踏上牛市的“船”。随后，市场却发生了抛售的行情，那么，很可能用不了多久，这群新多头就会认识到，" +
            "市场已转为空头行情，他们已被挂在相对高点站岗。第二日的长阴K线，意味着市场价格上升动力耗尽，买方策划的最后一番上攻失利，卖方已控制大局。";
    public String DarkCloudeGraph = "乌云盖顶形态中，第一天是一根坚挺的阳线实体，第二天则为一根长阴线。第二天的开市价超过第一天的最高价" +
            "（这就是说超过了第一天的上影线的顶端），市场却收市在接近当日的最低价的水平，并且收市价明显地向下扎入到第一根阳线实体的内部。";
    public int DarkCloudeLength = 2;
    public boolean DarkCloudeBL = false;

    public String DawnLightIns = "下跌中现曙光,股价预计止跌上扬";
    public String DawnLightDetail = "\"曙光初现\"K线组合在熊市中应用时，要加上一个附加条件，那就是\"曙光初现\"第二根阳线的最低价必须是13个交易日" +
            "以来的最低价，这主要是用于避免投资者在熊市中贸然追高，防止增大操作风险。但是，如果市场趋势向好，股市运行在牛市行情中时，" +
            "投资者则不必过于拘泥这条规则。因为，牛市中股价涨多跌少，如果强调买入13天以来的最低价，就会错失良机。";
    public String DawnLigthGraph = "第一支烛为处於跌势的大阴烛，显示当日沽盘相当强劲。第二支烛为大阳烛，其开市价必须低於第一支烛的最低价，" +
            "而收市价则必须高於第一支烛的一半烛身。";
    public int DawnLightLength = 2;
    public boolean DawnLightBL = false;

    public String RedSolderIns = "出现红三兵(连续3条阳线),上涨趋势强烈";
    public String RedSolderDetail = "使用中红三兵如果发生在下降趋势中，一般是市场的强烈反转信号；如果股价在较长时间的横盘后出现红三兵的走势形态，" +
            "并且伴随着成交量的逐渐放大，则是股票启动的前奏，可引起密切关注。";
    public String RedSolderGraph = "在股票运行过程中连续出现三根阳线，每天的收盘价高于前一天的收盘价。" +
            "每天的开盘价在前一天阳线的实体之内。" +
            "每天的收盘价在当天的最高点或接近最高点。" +
            "红三兵所连成的3根阳线实体部位一般等长。";
    public int RedSolderLength = 3;
    public boolean RedSolderBL = false;

}
