package web.vo.before;

import web.pojo.before.ForecastData;
import web.pojo.before.TabTablesData;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/26.
 */
public class StockComparison {
    public String id;
    public String name;
    public StockGradeVO stockGradeVO;

    public ArrayList<ForecastData> forecastData;
    public ArrayList<TabTablesData> tabTablesDatas;

    public ArrayList<ForecastData> getForecastData() {
        return forecastData;
    }

    public void setForecastData(ArrayList<ForecastData> forecastData) {
        this.forecastData = forecastData;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public StockGradeVO getStockGradeVO() {
        return stockGradeVO;
    }

    public void setStockGradeVO(StockGradeVO stockGradeVO) {
        this.stockGradeVO = stockGradeVO;
    }

    public ArrayList<TabTablesData> getTabTablesDatas() {
        return tabTablesDatas;
    }

    public void setTabTablesDatas(ArrayList<TabTablesData> tabTablesDatas) {
        this.tabTablesDatas = tabTablesDatas;
    }
}
