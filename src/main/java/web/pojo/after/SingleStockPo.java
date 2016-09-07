package web.pojo.after;

/**
 * Created by linyufan on 16/9/3.
 */
public class SingleStockPo {

    public String stockid;

    public String stockname;

    public double close;        //昨日收盘价

    public String getStockid() {
        return stockid;
    }

    public void setStockid(String stockid) {
        this.stockid = stockid;
    }

    public String getStockname() {
        return stockname;
    }

    public void setStockname(String stockname) {
        this.stockname = stockname;
    }

    public double getClose() {
        return close;
    }

    public void setClose(double close) {
        this.close = close;
    }
}
