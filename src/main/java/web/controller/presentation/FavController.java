package web.controller.presentation;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import web.pojo.before.FavouriteStock;
import web.pojo.before.SingleInfo;
import web.pojo.before.TabTablesData;
import web.service.stock_presentation.FavouriteStockService;
import web.service.stock_presentation.SingleInfoService;
import web.service.stock_presentation.TabTableDataService;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by Hermit on 16/5/29.
 */
@Controller
public class FavController {

    @Resource
    private TabTableDataService tabTableDataService;
    @Resource
    private SingleInfoService singleInfoService;
    @Resource
    private FavouriteStockService favouriteStockService;

    @RequestMapping("/favor.do")
    public String toFav(HttpServletRequest request, Model model) {
        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        model.addAttribute("stockList", JSON.toJSON(stockList));

        LocalDate today = LocalDate.now();

        ArrayList<TabTablesData> hs300 = tabTableDataService.getTablesInfo("hs300", today.minusDays(7), today);
        ArrayList<TabTablesData> sh000001 = tabTableDataService.getTablesInfo("sh000001", today.minusDays(7), today);
        ArrayList<TabTablesData> sz399001 = tabTableDataService.getTablesInfo("sz399001", today.minusDays(7), today);

        model.addAttribute("hs300", hs300);
        model.addAttribute("sh000001", sh000001);
        model.addAttribute("sz399001", sz399001);

        System.out.println(sz399001.size());

        Cookie[] cookies = request.getCookies();
        if(cookies==null){
            return "favor";
        }else{
            String s = null;
            for(int i=0;i<cookies.length;i++){
                if(cookies[i].getName().equals("favouriteStock")){
                    s = cookies[i].getValue();
                }
            }

            if(s==null){
                return "favor";
            }
            ArrayList<String> ids = new ArrayList<>();
            String[] split = s.split("%2C");
            for(int i=0;i<split.length;i++){
                if(!split[i].equals("null"))
                    ids.add(split[i]);
            }

            if(ids.size()==0){
                return "favor";
            }else{
                ArrayList<FavouriteStock> list = favouriteStockService.getFavourite(ids);


                ArrayList<ArrayList<FavouriteStock>> result = new ArrayList<>();

                for(int i=0;i<split.length;i++){
                    String id = split[i];

                    ArrayList<FavouriteStock> fs = new ArrayList<>();

                    for(FavouriteStock favouriteStock: list){
                        if(favouriteStock.stockid.equals(id)){
                            if(favouriteStock.rank<10){
                                favouriteStock.rankString = "0" + favouriteStock.rank;
                            }else{
                                favouriteStock.rankString = "" + favouriteStock.rank;
                            }
                            fs.add(favouriteStock);
                        }
                    }

                    result.add(fs);
                }
                model.addAttribute("fav", result);
                model.addAttribute("favData", JSON.toJSON(result));
                return "favor";
            }
        }
    }
}
