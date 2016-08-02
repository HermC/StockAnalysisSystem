package web.pojo.before;

import java.time.LocalDate;

/**
 * Created by yqq on 2016.5.11.
 */
public class CandleData {

    public String date;
    public double open;
    public double close;
    public double high;
    public double low;

    public double ma5;
    public double ma10;
    public double ma20;
    public double ma30;

    public void setDate(String date) {
        LocalDate temp = LocalDate.parse(date);
        this.date = temp.getMonth().toString()+" "+temp.getDayOfMonth()+","+temp.getYear();
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
