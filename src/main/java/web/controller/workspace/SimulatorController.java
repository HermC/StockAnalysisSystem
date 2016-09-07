package web.controller.workspace;

import com.alibaba.fastjson.JSON;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.pojo.after.StockPool;
import web.pojo.after.StrategyPo;
import web.pojo.after.UserPo;
import web.pojo.after.VirtualTradePo;
import web.pojo.enumPo.DeleteState;
import web.pojo.enumPo.UpdateState;
import web.service.BackTestBL.StrategyService;
import web.service.BackTestBL.VirtualTradeService;
import web.service.UserSystemBL.StockPoolService;
import web.service.UserSystemBL.UsersService;

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

    @RequestMapping(value = "user/simulator-list.do")
    public String toSimulatorList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        userid = "2";

        if(userid==null){
            return "welcome";
        }

        ArrayList<VirtualTradePo> virtualTradePos = virtualTradeService.getAllTrade(userid);
        ArrayList<StrategyPo> strategyPos = strategyService.getAllStategy(userid);
        ArrayList<StockPool> stockPools = stockPoolService.getAllPool(userid);
        UserPo userPo = usersService.getUser(userid);

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("simulator_list", JSON.toJSON(virtualTradePos));
        model.addAttribute("strategy_list", JSON.toJSON(strategyPos));
        model.addAttribute("stockpool_list", JSON.toJSON(stockPools));

        return "simulator-transaction";
    }

    @RequestMapping(value = "user/simulator-info.do")
    public String toSimulatorInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        userid = "2";

        if(userid==null){
            return "welcome";
        }

        UserPo userPo = usersService.getUser(userid);
        VirtualTradePo virtualTradePo = virtualTradeService.getTrade(userid, "5");

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("simulator", JSON.toJSON(virtualTradePo));

        return "simulator-info";
    }

    @RequestMapping(value = "user/simulator/add-new-simulator.do")
    public @ResponseBody Map<String, Object>
    addNewSimulator(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        userid = "2";

        String name = request.getParameter("name");
        String strategy = request.getParameter("strategy");
        double amount = Double.parseDouble(request.getParameter("start_amount"));
        String start_time = request.getParameter("start_time");
        String pool = request.getParameter("pool");

        System.out.println(name+" "+strategy+" "+amount+" "+start_time+" "+pool);

        String simulatorid = virtualTradeService.addtrade(userid, name, amount, start_time, strategy, pool);

        map.put("simulator_id", simulatorid);

        return map;
    }

    @RequestMapping(value = "user/simulator/delete-simulator.do")
    public @ResponseBody Map<String, Object>
    deleteSimulator(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        userid = "2";

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

        userid = "2";

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

        userid = "2";

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
