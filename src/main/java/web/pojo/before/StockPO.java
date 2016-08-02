package web.pojo.before;

/**
 * Created by zcj on 16/5/8.
 * 股票数据
 * 开盘（open），收盘（close），最高价（high），最低价（low），成交量（column），成交金额（total），后复权价（adj_price），
 * 换手率（turnover），市盈率（pe_ttm），市净率（pb），五日均线（ma5），十日均线（ma10），二十日均线（ma20），三十日均线（ma30）
 * ，六十日均线（ma60）
 * 指数平滑异同平均线（macd），diff，dea，真实波幅（atr），KDJ，RSI，BOLL， 涨跌幅（），涨跌量（），量比（quantityrelative），
 * 大单成交手数（L），中单成交手数（M），小单成交手数（S）
 * 委比（DaPanWeiBi）
 */
public class StockPO {
    public double open;
    public double close;
    public double high;
    public double low;
    public double volume;
    public double total;
    public double adj_price;
    public double turnover;
    public double pe_ttm;
    public double pb;
    public double ma5;
    public double ma10;
    public double ma20;
    public double ma30;
    public double ma60;
    public double macd;
    public double diff;
    public double dea;
    public double atr;
    public double kdj_k;
    public double kdj_d;
    public double kdj_j;
    public double rsi6;
    public double rsi12;
    public double rsi24;
    public double boll_upper;
    public double boll_middle;
    public double boll_lowwer;
    public double upDownRate;
    public double upDown;
    public double quantityrelative;
    public double weibi;
}
