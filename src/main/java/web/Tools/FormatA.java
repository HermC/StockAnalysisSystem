package web.Tools;

import java.text.DecimalFormat;

/**
 * Created by yqq on 2016.5.26.
 */
public class FormatA {
    private static DecimalFormat df   = new DecimalFormat("######0.00");

    public static Double formatDouble(Double d){
        return Double.valueOf(df.format(d));
    }
}
