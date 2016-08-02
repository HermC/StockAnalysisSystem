package web.vo.before;

import web.Tools.FormatA;

import java.util.ArrayList;

/**
 * Created by zcj on 16/5/8.
 */
public class StockGradeVO implements Comparable {
    public String id;
    public String name;
    public long industryid;
    public long weight;
    public Double score;  //对应数据

    public Double pbAssess;    //市净率评估
    public Double peAssess;    //市盈率评估

    public Double updownAssess;//涨跌幅评估
    public Double volumeAssess;//量比评估
    public Double weibiAssess; //委比评估

    public void setName(String name) {
        this.name = name;
    }

    public long count;        //行业计数
    public long rank;           //行业内排名（暂时先不要）

    public String rankString = "";
    public String countString = "";

    public ArrayList<GradeStatistics> statisticses;

    public long getCount() {
        return count;
    }

    public long getRank() {
        return rank;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public long getIndustryid() {
        return industryid;
    }

    public long getWeight() {
        return weight;
    }

    public Double getScore() {
        return score;
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

    public void setCount(long count) {
        this.count = count;
        if(count<10){
            this.countString = "0"+count;
        }else{
            this.countString = ""+count;
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

    public ArrayList<GradeStatistics> getStatisticses() {
        return statisticses;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setIndustryid(long industryid) {
        this.industryid = industryid;
    }

    public void setWeight(long weight) {
        this.weight = weight;
    }

    public void setScore(Double score) {
        this.score =  FormatA.formatDouble(score);
    }

    public void setPbAssess(Double pbAssess) {
        this.pbAssess =  FormatA.formatDouble(pbAssess);
    }

    public void setPeAssess(Double peAssess) {
        this.peAssess =  FormatA.formatDouble(peAssess);
    }

    public void setUpdownAssess(Double updownAssess) {
        this.updownAssess =  FormatA.formatDouble(updownAssess);
    }

    public void setVolumeAssess(Double volumeAssess) {
        this.volumeAssess =  FormatA.formatDouble(volumeAssess);
    }

    public void setWeibiAssess(Double weibiAssess) {
        this.weibiAssess =  FormatA.formatDouble(weibiAssess);
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public void setStatisticses(ArrayList<GradeStatistics> statisticses) {
        this.statisticses = statisticses;
    }

    @Override
    public int compareTo(Object o) {
        StockGradeVO temp = (StockGradeVO)o;

        if(temp.score > this.score)
            return 1;
        if (temp.score < this.score)
            return -1;
        if (temp.score == this.score)
            return  0;
        return 0;
    }
}
