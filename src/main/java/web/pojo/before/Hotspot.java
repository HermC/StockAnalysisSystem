package web.pojo.before;

import java.util.List;

/**
 * Created by NJU on 2016/6/10.
 */
public class Hotspot {
    public String keyword;
    public String date;
    public String description;
    public String drivingEvent;
    public String url;
    public String stockName1;
    public String stockName2;
    public String stockName3;
    public String stockID1;
    public String stockID2;
    public String stockID3;
    public String stockPrice1;
    public String stockPrice2;
    public String stockPrice3;
    public String devia1;
    public String devia2;
    public String devia3;

    public Hotspot(String keyword, String date, String description, String drivingEvent, String url,
                   String stockName1, String stockName2, String stockName3, String stockID1, String stockID2,
                   String stockID3, String stockPrice1, String stockPrice2 ,
                   String stockPrice3, String devia1, String devia2, String devia3) {
        this.keyword = keyword;
        this.date = date;
        this.description = description;
        this.drivingEvent = drivingEvent;
        this.url = url;
        this.stockName1 = stockName1;
        this.stockName2 = stockName2;
        this.stockName3 = stockName3;
        this.stockID1 = stockID1;
        this.stockID2 = stockID2;
        this.stockID3 = stockID3;
        this.stockPrice1 = stockPrice1;
        this.stockPrice2 = stockPrice2;
        this.stockPrice3 = stockPrice3;
        this.devia1 = devia1;
        this.devia2 = devia2;
        this.devia3 = devia3;
    }
}
