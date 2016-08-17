package web.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.Tools.Realtime;
import web.Tools.TotalNews;
import web.pojo.before.BenchCurrent;
import web.pojo.before.Hotspot;
import web.pojo.before.News;
import web.pojo.before.SingleInfo;
import web.service.stock_presentation.RecommendService;
import web.service.stock_presentation.SingleInfoService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
/**
 * Created by Hermit on 16/6/10.
 */
@Controller
public class IndexController {

    @Resource
    private SingleInfoService singleInfoService;
    @Resource
    private RecommendService recommendService;

    @RequestMapping(value = "/index/active.do")
    public @ResponseBody
    Map<String, Object> getActiveData(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        BenchCurrent benchCurrent = null;
        try {
            benchCurrent = Realtime.getBenchCurrent("sh000001");
        } catch (Exception e) {
            e.printStackTrace();
        }

        map.put("success", "true");
        map.put("data", benchCurrent);

        return map;
    }

    @RequestMapping(value = "index.do")
    public String toIndex(HttpServletRequest request, Model model) {

        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        model.addAttribute("stockList", JSON.toJSON(stockList));
        model.addAttribute("intraday", Realtime.getRealTicks("sh000001"));

        List<News> stockNews = TotalNews.getStockNews();
        List<News> financeNews = TotalNews.getFinanceNews();
        List<News> companyNews = TotalNews.getCompanyNews();

        List<Hotspot> hotspots = TotalNews.getHotspot();
        ArrayList<SingleInfo> stop = recommendService.getStopRecommend();

        model.addAttribute("stockNews", JSON.toJSON(stockNews));
        model.addAttribute("financeNews", JSON.toJSON(financeNews));
        model.addAttribute("companyNews", JSON.toJSON(companyNews));
        model.addAttribute("hotspots", JSON.toJSON(hotspots));
        model.addAttribute("stopRecommend", JSON.toJSON(stop));
        model.addAttribute("industryRank", JSON.toJSON(TotalNews.getIndustryUp()));
        model.addAttribute("stockRank", JSON.toJSON(TotalNews.getStockUp()));

        return "index";
    }

    @RequestMapping(value = "index_desktop.do")
    public @ResponseBody Map<String, Object>
    getDesktopIndexData(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();
        map.put("success", true);

        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        map.put("stockList", JSON.toJSON(stockList));
        map.put("intraday", Realtime.getRealTicks("sh000001"));

        List<News> stockNews = TotalNews.getStockNews();
        List<News> financeNews = TotalNews.getFinanceNews();
        List<News> companyNews = TotalNews.getCompanyNews();

        List<Hotspot> hotspots = TotalNews.getHotspot();
        ArrayList<SingleInfo> stop = recommendService.getStopRecommend();

        map.put("stockNews", JSON.toJSON(stockNews));
        map.put("financeNews", JSON.toJSON(financeNews));
        map.put("companyNews", JSON.toJSON(companyNews));
        map.put("hotspots", JSON.toJSON(hotspots));
        map.put("stopRecommend", JSON.toJSON(stop));
        map.put("industryRank", JSON.toJSON(TotalNews.getIndustryUp()));
        map.put("stockRank", JSON.toJSON(TotalNews.getStockUp()));

        return map;
    }

    @RequestMapping(value = "welcome.do")
    public String toWelcome(HttpServletRequest request, Model model) {
        return "welcome";
    }
}
