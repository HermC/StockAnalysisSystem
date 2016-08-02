package web.Tools;

import web.pojo.before.StockCurrent;

import java.io.*;

/**
 * Created by NJU on 2016/5/24.
 */
public class Current {
    public static StockCurrent getCurrent(String id) throws Exception{

//        String path = Current.class.getResource("instant_info.py").getPath();
//
//        Process proc = Runtime.getRuntime().exec("python " + path + " " + id);

        Process proc = Runtime.getRuntime().exec("python " + "./src/main/java/web/Tools/instant_info.py" + " " + id);
        proc.waitFor();

        BufferedReader br = new BufferedReader(new InputStreamReader(proc.getInputStream()));

        String price = null;            // 实时价格
        try {
            price = (br.readLine());
        } catch (Exception e) {
            price = "--";
            e.printStackTrace();
        }
        String devia_val = null;        // 涨跌值
        try {
            devia_val = (br.readLine());
        } catch (Exception e) {
            devia_val = "--";
            e.printStackTrace();
        }
        String devia_per = null;        // 涨跌幅
        try {
            devia_per = (br.readLine());
        } catch (Exception e) {
            devia_per = "--";
            e.printStackTrace();
        }
        String open = null;             // 今开
        try {
            open = (br.readLine());
        } catch (Exception e) {
            open = "--";
            e.printStackTrace();
        }
        String volume = null;           // 成交量(*手)
        try {
            volume = (br.readLine());
        } catch (Exception e) {
            volume = "--";
            e.printStackTrace();
        }
        String high = null;            // 最高
        try {
            high = (br.readLine());
        } catch (Exception e) {
            high = "--";
            e.printStackTrace();
        }
        String up_stop = null;          // 涨停
        try {
            up_stop = (br.readLine());
        } catch (Exception e) {
            up_stop = "--";
            e.printStackTrace();
        }
        String inner_count = null;      // 内盘(*手)
        try {
            inner_count = (br.readLine());
        } catch (Exception e) {
            inner_count = "--";
            e.printStackTrace();
        }
        String amount = null;           // 成交额(*100000000)
        try {
            amount = (br.readLine());
        } catch (Exception e) {
            amount = "--";
            e.printStackTrace();
        }
        String committee = null;        // 委比
        try {
            committee = (br.readLine());
        } catch (Exception e) {
            committee = "--";
            e.printStackTrace();
        }
        String avail_amount = null;     // 流通市值(*100000000)
        try {
            avail_amount = (br.readLine());
        } catch (Exception e) {
            avail_amount = "--";
            e.printStackTrace();
        }
        String pe = null;               // 市盈率
        try {
            pe = (br.readLine());
        } catch (Exception e) {
            pe = "--";
            e.printStackTrace();
        }
        String profit_per = null;       // 每股收益
        try {
            profit_per = (br.readLine());
        } catch (Exception e) {
            profit_per = "--";
            e.printStackTrace();
        }
        String total_volume = null;     // 总股本(*100000000)
        try {
            total_volume = (br.readLine());
        } catch (Exception e) {
            total_volume = "--";
            e.printStackTrace();
        }
        String close  = null;           // 作收
        try {
            close = (br.readLine());
        } catch (Exception e) {
            close = "--";
            e.printStackTrace();
        }
        String turnover = null;         // 换手率
        try {
            turnover = (br.readLine());
        } catch (Exception e) {
            turnover = "--";
            e.printStackTrace();
        }
        String low = null;              // 最低
        try {
            low = (br.readLine());
        } catch (Exception e) {
            low = "--";
            e.printStackTrace();
        }
        String down_stop = null;        // 跌停
        try {
            down_stop = (br.readLine());
        } catch (Exception e) {
            down_stop = "--";
            e.printStackTrace();
        }
        String outer_count = null;      // 外盘(*手)
        try {
            outer_count = (br.readLine());
        } catch (Exception e) {
            outer_count = "--";
            e.printStackTrace();
        }
        String amplitude = null;        // 振幅
        try {
            amplitude = (br.readLine());
        } catch (Exception e) {
            amplitude = "--";
            e.printStackTrace();
        }
        String quantity_ratio = null;   // 量比
        try {
            quantity_ratio = (br.readLine());
        } catch (Exception e) {
            quantity_ratio = "--";
            e.printStackTrace();
        }
        String total_amount = null;     // 总市值(*100000000)
        try {
            total_amount = (br.readLine());
        } catch (Exception e) {
            total_amount = "--";
            e.printStackTrace();
        }
        String pb = null;               // 市净率
        try {
            pb = (br.readLine());
        } catch (Exception e) {
            pb = "--";
            e.printStackTrace();
        }
        String value_per_stock = null;  // 每股净资产
        try {
            value_per_stock = (br.readLine());
        } catch (Exception e) {
            value_per_stock = "--";
            e.printStackTrace();
        }
        String available_stock = null;  // 流通股本(*100000000)
        try {
            available_stock = (br.readLine());
        } catch (Exception e) {
            available_stock = "--";
            e.printStackTrace();
        }

        Integer high_attri = null;
        try {
            high_attri = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            high_attri = new Integer(0);
            e.printStackTrace();
        }
        Integer low_attri = null;
        try {
            low_attri = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            low_attri = new Integer(0);
            e.printStackTrace();
        }
        Integer up_attri = null;
        try {
            up_attri = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            up_attri = new Integer(0);
            e.printStackTrace();
        }
        Integer down_attri = null;
        try {
            down_attri = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            down_attri = new Integer(0);
            e.printStackTrace();
        }

        Double out5 = null;
        try {
            out5 = new Double(Double.parseDouble(br.readLine()));
        } catch (Exception e) {
            out5 = new Double(0);
            e.printStackTrace();
        }
        Double out4 = null;
        try {
            out4 = new Double(Double.parseDouble(br.readLine()));
        } catch (Exception e) {
            out4 = new Double(0);
            e.printStackTrace();
        }
        Double out3 = null;
        try {
            out3 = new Double(Double.parseDouble(br.readLine()));
        } catch (Exception e) {
            out3 = new Double(0);
            e.printStackTrace();
        }
        Double out2 = null;
        try {
            out2 = new Double(Double.parseDouble(br.readLine()));
        } catch (Exception e) {
            out2 = new Double(0);
            e.printStackTrace();
        }
        Double out1 = null;
        try {
            out1 = new Double(Double.parseDouble(br.readLine()));
        } catch (Exception e) {
            out1 = new Double(0);
            e.printStackTrace();
        }
        Integer out5_vol = null;
        try {
            out5_vol = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            out5_vol = new Integer(0);
            e.printStackTrace();
        }
        Integer out4_vol = null;
        try {
            out4_vol = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            out4_vol = new Integer(0);
            e.printStackTrace();
        }
        Integer out3_vol = null;
        try {
            out3_vol = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            out3_vol = new Integer(0);
            e.printStackTrace();
        }
        Integer out2_vol = null;
        try {
            out2_vol = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            out2_vol = new Integer(0);
            e.printStackTrace();
        }
        Integer out1_vol = null;
        try {
            out1_vol = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            out1_vol = new Integer(0);
            e.printStackTrace();
        }

        Double in5 = null;
        try {
            in5 = new Double(Double.parseDouble(br.readLine()));
        } catch (Exception e) {
            in5 = new Double(0);
            e.printStackTrace();
        }
        Double in4 = null;
        try {
            in4 = new Double(Double.parseDouble(br.readLine()));
        } catch (Exception e) {
            in4 = new Double(0);
            e.printStackTrace();
        }
        Double in3 = null;
        try {
            in3 = new Double(Double.parseDouble(br.readLine()));
        } catch (Exception e) {
            in3 = new Double(0);
            e.printStackTrace();
        }
        Double in2 = null;
        try {
            in2 = new Double(Double.parseDouble(br.readLine()));
        } catch (Exception e) {
            in2 = new Double(0);
            e.printStackTrace();
        }
        Double in1 = null;
        try {
            in1 = new Double(Double.parseDouble(br.readLine()));
        } catch (Exception e) {
            in1 = new Double(0);
            e.printStackTrace();
        }
        Integer in5_vol = null;
        try {
            in5_vol = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            in5_vol = new Integer(0);
            e.printStackTrace();
        }
        Integer in4_vol = null;
        try {
            in4_vol = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            in4_vol = new Integer(0);
            e.printStackTrace();
        }
        Integer in3_vol = null;
        try {
            in3_vol = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            in3_vol = new Integer(0);
            e.printStackTrace();
        }
        Integer in2_vol = null;
        try {
            in2_vol = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            in2_vol = new Integer(0);
            e.printStackTrace();
        }
        Integer in1_vol = null;
        try {
            in1_vol = new Integer(Integer.parseInt(br.readLine()));
        } catch (Exception e) {
            in1_vol = new Integer(0);
            e.printStackTrace();
        }

//        StockCurrent stockCurrent = new StockCurrent(price, devia_val, devia_per, open, volume, high, up_stop,
//                inner_count, amount, committee, avail_amount, pe, profit_per, total_volume, close, turnover, low,
//                down_stop, outer_count, amplitude, quantity_ratio, total_amount, pb, value_per_stock, available_stock, high_attri, low_attri, up_attri, down_attri,
//                out5, out4, out3, out2, out1, out5_vol, out4_vol, out3_vol, out2_vol, out1_vol,
//                in5, in4, in3, in2, in1, in5_vol, in4_vol, in3_vol, in2_vol, in1_vol);
        return null;
    }

}