package web.controller.workspace;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.pojo.after.StockPool;
import web.pojo.after.UserPo;
import web.pojo.before.SingleInfo;
import web.pojo.enumPo.AddState;
import web.pojo.enumPo.DeleteState;
import web.pojo.enumPo.UpdateState;
import web.service.UserService;
import web.service.UserSystemBL.StockPoolService;
import web.service.UserSystemBL.UsersService;
import web.service.stock_presentation.SingleInfoService;

import javax.annotation.Resource;
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
public class StockPoolController {

    @Resource
    StockPoolService stockPoolService;
    @Resource
    UsersService usersService;
    @Resource
    SingleInfoService singleInfoService;

    @RequestMapping(value = "user/stockpool.do")
    public String toStockPool(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        ArrayList<StockPool> stockPools = stockPoolService.getAllPool(userid);
        UserPo userPo = usersService.getUser(userid);
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();

        model.addAttribute("stock_pool_list", JSON.toJSON(stockPools));
        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("stockList", JSON.toJSON(singleInfos));

        return "stock-pool";
    }

    @RequestMapping(value = "user/stockpool/add-new-stockpool.do")
    public @ResponseBody Map<String, Object>
    addNewStockPool(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String stockPoolName = request.getParameter("name");
        ArrayList<String> stockList = new ArrayList<String>();

        String stockPoolID = stockPoolService.addPool(userid, stockList, stockPoolName);
        StockPool new_stock_pool = new StockPool();
        new_stock_pool.setPoolId(stockPoolID);
        new_stock_pool.setPoolName(stockPoolName);

        if(stockPoolID!=null){
            map.put("success", true);
        }else{
            map.put("success", false);
        }
        map.put("newStockPool", new_stock_pool);

        return map;
    }

    @RequestMapping(value = "user/stockpool/delete-stockpool.do")
    public @ResponseBody Map<String, Object>
    deleteStockPool(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String stockPoolID = request.getParameter("id");

        DeleteState deleteState = stockPoolService.deletePool(userid, stockPoolID);

        if(deleteState == DeleteState.删除成功){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }

    @RequestMapping(value = "user/stockpool/add-stock.do")
    public @ResponseBody Map<String, Object>
    addNewStock(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String stockPoolID = request.getParameter("id");
        String stockid = request.getParameter("stockid");

        ArrayList<String> stocks = new ArrayList<>();
        stocks.add(stockid);

        UpdateState updateState = stockPoolService.addToPool(userid, stockPoolID, stocks);

        if(updateState==UpdateState.修改成功){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }

    @RequestMapping(value = "user/stockpool/delete-stock.do")
    public @ResponseBody Map<String, Object>
    deleteStock(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String stockPoolID = request.getParameter("id");
        String stockid = request.getParameter("stockid");

        System.out.println(stockPoolID);
        ArrayList<String> stockids = new ArrayList<>();
        stockids.add(stockid);

        DeleteState deleteState = stockPoolService.deleteFromPool(userid, stockPoolID, stockids);

        if(deleteState==DeleteState.删除成功){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }

    @RequestMapping(value = "user/stockpool/update-name.do")
    public @ResponseBody Map<String, Object>
    updateName(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String name = request.getParameter("name");
        String id = request.getParameter("id");

        UpdateState updateState = stockPoolService.updatename(userid, id, name);

        if(updateState!=UpdateState.修改成功){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }
}
