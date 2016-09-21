package web.controller.presentation;

import com.alibaba.fastjson.JSON;
import org.omg.CORBA.Request;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.Tools.Realtime;
import web.pojo.after.UserPo;
import web.pojo.before.*;
import web.service.UserSystemBL.UsersService;
import web.service.stock_presentation.*;
import web.vo.before.DetailStrategyVO;
import web.vo.before.StockGradeVO;
import web.vo.before.StockInsTextVO;
import web.vo.before.TabTableInsVO;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

/**
 * Created by yqq on 2016.5.12.
 */
@Controller
public class StockDataController {

    @Resource
    private TabTableDataService tabTableDataService;
    @Resource
    private TabTableInstructionService tabTableInstructionService;
    @Resource
    private StockInfoService stockInfoService;
    @Resource
    private GradeService gradeService;
    @Resource
    private ForecastDataService forecastDataService;
    @Resource
    private InstructionTextService instructionTextService;
    @Resource
    private StockComparisionService stockComparisionService;
    @Resource
    private SingleInfoService singleInfoService;
    @Resource
    private DetailStrategyService detailStrategyService;
    @Resource
    private RangeService rangeService;
//    @Resource
//    private FavouriteStockService favouriteStockService;
    @Resource
    private RelativeService relativeService;
    @Resource
    private UsersService usersService;

    @RequestMapping(value = "/stock/active.do")
    public @ResponseBody  Map<String,Object>
    getActiveData(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String id = request.getParameter("id");

        Map<String,Object> map = new HashMap<String,Object>();

        StockCurrent stockCurrent = Realtime.getStockRealtime(id);
        StockInsTextVO stockInsTextVO = instructionTextService.getStockAnalysis(id);
        map.put("success", "true");
        map.put("current", stockCurrent);
        map.put("instruction", JSON.toJSON(stockInsTextVO));

        return map;
    }

    @RequestMapping(value = "stock.do")
    public String toIndex(HttpServletRequest request,Model model){
        String stockId = request.getParameter("id");

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid!=null){
            UserPo userPo = usersService.getUser(userid);
            model.addAttribute("userInfo", JSON.toJSON(userPo));
        }

        ArrayList<TabTablesData> tabTablesDatas = tabTableDataService.getTablesInfo(stockId, LocalDate.now().minusYears(1),LocalDate.now());

        ArrayList<TabTablesData> last6Days = new ArrayList<>();
        for(int i=tabTablesDatas.size()-10;i<tabTablesDatas.size();i++){
            last6Days.add(tabTablesDatas.get(i));
        }
        ArrayList<TabTableInsVO> tableInsVOs = tabTableInstructionService.getTablesInfo(last6Days);

        StockInfo stockInfo = stockInfoService.getStockInfo(stockId);
        ArrayList<ForecastData> forecastData = forecastDataService.getForecastData(stockId);
        ArrayList<ForecastData> bpForecastData = forecastDataService.getPyTradeForecast(stockId);
        StockGradeVO stockGradeVO = gradeService.getCurrentInfo(stockId);
        StockRelativeData stockRelativeData = relativeService.getRelativeData(stockId);
        ArrayList<TabTablesData> benchmarkDatas = tabTableDataService.getTablesInfo("399300", LocalDate.now().minusDays(20), LocalDate.now());

        DetailStrategyVO detailStrategy = detailStrategyService.getDetailStrategy(stockId);
        ArrayList<StockSeason> stockSeason = stockInfoService.getStockSeason(stockId);

        List<News> newsArrayList = Realtime.getRealNews(stockId);
        List<Report> reportArrayList = Realtime.getRealReport(stockId);

        model.addAttribute("allinfo", JSON.toJSON(tabTablesDatas));
        model.addAttribute("specialPredict", JSON.toJSON(tableInsVOs));
        model.addAttribute("stockInfo", JSON.toJSON(stockInfo));
        model.addAttribute("forecastInfo", JSON.toJSON(forecastData));
        model.addAttribute("intraday", Realtime.getRealTicks(stockId));
        model.addAttribute("grade", JSON.toJSON(stockGradeVO));
        model.addAttribute("relative", JSON.toJSON(stockRelativeData));
        model.addAttribute("benchmark", JSON.toJSON(benchmarkDatas));
        model.addAttribute("bpForecast", JSON.toJSON(bpForecastData));
//        model.addAttribute("pyTrade", JSON.toJSON(pyTradeDatas));
        model.addAttribute("news", JSON.toJSON(newsArrayList));
        model.addAttribute("reports", JSON.toJSON(reportArrayList));
        model.addAttribute("detailStrategy", JSON.toJSON(detailStrategy));
        model.addAttribute("season", JSON.toJSON(stockSeason));
        model.addAttribute("currentSeason", JSON.toJSON(stockSeason.get(stockSeason.size()-1)));
        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        model.addAttribute("stockList", JSON.toJSON(stockList));

