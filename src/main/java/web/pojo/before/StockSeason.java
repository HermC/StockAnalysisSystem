package web.pojo.before;

/**
 * Created by linyufan on 16/6/6.
 */
public class StockSeason {
    public String stockid;
    public String date;

    public Double tbmgly;
    public String tbmgly_String = "摊薄每股利益";

    public Double jqmgly;
    public String jqmgly_String = "加权每股利益";//

    public Double mgsy_tzh;
    public String mgsy_tzh_String = "每股收益_调整后";//

    public Double kcfjcxsyhdmgsy;
    public String kcfjcxsyhdmgsy_String = "扣除非经常性损益后的每股收益";


    public Double mgjzc_tzq;
    public String mgjzc_tzq_String = "每股净资产_调整前";

    /**/
    public Double mgjzc_tzh;
    public String mgjzc_tzh_String = "每股净资产_调整后";//

    public Double mgjyxxjl;
    public String mgjyxxjl_String = "每股经营性现金流";

    public Double mgzbgjj;
    public String mgzbgjj_String ="每股资本公积金";

    public Double mgwfplr;
    public String mgwfplr_String = "每股未分配利润";//

    public Double tzhdmgjzc;
    public String tzhdmgjzc_String = "调整后的每股净资产";

    public Double zzclrl;
    public String zzclrl_String = "总资产利润率";//

    public Double zyywlrl;
    public String zyywlrl_String = "主营业务利润率";//

    public Double zzcjlrl;
    public String zzcjlrl_String = "总资产净利润率";

    public Double cbfylrl;
    public String cbfylrl_String = "成本费用利润率";

    public Double yylrl;
    public String yylrl_String = "营业利润率";

    public Double zyywcbl;
    public String zyywcbl_String = "主营业务成本率";

    public Double xsjll;
    public String xsjll_String = "销售净利率";

    public Double gbbcl;
    public String gbbcl_String = "股本报酬率";

    public Double jzcbcl;
    public String jzcbcl_String = "净资产报酬率";

    public Double zcbcl;
    public String zcbcl_String = "资产报酬率";//

    public Double ssmll;
    public String ssmll_String = "销售毛利率";

    public Double sxfybz;
    public String sxfybz_String = "三项费用比重";

    public Double fzybz;
    public String fzybz_String = "非主营比重";

    public Double zylrbz;
    public String zylrbz_String = "主营利润比重";

    /**/
    public Double gxffl;
    public String gxffl_String = "股息发放率";

    /**/
    public Double tzsyl;
    public String tzsyl_String = "投资收益率";


    public Double zyywlr;
    public String zyywlr_String = "主营业务利润";

    public Double jzcsyl;
    public String jzcsyl_String = "净资产收益率";

    public Double jqjzcsyl;
    public String jqjzcsyl_String = "加权净资产收益率";

    public Double kcfjcxsyhdjlr;
    public String kcfjcxsyhdjlr_String = "扣除非经常性损益后的净利润";

    public Double zyywsrzzl;
    public String zyywsrzzl_String = "主营业务收入增长率";

    public Double jlrzzl;
    public String jlrzzl_String = "净利润增长率";

    public Double jzczzl;
    public String jzczzl_String = "净资产增长率";

    public Double zzczzl;
    public String zzczzl_String = "总资产增长率";

    
    public void setZzczzl_String(String zzczzl_String) {
        this.zzczzl_String = zzczzl_String;
    }

