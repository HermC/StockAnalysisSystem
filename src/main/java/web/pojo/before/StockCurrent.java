package web.pojo.before;

/**
 * Created by zcj on 16/5/8.
 * 股票实时数据
 */
public class StockCurrent {

    public String price;            // 实时价格
    public String devia_val;        // 涨跌值
    public String devia_per;        // 涨跌幅
    public String open;             // 今开
    public String volume;           // 成交量(*手)
    public String high;             // 最高
    public String up_stop;          // 涨停
    public String inner_count;      // 内盘(*手)
    public String amount;           // 成交额(*100000000)
    public String committee;        // 委比
    public String avail_amount;     // 流通市值(*100000000)
    public String pe;               // 市盈率
    public String profit_per;       // 每股收益
    public String total_volume;     // 总股本(*100000000)
    public String close ;           // 作收
    public String turnover;         // 换手率
    public String low;              // 最低
    public String down_stop;        // 跌停
    public String outer_count;      // 外盘(*手)
    public String amplitude;        // 振幅
    public String quantity_ratio;   // 量比
    public String total_amount;     // 总市值(*100000000)
    public String pb;               // 市净率
    public String value_per_stock;  // 每股净资产
    public String available_stock;  // 流通股本(*100000000)

    //----------------------------------------------------------

    public Integer open_attri;
    public Integer high_attri;          //
    public Integer low_attri;           //
    public Integer up_attri;            //
    public Integer down_attri;          //

    //----------------------------------------------------------

    public Double out5;
    public Integer out5_vol;
    public Double out4;
    public Integer out4_vol;
    public Double out3;
    public Integer out3_vol;
    public Double out2;
    public Integer out2_vol;
    public Double out1;
    public Integer out1_vol;

    //-----------------------------------------------------------

    public Double in5;
    public Integer in5_vol;
    public Double in4;
    public Integer in4_vol;
    public Double in3;
    public Integer in3_vol;
    public Double in2;
    public Integer in2_vol;
    public Double in1;
    public Integer in1_vol;

    public StockCurrent(String price, String devia_val, String devia_per, String open, String volume,
                        String high, String up_stop, String inner_count, String amount, String committee,
                        String avail_amount, String pe, String profit_per, String total_volume, String close,
                        String turnover, String low, String down_stop, String outer_count, String amplitude,
                        String quantity_ratio, String total_amount, String pb, String value_per_stock, String available_stock,
                        Integer open_attri, Integer high_attri, Integer low_attri, Integer up_attri, Integer down_attri,
                        Double out5, Double out4, Double out3, Double out2, Double out1,
                        Integer out5_vol, Integer out4_vol, Integer out3_vol, Integer out2_vol, Integer out1_vol,
                        Double in5, Double in4, Double in3, Double in2, Double in1,
                        Integer in5_vol, Integer in4_vol, Integer in3_vol, Integer in2_vol, Integer in1_vol
                        ) {

        this.price = price;
        this.devia_val = devia_val;
        this.devia_per = devia_per;
        this.open = open;
        this.volume = volume;
        this.high = high;
        this.up_stop = up_stop;
        this.inner_count = inner_count;
        this.amount = amount;
        this.committee = committee;
        this.avail_amount = avail_amount;
        this.pe = pe;
        this.profit_per = profit_per;
        this.total_volume = total_volume;
        this.close = close;
        this.turnover = turnover;
        this.low = low;
        this.down_stop = down_stop;
        this.outer_count = outer_count;
        this.amplitude = amplitude;
        this.quantity_ratio = quantity_ratio;
        this.total_amount = total_amount;
        this.pb = pb;
        this.value_per_stock = value_per_stock;
        this.available_stock = available_stock;

        this.open_attri = open_attri;
        this.high_attri = high_attri;
        this.low_attri = low_attri;
        this.up_attri = up_attri;
        this.down_attri = down_attri;

        this.out5 = out5;
        this.out4 = out4;
        this.out3 = out3;
        this.out2 = out2;
        this.out1 = out1;
        this.out5_vol = out5_vol;
        this.out4_vol = out4_vol;
        this.out3_vol = out3_vol;
        this.out2_vol = out2_vol;
        this.out1_vol = out1_vol;

        this.in5 = in5;
        this.in4 = in4;
        this.in3 = in3;
        this.in2 = in2;
        this.in1 = in1;
        this.in5_vol = in5_vol;
        this.in4_vol = in4_vol;
        this.in3_vol = in3_vol;
        this.in2_vol = in2_vol;
        this.in1_vol = in1_vol;

    }

}
