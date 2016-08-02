package web;

import org.junit.Test;
import web.Tools.TotalNews;

/**
 * Created by Hermit on 16/5/24.
 */
public class CurrentTest {
    @Test
    public void test(){
        try {
//            Process proc = Runtime.getRuntime().exec("python ./src/main/java/web/Tools/instant_info.py sh600000");
//            proc.waitFor();
//
////            System.out.println(proc.getOutputStream());
//
//            BufferedReader br = new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            String temp = "";
//            while((temp = br.readLine())!=null) {
//
//                System.out.println(temp);
//            }
//            StockCurrent stockCurrent = Current.getCurrent("sh600000");
//            System.out.println(stockCurrent.amplitude);
//            System.out.println(stockCurrent.price);
//            System.out.println(stockCurrent.high_attri);
//            StockCurrent stockCurrent = Realtime.getStockRealtime("sh600000");
//            System.out.println(stockCurrent.amplitude);
//            System.out.println(stockCurrent.out2_vol);
//            System.out.println(stockCurrent.high_attri);
//            System.out.println(stockCurrent.out2);
//
//            BenchCurrent benchCurrent = Realtime.getBenchCurrent("sz399001");
//            System.out.println(benchCurrent.amount);
//            System.out.println(benchCurrent.neutral_num);
//            List<Hotspot> result = TotalNews.getHotspot();
//            System.out.println(result.get(1).url);
//            System.out.println(result.get(0).hotStockName);
//            for (int i=0;i<result.size();i++) {
////                System.out.println(result.get(i).keyword);
////                System.out.println(result.get(i).date);
////                System.out.println(result.get(i).description);
////                System.out.println(result.get(i).drivingEvent);
////                System.out.println(result.get(i).url);
//                System.out.println(result.get(i).devia1);
//                System.out.println(result.get(i).devia2);
//                System.out.println(result.get(i).devia3);
//            }
//            TotalNews.getHotspot();
//            List<Report> result = Realtime.getRealReport("sh600000");
//            for (int i=0;i<result.size();i++) {
//                System.out.println(result.get(i).url);
//            }
//            List<News> news = Realtime.getRealNews("sh600000");
//            for (int i=0;i<news.size();i++) {
//                System.out.println(news.get(i).url);
//            }
            System.out.println(TotalNews.getIndustryUp());
            System.out.println(TotalNews.getStockUp());
//            TotalNews.getIndustryUp();
//            TotalNews.getStockUp();

            TotalNews.getStockUp();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
