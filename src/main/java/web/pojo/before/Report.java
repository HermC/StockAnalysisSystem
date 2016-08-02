package web.pojo.before;

/**
 * Created by zcj on 16/5/8.
 * 股票相关新闻
 */
public class Report {
    public String title;
    public String url;
    public String date;
    public String author;
    public String source;

    public Report(String title, String url, String date, String author, String source) {
        this.title = title;
        this.url = url;
        this.date = date;
        this.author = author;
        this.source = source;
    }
}
