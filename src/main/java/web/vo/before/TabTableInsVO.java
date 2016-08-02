package web.vo.before;

import web.pojo.before.TabTablesData;

/**
 * Created by linyufan on 16/5/21.
 * 在tabtable上再包一层,可以两个同时兼有
 */
public class TabTableInsVO {
    public TabTablesData tabTablesData;

    //grade = 1 表示string非空
    //grade = 2 表示下跌
    //grade = 3 表示上涨
    public String kdjIns = "";
    public int kdjgrade = 0;

    public String macdIns = "";
    public int macdgrade = 0;

    public String rsiIns = "";
    public int rsigrade = 0;

    public String bollIns = "";
    public int bollgrade = 0;

    public int getKdjgrade() {
        return kdjgrade;
    }

    public void setKdjgrade(int kdjgrade) {
        this.kdjgrade = kdjgrade;
    }

    public int getMacdgrade() {
        return macdgrade;
    }

    public void setMacdgrade(int macdgrade) {
        this.macdgrade = macdgrade;
    }

    public int getRsigrade() {
        return rsigrade;
    }

    public void setRsigrade(int rsigrade) {
        this.rsigrade = rsigrade;
    }

    public int getBollgrade() {
        return bollgrade;
    }

    public void setBollgrade(int bollgrade) {
        this.bollgrade = bollgrade;
    }


    public TabTablesData getTabTablesData() {
        return tabTablesData;
    }

    public void setTabTablesData(TabTablesData tabTablesData) {
        this.tabTablesData = tabTablesData;
    }

    public String getKdjIns() {
        return kdjIns;
    }

    public void setKdjIns(String kdjIns) {
        this.kdjIns = kdjIns;
    }

    public String getMacdIns() {
        return macdIns;
    }

    public void setMacdIns(String macdIns) {
        this.macdIns = macdIns;
    }

    public String getRsiIns() {
        return rsiIns;
    }

    public void setRsiIns(String rsiIns) {
        this.rsiIns = rsiIns;
    }

    public String getBollIns() {
        return bollIns;
    }

    public void setBollIns(String bollIns) {
        this.bollIns = bollIns;
    }
}
