package web.pojo.before;

import javax.validation.constraints.Null;

/**
 * Created by Hermit on 16/5/29.
 */
public class StockRelativeData {

    public String stockid;
    public String benchid;
    public Double open_mean;
    public Double open_var;
    public Double open_skewness;
    public Double open_kurtosis;
    public Double open_corrcoef;
    public Double volume_mean;
    public Double volume_var;
    public Double volume_skewness;
    public Double volume_kurtosis;
    public Double volume_corrcoef;
    public Double devia_mean;
    public Double devia_var;
    public Double devia_skewness;
    public Double devia_kurtosis;
    public Double devia_corrcoef;


    public Double corrcoef;
    public String description_coef;
    public Double beta;
    public String description_beta;



    public void setCorrcoef(Double corrcoef) {
        this.corrcoef = corrcoef;
        if(corrcoef < 0.1){
            this.description_coef = "该股与大盘几乎不相关";
        }
        if(corrcoef >= 0.1 && corrcoef <= 0.3){
            this.description_coef = "该股与大盘相关性较弱";
        }
        if(corrcoef > 0.3 && corrcoef <= 0.5){
            this.description_coef = "该股与大盘相关性中等";
        }
        if(corrcoef > 0.5 && corrcoef <= 0.8){
            this.description_coef = "该股与大盘相关性较强";
        }
        if(corrcoef > 0.8 ){
            this.description_coef = "该股与大盘极强相关";
        }

    }

    public void setBeta(Double beta) {

        this.beta = beta;
        String betaString = Double.toString(beta);
        if(beta > 0){
            this.description_beta = "该股市场利益与大盘正相关,资金在该股收益是在大盘中收益的"+betaString+"倍";
        }
        if(beta < 0 ){
            this.description_beta = "该股市场利益与大盘负相关,资金在该股收益是大盘亏损的"+betaString+"倍";
        }
        if(beta == 0){
            this.description_beta = "";
        }
    }

    public String getStockid() {
        return stockid;
    }

    public void setStockid(String stockid) {
        this.stockid = stockid;
    }

    public String getBenchid() {
        return benchid;
    }

    public void setBenchid(String benchid) {
        this.benchid = benchid;
    }

    public Double getOpen_mean() {
        return open_mean;
    }

    public void setOpen_mean(Double open_mean) {
        if (open_mean!=null) {
            this.open_mean = open_mean;
        } else {
            this.open_mean = new Double(0);
        }
    }

    public Double getOpen_var() {
        return open_var;
    }

    public void setOpen_var(Double open_var) {
        if (open_var!=null) {
            this.open_var = open_var;
        } else {
            this.open_var = new Double(0);
        }
    }

    public Double getOpen_skewness() {
        return open_skewness;
    }

    public void setOpen_skewness(Double open_skewness) {
        if (open_skewness!=null) {
            this.open_skewness = open_skewness;
        } else {
            this.open_skewness = new Double(0);
        }
    }

    public Double getOpen_kurtosis() {
        return open_kurtosis;
    }

    public void setOpen_kurtosis(Double open_kurtosis) {
        if (open_kurtosis!=null) {
            this.open_kurtosis = open_kurtosis;
        } else {
            this.open_kurtosis = new Double(0);
        }
    }

    public Double getOpen_corrcoef() {
        return open_corrcoef;
    }

    public void setOpen_corrcoef(Double open_corrcoef) {
        if (open_corrcoef!=null) {
            this.open_corrcoef = open_corrcoef;
        } else {
            this.open_corrcoef = open_corrcoef;
        }
    }

    public Double getVolume_mean() {
        return volume_mean;
    }

    public void setVolume_mean(Double volume_mean) {
        if (volume_mean!=null) {
            this.volume_mean = volume_mean;
        } else {
            this.volume_mean = volume_mean;
        }
    }

    public Double getVolume_var() {
        return volume_var;
    }

    public void setVolume_var(Double volume_var) {
        if (volume_var!=null) {
            this.volume_var = volume_var;
        } else {
            this.volume_var = volume_var;
        }
    }

    public Double getVolume_skewness() {
        return volume_skewness;
    }

    public void setVolume_skewness(Double volume_skewness) {
        if (volume_skewness!=null) {
            this.volume_skewness = volume_skewness;
        } else {
            this.volume_skewness = volume_skewness;
        }
    }

    public Double getVolume_kurtosis() {
        return volume_kurtosis;
    }

    public void setVolume_kurtosis(Double volume_kurtosis) {
        if (volume_kurtosis!=null) {
            this.volume_kurtosis = volume_kurtosis;
        } else {
            this.volume_kurtosis = volume_kurtosis;
        }
    }

    public Double getVolume_corrcoef() {
        return volume_corrcoef;
    }

    public void setVolume_corrcoef(Double volume_corrcoef) {
        if (volume_corrcoef!=null) {
            this.volume_corrcoef = volume_corrcoef;
        } else {
            this.volume_corrcoef = volume_corrcoef;
        }
    }

    public Double getDevia_mean() {
        return devia_mean;
    }

    public void setDevia_mean(Double devia_mean) {
        if (devia_mean!=null) {
            this.devia_mean = devia_mean;
        } else {
            this.devia_mean = devia_mean;
        }
    }

    public Double getDevia_var() {
        return devia_var;
    }

    public void setDevia_var(Double devia_var) {
        if (devia_var!=null) {
            this.devia_var = devia_var;
        } else {
            this.devia_var = devia_var;
        }
    }

    public Double getDevia_skewness() {
        return devia_skewness;
    }

    public void setDevia_skewness(Double devia_skewness) {
        if (devia_skewness!=null) {
            this.devia_skewness = devia_skewness;
        } else {
            this.devia_skewness = devia_skewness;
        }
    }

    public Double getDevia_kurtosis() {
        return devia_kurtosis;
    }

    public void setDevia_kurtosis(Double devia_kurtosis) {
        if (devia_kurtosis!=null) {
            this.devia_kurtosis = devia_kurtosis;
        } else {
            this.devia_kurtosis = devia_kurtosis;
        }
    }

    public Double getDevia_corrcoef() {
        return devia_corrcoef;
    }

    public void setDevia_corrcoef(Double devia_corrcoef) {
        if (devia_corrcoef!=null) {
            this.devia_corrcoef = devia_corrcoef;
        } else {
            this.devia_corrcoef = devia_corrcoef;
        }
    }
}
