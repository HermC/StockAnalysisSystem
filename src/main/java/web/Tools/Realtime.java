package web.Tools;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import web.pojo.before.News;
import web.pojo.before.Report;
import web.pojo.before.StockCurrent;
import web.pojo.before.BenchCurrent;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by NJU on 2016/5/25.
 */
public class Realtime {
    public static StockCurrent getStockRealtime(String id) throws Exception{
        ArrayList<String> parameter = new ArrayList<String>();
        int open_attri = 0;
        int high_attri = 0;
        int low_attri = 0;
        int up_attri = 0;
        int down_attri = 0;

        Document doc = Jsoup.connect("http://gupiao.baidu.com/stock/"+id+".html").get();

        Element price_ele = doc.select("#app-wrap > div.stock-info > div > div > strong").get(0);
//        System.out.println(price_ele.text());
        parameter.add(price_ele.text());
        Element devia_val = doc.select("#app-wrap > div.stock-info > div > div> span:nth-child(2)").get(0);
//        System.out.println(devia_val.text());
        parameter.add(devia_val.text());
        Element devia_per = doc.select("#app-wrap > div.stock-info > div > div> span:nth-child(3)").get(0);
//        System.out.println(devia_per.text());
        parameter.add(devia_per.text());

        Elements sel = doc.getElementsByClass("line1");
        for(Element ele : sel) {
            String[] data = ele.text().split(" ");
            for (int i=1;i<data.length;i+=2) {
                parameter.add(data[i]);
            }
        }

        sel = doc.getElementsByClass("line2");
        for(Element ele : sel) {
            String[] data = ele.text().split(" ");
            for (int i=1;i<data.length;i+=2) {
                parameter.add(data[i]);
            }
        }

        Element attri = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.line1 > dl:nth-child(1) > dd").get(0);
        if(attri.attr("class").equals("s-up")) {
            open_attri = 1;
        }
        else if(attri.attr("class").equals("s-down")) {
            open_attri = -1;
        }
        else {
            open_attri = 0;
        }

        attri = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.line1 > dl:nth-child(3) > dd").get(0);
        if(attri.attr("class").equals("s-up")) {
            high_attri = 1;
        }
        else if(attri.attr("class").equals("s-down")) {
            high_attri = -1;
        }
        else {
            high_attri = 0;
        }

        attri = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.line2 > dl:nth-child(3) > dd").get(0);
        if(attri.attr("class").equals("s-up")) {
            low_attri = 1;
        }
        else if(attri.attr("class").equals("s-down")) {
            low_attri = -1;
        }
        else {
            low_attri = 0;
        }

        attri = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.line1 > dl:nth-child(4) > dd").get(0);
        if(attri.attr("class").equals("s-up")) {
            up_attri = 1;
        }
        else if(attri.attr("class").equals("s-down")) {
            up_attri = -1;
        }
        else {
            up_attri = 0;
        }

        attri = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.line2 > dl:nth-child(4) > dd").get(0);
        if(attri.attr("class").equals("s-up")) {
            down_attri = 1;
        }
        else if(attri.attr("class").equals("s-down")) {
            down_attri = -1;
        }
        else {
            down_attri = 0;
        }

        ArrayList<String> fiveranger = new ArrayList<>();
        JSONArray dataarray = new JSONArray();

        String url = "http://gupiao.baidu.com/api/stocks/stocktimeline?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code=" + id;
        URL getUrl = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection();
        connection.connect();
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
        String lines=reader.readLine();
        JSONObject record = new JSONObject(lines);
        dataarray = record.getJSONArray("ask");
        for (int i=0;i<dataarray.length();i++) {
            fiveranger.add(String.valueOf(dataarray.getJSONObject(i).get("price")));
        }
        for (int i=0;i<dataarray.length();i++) {
            fiveranger.add(String.valueOf(((int)(dataarray.getJSONObject(i).get("volume")))/100));
        }
        dataarray = record.getJSONArray("bid");
        for (int i=0;i<dataarray.length();i++) {
            fiveranger.add(String.valueOf(dataarray.getJSONObject(i).get("price")));
        }
        for (int i=0;i<dataarray.length();i++) {
            fiveranger.add(String.valueOf(((int)(dataarray.getJSONObject(i).get("volume")))/100));
        }

        StockCurrent stockCurrent = new StockCurrent(parameter.get(0), parameter.get(1), parameter.get(2),
                parameter.get(3), parameter.get(4), parameter.get(5), parameter.get(6), parameter.get(7),
                parameter.get(8), parameter.get(9), parameter.get(10), parameter.get(11), parameter.get(12),
                parameter.get(13), parameter.get(14), parameter.get(15), parameter.get(16), parameter.get(17),
                parameter.get(18), parameter.get(19), parameter.get(20), parameter.get(21), parameter.get(22),
                parameter.get(23), parameter.get(24), new Integer(open_attri), new Integer(high_attri),
                new Integer(low_attri), new Integer(up_attri), new Integer(down_attri),
                new Double(fiveranger.get(0)), new Double(fiveranger.get(1)), new Double(fiveranger.get(2)),
                new Double(fiveranger.get(3)), new Double(fiveranger.get(4)),
                new Integer(fiveranger.get(5)), new Integer(fiveranger.get(6)), new Integer(fiveranger.get(7)),
                new Integer(fiveranger.get(8)), new Integer(fiveranger.get(9)),
                new Double(fiveranger.get(10)), new Double(fiveranger.get(11)), new Double(fiveranger.get(12)),
                new Double(fiveranger.get(13)), new Double(fiveranger.get(14)),
                new Integer(fiveranger.get(15)), new Integer(fiveranger.get(16)), new Integer(fiveranger.get(17)),
                new Integer(fiveranger.get(18)),new Integer(fiveranger.get(19)));
        return  stockCurrent;
    }

