package web.controller.workspace;

import com.alibaba.fastjson.JSON;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.pojo.after.BackTestResultPo;
import web.pojo.after.StrategyPo;
import web.pojo.after.UserPo;
import web.pojo.before.SingleInfo;
import web.pojo.enumPo.DeleteState;
import web.pojo.enumPo.UpdateState;
import web.service.BackTestBL.BackTestService;
import web.service.BackTestBL.StrategyService;
import web.service.UserSystemBL.UsersService;
import web.service.stock_presentation.SingleInfoService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.DELETE;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Hermit on 16/8/27.
 */
@Controller
public class StrategyController {

    @Resource
    private StrategyService strategyService;
    @Resource
    private UsersService usersService;
    @Resource
    private SingleInfoService singleInfoService;
    @Resource
    private BackTestService backTestService;

    @RequestMapping(value = "user/strategy-list.do")
    public String toStrategyList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        ArrayList<StrategyPo> strategyPos = strategyService.getAllStategy(userid);
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();
        UserPo userPo = usersService.getUser(userid);

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("strategy_list", JSON.toJSON(strategyPos));
        model.addAttribute("stockList", JSON.toJSON(singleInfos));

        return "strategy-list";
    }

    @RequestMapping(value = "user/strategy_list_desktop.do")
    public @ResponseBody Map<String, Object>
    toStrategyListDesktop(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        ArrayList<StrategyPo> strategyPos = strategyService.getAllStategy(userid);

        map.put("strategy_list", JSON.toJSON(strategyPos));

        return map;
    }

    @RequestMapping(value = "user/strategy-editor.do")
    public String toStrategyEditor(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        UserPo userPo = usersService.getUser(userid);
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();
        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("stockList", JSON.toJSON(singleInfos));

        String isNew = request.getParameter("isNew");

        if(isNew==null){
            model.addAttribute("isNew", false);
            String strategid = request.getParameter("strategy_id");
            StrategyPo strategyPo = strategyService.selectStrategy(userid, strategid);
            model.addAttribute("strategy", JSON.toJSON(strategyPo));

            System.out.println(JSON.toJSON(strategyPo));
        }else{
            if(isNew.equals("true")){
                model.addAttribute("isNew", true);
            }else{
                model.addAttribute("isNew", false);
                String strategid = request.getParameter("strategy_id");
                StrategyPo strategyPo = strategyService.selectStrategy(userid, strategid);
                model.addAttribute("strategy", JSON.toJSON(strategyPo));
            }
        }


        return "strategy-editor";
    }

    @RequestMapping(value = "user/strategy_editor_desktop.do")
    public @ResponseBody Map<String, Object>
    toStrategyEditorDesktop(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String isNew = request.getParameter("isNew");

        if(isNew==null){
            map.put("isNew", false);
            String strategid = request.getParameter("strategy_id");
            StrategyPo strategyPo = strategyService.selectStrategy(userid, strategid);
            map.put("strategy", JSON.toJSON(strategyPo));

            System.out.println(JSON.toJSON(strategyPo));
        }else{
            if(isNew.equals("true")){
                map.put("isNew", true);
            }else{
                map.put("isNew", false);
                String strategid = request.getParameter("strategy_id");
                StrategyPo strategyPo = strategyService.selectStrategy(userid, strategid);
                map.put("strategy", JSON.toJSON(strategyPo));
            }
        }

        return map;
    }

    @RequestMapping(value = "user/strategy/add-new-strategy.do")
    public @ResponseBody Map<String, Object>
    addNewStrategy(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("2");

        if(userid==null){
            userid = "2";
        }

        String strategy_name = request.getParameter("strategy_name");
        String strategy_code = request.getParameter("strategy_code");
        String strategy_flow = request.getParameter("strategy_flow");

        String strategy_id = strategyService.addStrategy(userid, strategy_name, strategy_flow, strategy_code);

        map.put("strategy_id", strategy_id);

        return map;
    }

    @RequestMapping(value = "user/strategy/delete-strategy.do")
    public @ResponseBody Map<String, Object>
    deleteStrategy(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String strategyid = request.getParameter("strategy_id");

        DeleteState deleteState = strategyService.deleteStrategy(userid, strategyid);

        if(deleteState==DeleteState.删除成功){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }

    @RequestMapping(value = "user/strategy/update-strategy.do")
    public @ResponseBody Map<String, Object>
    updateStrategy(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        String strategy_id = request.getParameter("strategy_id");
        String strategy_name = request.getParameter("strategy_name");
        String strategy_code = request.getParameter("strategy_code");
        String strategy_flow = request.getParameter("strategy_flow");

        String isCode = request.getParameter("isCode");

        if(userid==null){
            userid = "2";
        }

        if(strategy_id==null){
            map.put("strategy_id", "id01");
        }

        UpdateState updateState = strategyService.updateStrategyName(userid, strategy_id,strategy_name);

        UpdateState updateState1;
        if(isCode.equals("true")){
            updateState1 = strategyService.updateStrategyPython(userid, strategy_id, strategy_code);
        }else{
            updateState1 = strategyService.updateStrategyJson(userid, strategy_id, strategy_flow);
        }

        if(updateState==UpdateState.修改成功&&updateState1==UpdateState.修改成功){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }

    @RequestMapping(value = "user/strategy/running-python-strategy.do")
    public @ResponseBody Map<String, Object>
    runningPython(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String strategy_id = request.getParameter("strategy_id");
        String start_date = request.getParameter("start_date");
        String end_date = request.getParameter("end_date");
        String amount = request.getParameter("amount");
        System.out.println(end_date);

        BackTestResultPo backTestResultPo = null;
        if(amount==null){
            backTestResultPo = backTestService.runPythonBackTest(strategy_id, userid, start_date, end_date);
        }else{
            backTestResultPo = backTestService.runPythonBackTest(strategy_id, userid, start_date, end_date, (int) Double.parseDouble(amount));
        }

        map.put("backTestResult", JSON.toJSON(backTestResultPo));

        return map;
    }

    @RequestMapping(value = "user/strategy/running-json-strategy.do")
    public @ResponseBody Map<String, Object>
    runningJSON(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String strategy_id = request.getParameter("strategy_id");
        String stocks = request.getParameter("stocks");
        String start_date = request.getParameter("start_date");
        String end_date = request.getParameter("end_date");
        String amount = request.getParameter("amount");

        System.out.println(stocks);

        String[] stocks_split = stocks.split(",");

        ArrayList<String> list = new ArrayList<>();
        for(int i=0;i<stocks_split.length;i++){
            list.add(stocks_split[i]);
        }

        BackTestResultPo backTestResultPo;

        if(amount==null){
            backTestResultPo = backTestService.runJsonBackTest(strategy_id, userid, start_date, end_date, list);
        }else{
            backTestResultPo = backTestService.runJsonBackTest(strategy_id, userid, start_date, end_date, list, (int) Double.parseDouble(amount));
        }


        map.put("backTestResult", backTestResultPo);

        return map;
    }
}