        return "stocksingle";
    }

    @RequestMapping(value = "stock_desktop.do")
    public @ResponseBody Map<String, Object>
    getDesktopStockData(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        String stockId = request.getParameter("id");
//        HttpSession session = request.getSession();
//        String stockId = (String) session.getAttribute("passedId");
//
//        if(stockId==null){
//            stockId = "sh600000";
//        }

        System.out.println(request.getSession().getId());

        ArrayList<TabTablesData> tabTablesDatas = tabTableDataService.getTablesInfo(stockId, LocalDate.now().minusYears(1),LocalDate.now());
        ArrayList<TabTablesData> last6Days = new ArrayList<>();
        for(int i=tabTablesDatas.size()-10;i<tabTablesDatas.size();i++){
            last6Days.add(tabTablesDatas.get(i));
        }
        ArrayList<TabTableInsVO> tableInsVOs = tabTableInstructionService.getTablesInfo(last6Days);
        StockInfo stockInfo = stockInfoService.getStockInfo(stockId);
        ArrayList<ForecastData> forecastData = forecastDataService.getForecastData(stockId);
        ArrayList<ForecastData> bpForecastData = forecastDataService.getPyTradeForecast(stockId);
        StockGradeVO stockGradeVO = gradeService.getCurrentInfo(stockId);
        StockRelativeData stockRelativeData = relativeService.getRelativeData(stockId);
        ArrayList<TabTablesData> benchmarkDatas = tabTableDataService.getTablesInfo("399300", LocalDate.now().minusDays(20), LocalDate.now());
        DetailStrategyVO detailStrategy = detailStrategyService.getDetailStrategy(stockId);
        ArrayList<StockSeason> stockSeason = stockInfoService.getStockSeason(stockId);
        List<News> newsArrayList = Realtime.getRealNews(stockId);
        List<Report> reportArrayList = Realtime.getRealReport(stockId);
        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();

        map.put("success", "true");
        map.put("allinfo", tabTablesDatas);
        map.put("specialPredict", tableInsVOs);
        map.put("stockInfo", stockInfo);
        map.put("forecastInfo", forecastData);
        map.put("intraday", Realtime.getRealTicks(stockId));
        map.put("grade", stockGradeVO);
        map.put("relative", stockRelativeData);
        map.put("benchmark", benchmarkDatas);
        map.put("bpForecast", bpForecastData);
//        map.put("pyTrade", pyTradeDatas);
        map.put("news", newsArrayList);
        map.put("reports", reportArrayList);
        map.put("detailStrategy", detailStrategy);
        map.put("season", stockSeason);
        map.put("currentSeason", stockSeason.get(stockSeason.size()-1));
        map.put("stockList", stockList);

        return map;
    }

    @RequestMapping(value = "stockTables_app.do")
    public @ResponseBody Map<String, Object>
    getAppStockTableData(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();
        String stockId = request.getParameter("id");

        //基本数据
        ArrayList<TabTablesData> tabTablesDatas = tabTableDataService.getTablesInfo(stockId, LocalDate.now().minusYears(1),LocalDate.now());
//        ArrayList<TabTablesData> last6Days = new ArrayList<>();
//        for(int i=tabTablesDatas.size()-10;i<tabTablesDatas.size();i++){
//            last6Days.add(tabTablesDatas.get(i));
//        }
        map.put("allInfo", tabTablesDatas.subList(tabTablesDatas.size()-30,tabTablesDatas.size()));
        System.out.print("in getAppStockTableData");
        return map;
    }

    @RequestMapping(value = "stock_app.do")
    public @ResponseBody Map<String, Object>
    getAppStockData(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();
        String stockId = request.getParameter("id");

        //股票信息
        StockInfo stockInfo = stockInfoService.getStockInfo(stockId);
        map.put("stockInfo", stockInfo);

        //预测数据
        ArrayList<ForecastData> forecastData = forecastDataService.getForecastData(stockId);
        ArrayList<ForecastData> bpForecastData = forecastDataService.getPyTradeForecast(stockId);
        map.put("forecastInfo", forecastData.subList(0,10));
        map.put("bpForecast", bpForecastData.subList(0,10));

        //特殊预测
        ArrayList<TabTablesData> tabTablesDatas = tabTableDataService.getTablesInfo(stockId, LocalDate.now().minusYears(1),LocalDate.now());
        ArrayList<TabTablesData> last6Days = new ArrayList<>();
        for(int i=tabTablesDatas.size()-10;i<tabTablesDatas.size();i++){
            last6Days.add(tabTablesDatas.get(i));
        }
        ArrayList<TabTableInsVO> tableInsVOs = tabTableInstructionService.getTablesInfo(last6Days);
        DetailStrategyVO detailStrategy = detailStrategyService.getDetailStrategy(stockId);
        map.put("specialPredict", tableInsVOs);
        map.put("detailStrategy", detailStrategy);

        //雷达图
        Map<String,Double> stockGrade = new HashMap<>();
        StockGradeVO stockGradeVO = gradeService.getCurrentInfo(stockId);
        stockGrade.put("市净率",stockGradeVO.pbAssess);
        stockGrade.put("市盈率",stockGradeVO.peAssess);
        stockGrade.put("涨跌幅",stockGradeVO.updownAssess);
        stockGrade.put("量比",stockGradeVO.volumeAssess);
        stockGrade.put("委比",stockGradeVO.weibiAssess);
        map.put("stockGrade",stockGrade);

        //相关性分析
        StockRelativeData stockRelativeData = relativeService.getRelativeData(stockId);
        map.put("relative", stockRelativeData);

        //新闻报告
        List<News> newsArrayList = Realtime.getRealNews(stockId);
        List<Report> reportArrayList = Realtime.getRealReport(stockId);
        map.put("news", newsArrayList.subList(0,10));
        map.put("reports", reportArrayList.subList(0,10));


        //文本分析
        StockInsTextVO stockInsTextVO = null;
        StockCurrent stockCurrent = null;
        try {
            stockInsTextVO = instructionTextService.getStockAnalysis(stockId);
            stockCurrent = Realtime.getStockRealtime(stockId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("instruction", JSON.toJSON(stockInsTextVO));
        map.put("current",stockCurrent);

        //预测信息
        ArrayList<StockSeason> stockSeason = stockInfoService.getStockSeason(stockId);
        map.put("season", stockSeason);


        System.out.println("get request!");
        return map;
    }



//    @RequestMapping(value = "stock_request.do")
//    public @ResponseBody Map<String, Object>
//    stockRequest(HttpServletRequest request, HttpServletResponse response) {
//        String stockid = request.getParameter("id");
//        HttpSession session = request.getSession();
//
//        session.setAttribute("passedId", stockid);
//
//        Map<String, Object> map = new HashMap<>();
//        map.put("success", true);
//
//        return map;
//    }

    @RequestMapping(value = "bench.do")
    public String toBench(HttpServletRequest request, Model model) {
        String stockid = request.getParameter("id");

        ArrayList<TabTablesData> tabTablesDatas = tabTableDataService.getTablesInfo(stockid, LocalDate.now().minusYears(1), LocalDate.now());

        StockInfo stockInfo = null;
        if(stockid.equals("399300")){
            stockInfo = new StockInfo();
            stockInfo.stockid = stockid;
            stockInfo.name = "沪深300";
        }else if(stockid.equals("000001")){
            stockInfo = new StockInfo();
            stockInfo.stockid = stockid;
            stockInfo.name = "上证指数";
        }else if(stockid.equals("399001")){
            stockInfo = new StockInfo();
            stockInfo.stockid = stockid;
            stockInfo.name = "深圳成指";
        }

        ArrayList<ForecastData> forecastDatas = forecastDataService.getForecastData(stockid);
        ArrayList<StockRange> stockRanges = rangeService.getStockRange();
        ArrayList<ForecastData> bpForecastData = forecastDataService.getPyTradeForecast(stockid);

        model.addAttribute("stockInfo", JSON.toJSON(stockInfo));
        model.addAttribute("allinfo", JSON.toJSON(tabTablesDatas));
        model.addAttribute("forecastData", JSON.toJSON(forecastDatas));
        model.addAttribute("bpForecastData", JSON.toJSON(bpForecastData));
        model.addAttribute("rangeData", JSON.toJSON(stockRanges));

        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        model.addAttribute("stockList", JSON.toJSON(stockList));

        if(stockid.equals("399300")){
            model.addAttribute("intraday", Realtime.getRealTicks("sh000300"));
        }else if(stockid.equals("399001")){
            model.addAttribute("intraday", Realtime.getRealTicks("sz399001"));
        }else if(stockid.equals("000001")){
            model.addAttribute("intraday", Realtime.getRealTicks("sh000001"));
        }

        return "bench";
    }

    @RequestMapping(value = "/bench/active.do")
    public @ResponseBody Map<String, Object>
    getBenchActiveData(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");

        Map<String, Object> map = new HashMap<>();

        BenchCurrent benchCurrent = null;
        try {
            if(id.equals("399300")){
                benchCurrent = Realtime.getBenchCurrent("sh000300");
            }else if(id.equals("399001")){
                benchCurrent = Realtime.getBenchCurrent("sz399001");
            }else if(id.equals("000001")){
                benchCurrent = Realtime.getBenchCurrent("sh000001");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        map.put("success", "true");
        map.put("data", benchCurrent);

        return map;
    }
}
