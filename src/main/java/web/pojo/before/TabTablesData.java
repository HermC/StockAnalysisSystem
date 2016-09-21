package web.pojo.before;

import java.time.LocalDate;

/**
 * Created by yqq on 2016.5.15.
 */
public class TabTablesData {
    public String date;

    public String dateNum;

    public Double open;

    public Double close;

    public Double high;

    public Double low;

    public Long volume;

    public Double amount;

    public Double ma5;
    public Double ma10;
    public Double ma20;
    public Double ma30;

    public Double macd;
    public Double dif;
    public Double dea;

    public Double atr;

    public Double slowK;
    public Double slowD;
    public Double slowJ;

    public Double rsi6;
    public Double rsi12;
    public Double rsi24;

    public void setRsi6(Double rsi6) {
        if(rsi6 == null)
            this.rsi6 = null;
        else
            this.rsi6 = rsi6;
    }

    public void setRsi24(Double rsi24) {
        if(rsi24 == null)
            this.rsi24 = null;
        else
        this.rsi24 = rsi24;
    }

    public void setRsi12(Double rsi12) {
        if(rsi12 == null)
            this.rsi12 = null;
        else
            this.rsi12 = rsi12;
    }

    public Double boll_upper;

    public Double boll_middle;


    public Double boll_low;

    public Double amplitude;

    public Double deviation_per;

    public void setDeviation_per(Double deviation_per) {
        this.deviation_per = deviation_per;
    }

    public void setDeviation_val(Double deviation_val) {
        this.deviation_val = deviation_val;
    }

    public Double deviation_val;

    public void setAmplitude(Double amplitude) {
        this.amplitude = amplitude;
    }

    public void setDate(String date) {
        this.dateNum = date.substring(2);
        LocalDate temp = LocalDate.parse(date);
        this.date = temp.getMonth().toString()+" "+temp.getDayOfMonth()+","+temp.getYear();
    }

    public void setOpen(Double open) {
        try{
            if (open!=null) {
                this.open = open;
            } else {
                this.open = new Double(0);
            }

        }catch(Exception ex){
            this.open = new Double(0);
        }
    }

    public void setClose(Double close) {
        try{
            if (close!=null) {
                this.close = close;
            } else {
                this.close = new Double(0);
            }
        }catch(Exception ex){
            this.close = new Double(0);
        }
    }

    public void setHigh(Double high) {
        try {
            if (high!=null) {
                this.high = high;
            } else {
                this.high = new Double(0);
            }
        }catch (Exception ex) {
            this.high = new Double(0);
        }
    }

    public void setLow(Double low) {
        try {
            if (low!=null) {
                this.low = low;
            } else {
                this.low = new Double(0);
            }
        }catch (Exception ex){
            this.low = new Double(0);
        }
    }

    public void setVolume(Long volume) {
        try {
            if (volume!=null) {
                this.volume = volume;
            } else {
                this.volume = new Long(0);
            }
        }catch (Exception ex){
            this.volume = new Long(0);
        }
    }

    public void setAmount(Double amount) {
        try{
            if (amount!=null) {
                this.amount = amount;
            } else {
                this.amount = new Double(0);
            }
        }catch (Exception ex) {
            this.amount = new Double(0);
        }
    }

    public void setMa5(Double ma5) {
        try{
            if (ma5!=null) {
                this.ma5 = ma5;
            } else {
                this.ma5 = new Double(0);
            }
        }catch (Exception ex) {
            this.ma5 = new Double(0);
        }
    }

    public void setMa10(Double ma10) {

        try {
            if (ma10!=null) {
                this.ma10 = ma10;
            } else {
                this.ma10 = new Double(0);
            }
        }catch (Exception ex) {
            this.ma10 = new Double(0);
        }
    }

    public void setMa20(Double ma20) {

        try {
            if (ma20!=null) {
                this.ma20 = ma20;
            } else {
                this.ma20 = new Double(0);
            }
        }catch (Exception ex){
            this.ma20 = new Double(0);
        }
    }

    public void setMa30(Double ma30) {

        try {
            if (ma30!=null) {
                this.ma30 = ma30;
            } else {
                this.ma30 = new Double(0);
            }
        }catch (Exception ex) {
            this.ma30 = new Double(0);
        }
    }

    public void setMacd(Double macd) {
        try {
            if (macd!=null) {
                this.macd = macd;
            } else {
                this.macd = new Double(0);
            }
        }catch (Exception ex){
            this.macd = new Double(0);
        }
    }

    public void setDif(Double dif) {
        try {
            if (dif!=null) {
                this.dif = dif;
            } else {
                this.dif = new Double(0);
            }
        }catch (Exception ex){
            this.dif = new Double(0);
        }
    }

    public void setDea(Double dea) {
        try {
            if (dea!=null) {
                this.dea = dea;
            } else {
                this.dea = new Double(0);
            }
        }catch (Exception ex){
            this.dea = new Double(0);
        }
    }

    public void setAtr(Double atr) {
        try {
            if (atr!=null) {
                this.atr = atr;
            } else {
                this.atr = new Double(0);
            }
        }catch (Exception ex){
            this.atr = new Double(0);
        }
    }

    public void setSlowK(Double slowK) {
        try {
            if (slowK!=null) {
                this.slowK = slowK;
            } else {
                this.slowK = new Double(0);
            }
        }catch (Exception ex){
            this.slowK = new Double(0);
        }
    }

    public void setSlowD(Double slowD) {
        try {
            if (slowD!=null) {
                this.slowD = slowD;
            } else {
                this.slowD = new Double(0);
            }
        }catch (Exception ex){
            this.slowD = new Double(0);
        }
    }

    public void setSlowJ(Double slowJ) {
        try {
            if (slowJ!=null) {
                this.slowJ = slowJ;
            } else {
                this.slowJ = new Double(0);
            }
        }catch (Exception ex){
            this.slowJ = new Double(0);
        }
    }

    public void setBoll_upper(Double boll_upper) {
        try {
            if (boll_upper!=null) {
                this.boll_upper = boll_upper;
            } else {
                this.boll_upper = new Double(0);
            }
        }catch (Exception ex){
            this.boll_upper = new Double(0);
        }
    }

    public void setBoll_middle(Double boll_middle) {
        try {
            if (boll_middle!=null) {
                this.boll_middle = boll_middle;
            } else {
                this.boll_middle = new Double(0);
            }
        }catch (Exception ex){
            this.boll_middle = new Double(0);
        }
    }

    public void setBoll_low(Double boll_low) {
        try {
            if (boll_low!=null) {
                this.boll_low = boll_low;
            } else {
                this.boll_low = new Double(0);
            }
        }catch (Exception ex){
            this.boll_low = new Double(0);
        }
    }

}
