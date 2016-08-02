package web.pojo.before;

import web.Tools.FormatA;
import web.vo.before.StockGradeVO;

import java.util.ArrayList;

/**
 * Created by yqq on 2016.5.11.
 */
public class Industry {
    public String id;
    public String industryText;
    public Double pbAssess;    //市净率评估
    public Double peAssess;    //市盈率评估
    public Double updownAssess;//涨跌幅评估
    public Double volumeAssess;//量比评估
    public Double weibiAssess; //委比评估

    public Double score;

    public long rank;           //行业排名

    public ArrayList<StockGradeVO> stockGradeVOs;          //行业内排名股票列表

    public ArrayList<IndustryInnerRank> turnoverRank;       //单项指标排名
    public ArrayList<IndustryInnerRank> deviationRank;
    public ArrayList<IndustryInnerRank> priceRank;


    public String getId() {
        return id;
    }

    public String getIndustryText() {
        return industryText;
    }

    public Double getPbAssess() {
        return pbAssess;
    }

    public Double getPeAssess() {
        return peAssess;
    }

    public Double getUpdownAssess() {
        return updownAssess;
    }

    public Double getVolumeAssess() {
        return volumeAssess;
    }

    public Double getWeibiAssess() {
        return weibiAssess;
    }

    public Double getScore() {
        return score;
    }

    public long getRank() {
        return rank;
    }

    public ArrayList<StockGradeVO> getStockGradeVOs() {
        return stockGradeVOs;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setIndustryText(String industryText) {
        this.industryText = industryText;
    }

    public void setPbAssess(Double pbAssess) {
        this.pbAssess = FormatA.formatDouble(pbAssess);
    }

    public void setPeAssess(Double peAssess) {
        this.peAssess = FormatA.formatDouble(peAssess);
    }

    public void setUpdownAssess(Double updownAssess) {
        this.updownAssess = FormatA.formatDouble(updownAssess);
    }

    public void setVolumeAssess(Double volumeAssess) {
        this.volumeAssess = FormatA.formatDouble(volumeAssess);
    }

    public void setWeibiAssess(Double weibiAssess) {
        this.weibiAssess = FormatA.formatDouble(weibiAssess);
    }

    public void setScore(Double score) {
        this.score = FormatA.formatDouble(score);
    }

    public void setRank(long rank) {
        this.rank = rank;
    }

    public void setStockGradeVOs(ArrayList<StockGradeVO> stockGradeVOs) {
        this.stockGradeVOs = stockGradeVOs;
    }
}
