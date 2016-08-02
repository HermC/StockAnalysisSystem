package web.pojo.before;

/**
 * Created by Hermit on 16/5/25.
 */
public class ForecastData {

    public String date;

    public String stockid;

    public Double price_middle;
    public Double price_high;
    public Double price_low;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStockid() {
        return stockid;
    }

    public void setStockid(String stockid) {
        this.stockid = stockid;
    }

    public Double getPrice_middle() {
        return price_middle;
    }

    public void setPrice_middle(Double price_middle) {
        if(price_middle==null){
            this.price_middle = new Double(0);
        }else{
            this.price_middle = price_middle;
        }
    }

    public Double getPrice_high() {
        return price_high;
    }

    public void setPrice_high(Double price_high) {
        if (price_high!=null) {
            this.price_high = price_high;
        } else {
            this.price_high = new Double(0);
        }
    }

    public Double getPrice_low() {
        return price_low;
    }

    public void setPrice_low(Double price_low) {
        if (price_low!=null) {
            this.price_low = price_low;
        } else {
            this.price_low = new Double(0);
        }
    }
}
