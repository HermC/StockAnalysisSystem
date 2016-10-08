package web.controller.workspace;

import com.alibaba.fastjson.JSON;
import org.apache.commons.collections.map.HashedMap;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.pojo.after.*;
import web.pojo.before.SingleInfo;
import web.pojo.enumPo.DeleteState;
import web.pojo.enumPo.UpdateState;
import web.service.BackTestBL.StrategyService;
import web.service.BackTestBL.VirtualTradeService;
import web.service.UserSystemBL.StockPoolService;
import web.service.UserSystemBL.UsersService;
import web.service.stock_presentation.SingleInfoService;

import javax.annotation.Resource;
import javax.annotation.Resources;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Hermit on 16/8/27.
 */
@Controller
public class SimulatorController {

    @Resource
    private VirtualTradeService virtualTradeService;
    @Resource
    private StrategyService strategyService;
    @Resource
    private StockPoolService stockPoolService;
    @Resource
    private UsersService usersService;
    @Resource
    private SingleInfoService singleInfoService;

    @RequestMapping(value = "user/simulator-list.do")
    public String toSimulatorList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");


        if(userid==null){
            userid = "2";
//            return "welcome";
        }

        ArrayList<VirtualTradePo> virtualTradePos = virtualTradeService.getAllTrade(userid);
        ArrayList<StrategyPo> strategyPos = strategyService.getAllStategy(userid);
        ArrayList<StockPool> stockPools = stockPoolService.getAllPool(userid);
        UserPo userPo = usersService.getUser(userid);
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("simulator_list", JSON.toJSON(virtualTradePos));
        model.addAttribute("strategy_list", JSON.toJSON(strategyPos));
        model.addAttribute("stockpool_list", JSON.toJSON(stockPools));
        model.addAttribute("stockList", JSON.toJSON(singleInfos));

        return "simulator-transaction";
    }

    @RequestMapping(value = "user/simulator_list_desktop.do")
    public @ResponseBody Map<String, Object>
    toSimulatorListDesktop(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        ArrayList<VirtualTradePo> virtualTradePos = virtualTradeService.getAllTrade(userid);
        ArrayList<StrategyPo> strategyPos = strategyService.getAllStategy(userid);
        ArrayList<StockPool> stockPools = stockPoolService.getAllPool(userid);

        map.put("simulator_list", JSON.toJSON(virtualTradePos));
        map.put("strategy_list", JSON.toJSON(strategyPos));
        map.put("stockpool_list", JSON.toJSON(stockPools));

        return map;
    }

    @RequestMapping(value = "user_app/simulator-list.do")
    public @ResponseBody Map<String, Object> toAppSimulatorList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        Map<String, Object> map = new HashMap<>();

        if(userid==null){
            userid = "2";
//            return "welcome";
        }

        ArrayList<VirtualTradePo> virtualTradePos = virtualTradeService.getAllTrade(userid);
        ArrayList<StrategyPo> strategyPos = strategyService.getAllStategy(userid);
        ArrayList<StockPool> stockPools = stockPoolService.getAllPool(userid);
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();
        UserPo userPo = usersService.getUser(userid);

        map.put("simulator_list", JSON.toJSON(virtualTradePos));
//        map.put("strategy_list", JSON.toJSON(strategyPos));
//        map.put("stockpool_list", JSON.toJSON(stockPools));
//        map.put("stockList", JSON.toJSON(singleInfos));
        map.put("userInfo", JSON.toJSON(userPo));


        System.out.println("get simulator request");
        System.out.println(JSON.toJSON(virtualTradePos.get(0).dailyResultPos));
        System.out.println(JSON.toJSON(virtualTradePos.get(0).state));

        return map;
    }

    @RequestMapping(value = "user/simulator-info.do")
    public String toSimulatorInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");


        if(userid==null){
            userid = "2";
            System.out.println("userid is null");
//            return "welcome";
        }

        String id = request.getParameter("id");

        UserPo userPo = usersService.getUser(userid);
        VirtualTradePo virtualTradePo = virtualTradeService.getTrade(userid, id);
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("simulator", JSON.toJSON(virtualTradePo));
        model.addAttribute("stockList", JSON.toJSON(singleInfos));

        return "simulator-info";
    }

    @RequestMapping(value = "user/simulator_info_desktop.do")
    public @ResponseBody Map<String, Object>
    toSimulatorInfoDesktop(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String id = request.getParameter("id");

        VirtualTradePo virtualTradePo = virtualTradeService.getTrade(userid, id);

        map.put("simulator", JSON.toJSON(virtualTradePo));

        return map;
    }

    @RequestMapping(value = "user/simulator/add-new-simulator.do")
    public @ResponseBody Map<String, Object>
    addNewSimulator(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String name = request.getParameter("name");
        String strategy = request.getParameter("strategy");
        double amount = Double.parseDouble(request.getParameter("start_amount"));
        String start_time = request.getParameter("start_time");
        String pool = request.getParameter("pool");

        System.out.println(name+" "+strategy+" "+amount+" "+start_time+" "+pool);

        String simulatorid = virtualTradeService.addtrade(userid, name, (int) amount, start_time, strategy, pool);

        map.put("simulator_id", simulatorid);

        return map;
    }

    @RequestMapping(value = "user/simulator/delete-simulator.do")
    public @ResponseBody Map<String, Object>
    deleteSimulator(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String id = request.getParameter("id");

        DeleteState deleteState = virtualTradeService.deletetrade(userid, id);

        if(deleteState==DeleteState.删除成功){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }


    @RequestMapping(value = "user/simulator/stop-simulator.do")
    public @ResponseBody Map<String, Object>
    stopSimulator(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String id = request.getParameter("id");

        VirtualTradePo virtualTradePo = virtualTradeService.stopVTrade(userid, id);

        if(virtualTradePo!=null){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }

    @RequestMapping(value = "user/simulator/restart-simulator.do")
    public @ResponseBody Map<String, Object>
    startSimulator(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String id = request.getParameter("id");

        VirtualTradePo virtualTradePo = virtualTradeService.restartVTrade(userid, id);

        if(virtualTradePo!=null){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }
}
