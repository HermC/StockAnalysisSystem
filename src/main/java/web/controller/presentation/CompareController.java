package web.controller.presentation;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.pojo.after.UserPo;
import web.pojo.before.SingleInfo;
import web.service.UserSystemBL.UsersService;
import web.service.stock_presentation.SingleInfoService;
import web.service.stock_presentation.StockComparisionService;
import web.vo.before.StockComparison;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yqq on 2016.5.30.
 */
@Controller
public class CompareController {

    @Resource
    private SingleInfoService singleInfoService;
    @Resource
    private StockComparisionService stockComparisionService;
    @Resource
    private UsersService usersService;

    @RequestMapping(value = "compare.do")
    public String toCompare(HttpServletRequest request, Model model) {
        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        model.addAttribute("stockList", JSON.toJSON(stockList));

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid!=null){
            UserPo userPo = usersService.getUser(userid);
            model.addAttribute("userInfo", JSON.toJSON(userPo));
        }

        Cookie[] cookies = request.getCookies();
        if(cookies==null){
            ArrayList<SingleInfo> tmp = new ArrayList<>();
            model.addAttribute("stocks", JSON.toJSON(tmp));
            return "stockcompare";
        }
        String s = null;
        for(int i=0;i<cookies.length;i++){
            if(cookies[i].getName().equals("compareStock")){
                s = cookies[i].getValue();
            }
        }
        if(s==null){
            ArrayList<SingleInfo> tmp = new ArrayList<>();
            model.addAttribute("stocks", JSON.toJSON(tmp));
            return "stockcompare";
        }else{
            String[] stockid = s.split("%2C");
            ArrayList<SingleInfo> result = new ArrayList<>();
            ArrayList<SingleInfo> stocks = singleInfoService.getSingleInfo();

            for(int i=0;i<stockid.length;i++){
                for(SingleInfo stock: stocks){
                    if(stockid[i].equals(stock.id)){
                        result.add(stock);
                        break;
                    }
                }
            }

            model.addAttribute("stocks", JSON.toJSON(result));

            return "stockcompare";
        }
    }

    @RequestMapping(value = "compare_desktop.do")
    public @ResponseBody Map<String, Object>
    getDesktopCompareData(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();
        map.put("success", true);

        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        map.put("stockList", JSON.toJSON(stockList));

        Cookie[] cookies = request.getCookies();
        if(cookies==null){
            ArrayList<SingleInfo> tmp = new ArrayList<>();
            map.put("stocks", JSON.toJSON(tmp));
            return map;
        }
        String s = null;
        for(int i=0;i<cookies.length;i++){
            if(cookies[i].getName().equals("compareStock")){
                s = cookies[i].getValue();
            }
        }
        if(s==null){
            ArrayList<SingleInfo> tmp = new ArrayList<>();
            map.put("stocks", JSON.toJSON(tmp));
            return map;
        }else{
            String[] stockid = s.split("%2C");
            ArrayList<SingleInfo> result = new ArrayList<>();
            ArrayList<SingleInfo> stocks = singleInfoService.getSingleInfo();

            for(int i=0;i<stockid.length;i++){
                for(SingleInfo stock: stocks){
                    if(stockid[i].equals(stock.id)){
                        result.add(stock);
                        break;
                    }
                }
            }

            map.put("stocks", JSON.toJSON(result));

            return map;
        }
    }

    @RequestMapping(value = "compare/compareData.do")
    public @ResponseBody
    Map<String, Object>
    getCompareData(HttpServletRequest request, HttpServletResponse response)throws IOException {
        Map<String, Object> map = new HashMap<>();

        String id = request.getParameter("id");

        StockComparison stockComparison = stockComparisionService.getStockComparsion(id);

        map.put("success", "true");
        map.put("data", JSON.toJSON(stockComparison));

        return map;
    }
}
