package web.vo.before;

import web.pojo.before.StockPO;

/**
 * Created by zcj on 16/5/7.
 * 存放Stock静态图表数据,个股页面初始化
 * * 开盘（open），收盘（close），最高价（high），最低价（low），成交量（column），成交金额（total），后复权价（adj_price），
 * 换手率（turnover），市盈率（pe_ttm），市净率（pb），五日均线（ma5），十日均线（ma10），二十日均线（ma20），三十日均线（ma30）
 * ，六十日均线（ma60）
 * 指数平滑异同平均线（macd），diff，dea，真实波幅（atr），KDJ，RSI，BOLL， 涨跌幅（），涨跌量（）
 */
public class StockVO {
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

    public StockVO(StockPO stockPO){
        this.open = stockPO.open;
        this.close = stockPO.close;
        this.high = stockPO.high;
        this.low = stockPO.low;
        this.volume = stockPO.volume;
        this.total = stockPO.total;
        this.adj_price = stockPO.adj_price;
        this.turnover = stockPO.turnover;
        this.pe_ttm = stockPO.pe_ttm;
        this.pb = stockPO.pb;
        this.ma5 = stockPO.ma5;
        this.ma10 = stockPO.ma10;
        this.ma20 = stockPO.ma20;
        this.ma30 = stockPO.ma30;
        this.ma60 = stockPO.ma60;
        this.macd = stockPO.macd;
        this.diff = stockPO.diff;
        this.dea = stockPO.dea;
        this.atr = stockPO.atr;
        this.kdj_k = stockPO.kdj_k;
        this.kdj_d = stockPO.kdj_d;
        this.kdj_j = stockPO.kdj_j;
        this.rsi6 = stockPO.rsi6;
        this.rsi12 = stockPO.rsi12;
        this.rsi24 = stockPO.rsi24;
        this.boll_upper = stockPO.boll_upper;
        this.boll_middle = stockPO.boll_middle;
        this.boll_lowwer = stockPO.boll_lowwer;
        this.upDownRate = stockPO.upDownRate;
        this.upDown = stockPO.upDown;
    }

}
