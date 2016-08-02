package web.pojo.before;

import java.time.LocalDate;
import java.util.Date;

/**
 * Created by zcj on 16/5/8.
 * 公司相关信息
 */
public class StockInfo {
    public String stockid;
    public String name;             //名字
    public String industry;           //行业类型
    public Long industryid;
    public String fullName;        //全部名字
    public String listDate;          //上市日期
    //    public LocalDate dislistdate;   //摘牌日期
    public String status;         //公司状态
    public String description;   //公司简介

    public void setIndustryid(Long industryid) {
        this.industryid = industryid;
    }

    public void setStockid(String stockid) {
        this.stockid = stockid;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setListDate(String listDate) {
        this.listDate = listDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStockid() {
        return stockid;
    }

    public String getName() {
        return name;
    }

    public String getIndustry() {
        return industry;
    }

    public String getFullName() {
        return fullName;
    }

    public String getListDate() {
        return listDate;
    }

    public String getStatus() {
        return status;
    }

    public String getDescription() {
        return description;
    }
}