    public void setStockid(String stockid) {
        this.stockid = stockid;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setTbmgly(Double tbmgly) {
        if (tbmgly!=null) {
            this.tbmgly = tbmgly;
        } else {
            this.tbmgly = new Double(0);
        }
    }

    public void setTbmgly_String(String tbmgly_String) {
        this.tbmgly_String = tbmgly_String;
    }

    public void setJqmgly(Double jqmgly) {
        if (jqmgly!=null) {
            this.jqmgly = jqmgly;
        } else {
            this.jqmgly = new Double(0);
        }
    }

    public void setJqmgly_String(String jqmgly_String) {
        this.jqmgly_String = jqmgly_String;
    }

    public void setMgsy_tzh(Double mgsy_tzh) {
        if (mgsy_tzh!=null) {
            this.mgsy_tzh = mgsy_tzh;
        } else {
            this.mgsy_tzh = new Double(0);
        }
    }

    public void setMgsy_tzh_String(String mgsy_tzh_String) {
        this.mgsy_tzh_String = mgsy_tzh_String;
    }

    public void setKcfjcxsyhdmgsy(Double kcfjcxsyhdmgsy) {
        if (kcfjcxsyhdmgsy!=null) {
            this.kcfjcxsyhdmgsy = kcfjcxsyhdmgsy;
        } else {
            this.kcfjcxsyhdmgsy = new Double(0);
        }
    }

    public void setKcfjcxsyhdmgsy_String(String kcfjcxsyhdmgsy_String) {
        this.kcfjcxsyhdmgsy_String = kcfjcxsyhdmgsy_String;
    }

    public void setMgjzc_tzq(Double mgjzc_tzq) {
        if (mgjzc_tzq!=null) {
            this.mgjzc_tzq = mgjzc_tzq;
        } else {
            this.mgjzc_tzq = new Double(0);
        }
    }

    public void setMgjzc_tzq_String(String mgjzc_tzq_String) {
        this.mgjzc_tzq_String = mgjzc_tzq_String;
    }

    public void setMgjzc_tzh(Double mgjzc_tzh) {
        if (mgjzc_tzh!=null) {
            this.mgjzc_tzh = mgjzc_tzh;
        } else {
            this.mgjzc_tzh = new Double(0);
        }
    }

    public void setMgjzc_tzh_String(String mgjzc_tzh_String) {
        this.mgjzc_tzh_String = mgjzc_tzh_String;
    }

    public void setMgjyxxjl(Double mgjyxxjl) {
        if (mgjyxxjl!=null) {
            this.mgjyxxjl = mgjyxxjl;
        } else {
            this.mgjyxxjl = new Double(0);
        }
    }

    public void setMgjyxxjl_String(String mgjyxxjl_String) {
        this.mgjyxxjl_String = mgjyxxjl_String;
    }

    public void setMgzbgjj(Double mgzbgjj) {
        if (mgzbgjj!=null) {
            this.mgzbgjj = mgzbgjj;
        } else {
            this.mgzbgjj = new Double(0);
        }
    }

    public void setMgzbgjj_String(String mgzbgjj_String) {
        this.mgzbgjj_String = mgzbgjj_String;
    }

    public void setMgwfplr(Double mgwfplr) {
        if (mgwfplr!=null) {
            this.mgwfplr = mgwfplr;
        } else {
            this.mgwfplr = new Double(0);
        }
    }

    public void setMgwfplr_String(String mgwfplr_String) {
        this.mgwfplr_String = mgwfplr_String;
    }

    public void setTzhdmgjzc(Double tzhdmgjzc) {
        if (tzhdmgjzc!=null) {
            this.tzhdmgjzc = tzhdmgjzc;
        } else {
            this.tzhdmgjzc = new Double(0);
        }
    }

    public void setTzhdmgjzc_String(String tzhdmgjzc_String) {
        this.tzhdmgjzc_String = tzhdmgjzc_String;
    }

    public void setZzclrl(Double zzclrl) {
        if (zzclrl!=null) {
            this.zzclrl = zzclrl;
        } else {
            this.zzclrl = new Double(0);
        }
    }

    public void setZzclrl_String(String zzclrl_String) {
        this.zzclrl_String = zzclrl_String;
    }

    public void setZyywlrl(Double zyywlrl) {
        if (zyywlrl!=null) {
            this.zyywlrl = zyywlrl;
        } else {
            this.zyywlrl = new Double(0);
        }
    }

    public void setZyywlrl_String(String zyywlrl_String) {
        this.zyywlrl_String = zyywlrl_String;
    }

    public void setZzcjlrl(Double zzcjlrl) {
        if (zzcjlrl!=null) {
            this.zzcjlrl = zzcjlrl;
        } else {
            this.zzcjlrl = new Double(0);
        }
    }

    public void setZzcjlrl_String(String zzcjlrl_String) {
        this.zzcjlrl_String = zzcjlrl_String;
    }

    public void setCbfylrl(Double cbfylrl) {
        if (cbfylrl!=null) {
            this.cbfylrl = cbfylrl;
        } else {
            this.cbfylrl = new Double(0);
        }
    }

    public void setCbfylrl_String(String cbfylrl_String) {
        this.cbfylrl_String = cbfylrl_String;
    }

    public void setYylrl(Double yylrl) {
        if (yylrl!=null) {
            this.yylrl = yylrl;
        } else {
            this.yylrl = new Double(0);
        }
    }

    public void setYylrl_String(String yylrl_String) {
        this.yylrl_String = yylrl_String;
    }

    public void setZyywcbl(Double zyywcbl) {
        if (zyywcbl!=null) {
            this.zyywcbl = zyywcbl;
        } else {
            this.zyywcbl = new Double(0);
        }
    }

    public void setZyywcbl_String(String zyywcbl_String) {
        this.zyywcbl_String = zyywcbl_String;
    }

    public void setXsjll(Double xsjll) {
        if (xsjll!=null) {
            this.xsjll = xsjll;
        } else {
            this.xsjll = new Double(0);
        }
    }

    public void setXsjll_String(String xsjll_String) {
        this.xsjll_String = xsjll_String;
    }

    public void setGbbcl(Double gbbcl) {
        if (gbbcl!=null) {
            this.gbbcl = gbbcl;
        } else {
            this.gbbcl = new Double(0);
        }
    }

    public void setGbbcl_String(String gbbcl_String) {
        this.gbbcl_String = gbbcl_String;
    }

    public void setJzcbcl(Double jzcbcl) {
        if (jzcbcl!=null) {
            this.jzcbcl = jzcbcl;
        } else {
            this.jzcbcl = new Double(0);
        }
    }

    public void setJzcbcl_String(String jzcbcl_String) {
        this.jzcbcl_String = jzcbcl_String;
    }

    public void setZcbcl(Double zcbcl) {
        if (zcbcl!=null) {
            this.zcbcl = zcbcl;
        } else {
            this.zcbcl = new Double(0);
        }
    }

    public void setZcbcl_String(String zcbcl_String) {
        this.zcbcl_String = zcbcl_String;
    }

    public void setSsmll(Double ssmll) {
        if (ssmll!=null) {
            this.ssmll = ssmll;
        } else {
            this.ssmll = new Double(0);
        }
    }

    public void setSsmll_String(String ssmll_String) {
        this.ssmll_String = ssmll_String;
    }

    public void setSxfybz(Double sxfybz) {
        if (sxfybz!=null) {
            this.sxfybz = sxfybz;
        } else {
            this.sxfybz = new Double(0);
        }
    }

    public void setSxfybz_String(String sxfybz_String) {
        this.sxfybz_String = sxfybz_String;
    }

    public void setFzybz(Double fzybz) {
        if (fzybz!=null) {
            this.fzybz = fzybz;
        } else {
            this.fzybz = new Double(0);
        }
    }

    public void setFzybz_String(String fzybz_String) {
        this.fzybz_String = fzybz_String;
    }

    public void setZylrbz(Double zylrbz) {
        if (zylrbz!=null) {
            this.zylrbz = zylrbz;
        } else {
            this.zylrbz = new Double(0);
        }
    }

    public void setZylrbz_String(String zylrbz_String) {
        this.zylrbz_String = zylrbz_String;
    }

    public void setGxffl(Double gxffl) {
        if (gxffl!=null) {
            this.gxffl = gxffl;
        } else {
            this.gxffl = new Double(0);
        }
    }

    public void setGxffl_String(String gxffl_String) {
        this.gxffl_String = gxffl_String;
    }

    public void setTzsyl(Double tzsyl) {
        if (tzsyl!=null) {
            this.tzsyl = tzsyl;
        } else {
            this.tzsyl = new Double(0);
        }
    }

    public void setTzsyl_String(String tzsyl_String) {
        this.tzsyl_String = tzsyl_String;
    }

    public void setZyywlr(Double zyywlr) {
        if (zyywlr!=null) {
            this.zyywlr = zyywlr;
        } else {
            this.zyywlr = new Double(0);
        }
    }

    public void setZyywlr_String(String zyywlr_String) {
        this.zyywlr_String = zyywlr_String;
    }

    public void setJzcsyl(Double jzcsyl) {
        if (jzcsyl!=null) {
            this.jzcsyl = jzcsyl;
        } else {
            this.jzcsyl = new Double(0);
        }
    }

    public void setJzcsyl_String(String jzcsyl_String) {
        this.jzcsyl_String = jzcsyl_String;
    }

    public void setJqjzcsyl(Double jqjzcsyl) {
        if (jqjzcsyl!=null) {
            this.jqjzcsyl = jqjzcsyl;
        } else {
            this.jqjzcsyl = new Double(0);
        }
    }

    public void setJqjzcsyl_String(String jqjzcsyl_String) {
        this.jqjzcsyl_String = jqjzcsyl_String;
    }

    public void setKcfjcxsyhdjlr(Double kcfjcxsyhdjlr) {
        if (kcfjcxsyhdjlr!=null) {
            this.kcfjcxsyhdjlr = kcfjcxsyhdjlr;
        } else {
            this.kcfjcxsyhdjlr = new Double(0);
        }
    }

    public void setKcfjcxsyhdjlr_String(String kcfjcxsyhdjlr_String) {
        this.kcfjcxsyhdjlr_String = kcfjcxsyhdjlr_String;
    }

    public void setZyywsrzzl(Double zyywsrzzl) {
        if (zyywsrzzl!=null) {
            this.zyywsrzzl = zyywsrzzl;
        } else {
            this.zyywsrzzl = new Double(0);
        }
    }

    public void setZyywsrzzl_String(String zyywsrzzl_String) {
        this.zyywsrzzl_String = zyywsrzzl_String;
    }

    public void setJlrzzl(Double jlrzzl) {
        if (jlrzzl!=null) {
            this.jlrzzl = jlrzzl;
        } else {
            this.jlrzzl = new Double(0);
        }
    }

    public void setJlrzzl_String(String jlrzzl_String) {
        this.jlrzzl_String = jlrzzl_String;
    }

    public void setJzczzl(Double jzczzl) {
        if (jzczzl!=null) {
            this.jzczzl = jzczzl;
        } else {
            this.jzczzl = new Double(0);
        }
    }

    public void setJzczzl_String(String jzczzl_String) {
        this.jzczzl_String = jzczzl_String;
    }

    public void setZzczzl(Double zzczzl) {
        if (zzczzl!=null) {
            this.zzczzl = zzczzl;
        } else {
            this.zzczzl = new Double(0);
        }
    }






}
