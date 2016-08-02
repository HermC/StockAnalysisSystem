package web.pojo.before;

/**
 * Created by linyufan on 16/5/28.
 */
public class FavouriteStock {
    public String stockid;
    public String name;
    public long count;
    public long rank;

    public String rankString = "";
    public String countString = "";

    public String industry;

    public int industryid;

    public String date;

    public double open;
    public double close;
    public double high;
    public double low;
    public double ma5;

    public double ma10;
    public double ma20;
    public double ma30;

    public void setIndustryid(int industryid) {
        this.industryid = industryid;
    }

    public void setStockid(String stockid) {
        this.stockid = stockid;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCount(long count) {
        this.count = count;
        if(count<10){
            countString = "0"+count;
        }else{
            countString = ""+count;
        }
    }

    public void setRank(long rank) {
        this.rank = rank;
        if(rank<10){
            rankString = "0"+rank;
        }else{
            rankString = ""+rank;
        }
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setOpen(double open) {
        this.open = open;
    }

    public void setClose(double close) {
        this.close = close;
    }

    public void setHigh(double high) {
        this.high = high;
    }

    public void setLow(double low) {
        this.low = low;
    }

    public void setMa5(double ma5) {
        this.ma5 = ma5;
    }

    public void setMa10(double ma10) {
        this.ma10 = ma10;
    }

    public void setMa20(double ma20) {
        this.ma20 = ma20;
    }

    public void setMa30(double ma30) {
        this.ma30 = ma30;
    }
}
