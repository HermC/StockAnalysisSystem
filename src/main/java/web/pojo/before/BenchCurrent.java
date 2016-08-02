package web.pojo.before;

/**
 * Created by NJU on 2016/5/29.
 */
public class BenchCurrent {
    public String price;
    public String devia_val;
    public String devia_per;
    public String high;
    public String low;
    public String open;
    public String close;
    public String volume;
    public String amount;
    public String up_num;
    public String down_num;
    public String neutral_num;

    public Integer high_attri;
    public Integer low_attri;
    public Integer open_attri;

    public BenchCurrent(String price, String devia_val, String devia_per, String high, String low, String open,
                        String close, String volume, String amount, String up_num, String down_num, String neutral_num,
                        Integer high_attri, Integer low_attri, Integer open_attri) {
        this.price = price;
        this.devia_val = devia_val;
        this.devia_per = devia_per;
        this.high = high;
        this.low = low;
        this.open = open;
        this.close = close;
        this.volume = volume;
        this.amount = amount;
        this.up_num = up_num;
        this.down_num = down_num;
        this.neutral_num = neutral_num;
        this.high_attri = high_attri;
        this.low_attri = low_attri;
        this.open_attri = open_attri;
    }
}