    public static BenchCurrent getBenchCurrent(String id) throws Exception {
        ArrayList<String> parameter = new ArrayList<String>();
        int open_attri = 0;
        int high_attri = 0;
        int low_attri = 0;

        Document doc = Jsoup.connect("http://gupiao.baidu.com/stock/"+id+".html").get();

        Element price_ele = doc.select("#app-wrap > div.stock-info > div > div > strong").get(0);
        parameter.add(price_ele.text());

        Element devia_val = doc.select("#app-wrap > div.stock-info > div > div > span:nth-child(2)").get(0);
        parameter.add(devia_val.text());

        Element devia_per = doc.select("#app-wrap > div.stock-info > div > div > span:nth-child(3)").get(0);
        parameter.add(devia_per.text());

        Element index = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(1) > dd").get(0);
        parameter.add(index.text());

        index = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(2) > dd").get(0);
        parameter.add(index.text());

        index = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(3) > dd").get(0);
        parameter.add(index.text());

        index = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(4) > dd").get(0);
        parameter.add(index.text());

        index = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(5) > dd").get(0);
        parameter.add(index.text());

        index = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(6) > dd").get(0);
        parameter.add(index.text());

        index = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(7) > dd").get(0);
        parameter.add(index.text());

        index = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(8) > dd").get(0);
        parameter.add(index.text());

        index = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(9) > dd").get(0);
        parameter.add(index.text());

        Element attri = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(3) > dd").get(0);
        if(attri.attr("class").equals("s-up")) {
            open_attri = 1;
        }
        else if(attri.attr("class").equals("s-down")) {
            open_attri = -1;
        }
        else {
            open_attri = 0;
        }

        attri = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(1) > dd").get(0);
        if(attri.attr("class").equals("s-up")) {
            high_attri = 1;
        }
        else if(attri.attr("class").equals("s-down")) {
            high_attri = -1;
        }
        else {
            high_attri = 0;
        }

        attri = doc.select("#app-wrap > div.stock-info > div > div.bets-content > div.bets-col-9 > dl:nth-child(2) > dd").get(0);
        if(attri.attr("class").equals("s-up")) {
            low_attri = 1;
        }
        else if(attri.attr("class").equals("s-down")) {
            low_attri = -1;
        }
        else {
            low_attri = 0;
        }

        BenchCurrent benchCurrent = new BenchCurrent(parameter.get(0), parameter.get(1), parameter.get(2),
                parameter.get(3), parameter.get(4), parameter.get(5), parameter.get(6), parameter.get(7),
                parameter.get(8), parameter.get(9), parameter.get(10), parameter.get(11),
                new Integer(high_attri), new Integer(low_attri), new Integer(open_attri));
        return benchCurrent;
    }

    public static JSONArray getRealTicks(String id) {
        List data = new ArrayList<>();
        JSONArray dataarray = new JSONArray();

        String url = "http://gupiao.baidu.com/api/stocks/stocktimeline?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code=" + id;
        try {
            URL getUrl = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection();
            connection.connect();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
            String lines=reader.readLine();
            JSONObject record = new JSONObject(lines);
            dataarray =record.getJSONArray("timeLine");
        } catch (Exception e) {
            e.printStackTrace();
        }

        return dataarray;
    }


    public static List<Report> getRealReport(String id) {
        List<Report> realNews = new ArrayList<>();
        String url = "http://message.finance.qq.com/report/get_hq_report.php?n=50&zqdm="+id.substring(2)+"&seq=0&format=json";
        try {
            URL getUrl = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection();
            connection.connect();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
            String lines = reader.readLine().substring(12);

            JSONObject record = new JSONObject(lines);
            JSONObject news = record.getJSONObject("data");
            JSONArray list = news.getJSONArray("report");
            for (int i=0;i<list.length();i++) {
                JSONObject onenews = list.getJSONObject(i);
                String author = (String)(onenews.get("fxs"));
                String date = (String)(onenews.get("fbrq"));
                String title = (String)(onenews.get("title"));
                String newsurl = "http://bbs.qq.com/finance/"+(String)(onenews.get("id"))+".html";
                String source = (String)(onenews.get("jgjc"));
                Report temp = new Report(title, newsurl, date, author, source);
                realNews.add(temp);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return realNews;
    }

    public static List<News> getRealNews(String id) {
        List<News> realNews = new ArrayList<>();
        String url = "http://news2.gtimg.cn/lishinews.php?name=finance_news&symbol="+id+"&page=1";
        try {
            URL getUrl = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection();
            connection.connect();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
            String lines = reader.readLine().substring(17);
//            System.out.println(lines);
            JSONObject record = new JSONObject(lines);

            JSONArray body = record.getJSONObject("data").getJSONArray("data");
//            System.out.println(body);
            for (int i=0;i<body.length();i++) {
                JSONObject news = body.getJSONObject(i);
                String date = (String)(news.get("datetime"));
                String title = (String)(news.get("title"));
                String newsurl = (String)(news.get("url"));
                News onenews = new News(date, title, newsurl);
                realNews.add(onenews);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return realNews;
    }

}
