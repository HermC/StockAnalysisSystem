package web.controller.workspace;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.pojo.after.StrategyPo;
import web.pojo.after.UserPo;
import web.pojo.before.SingleInfo;
import web.pojo.enumPo.DeleteState;
import web.pojo.enumPo.UpdateState;
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

    @RequestMapping(value = "user/strategy-list.do")
    public String toStrategyList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        userid = "2";

        if(userid==null){
            return "welcome";
        }

        ArrayList<StrategyPo> strategyPos = strategyService.getAllStategy(userid);
        UserPo userPo = usersService.getUser(userid);

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("strategy_list", JSON.toJSON(strategyPos));

        return "strategy-list";
    }

    @RequestMapping(value = "user/strategy-editor.do")
    public String toStrategyEditor(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        userid = "2";

        if(userid==null){
            return "welcome";
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

    @RequestMapping(value = "user/strategy/add-new-strategy.do")
    public @ResponseBody Map<String, Object>
    addNewStrategy(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("2");

        userid = "2";

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

        userid = "2";

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

        userid = "2";

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

        userid = "2";

        String strategy_id = request.getParameter("strategy_id");
        

        return map;
    }

    @RequestMapping(value = "user/strategy/running-json-strategy.do")
    public @ResponseBody Map<String, Object>
    runningJSON(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        userid = "2";

        String strategy_id = request.getParameter("strategy_id");
        String stocks = request.getParameter("stocks");

        return map;
    }
}
