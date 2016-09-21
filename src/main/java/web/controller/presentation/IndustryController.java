package web.controller.presentation;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.pojo.after.UserPo;
import web.pojo.before.Industry;
import web.pojo.before.SingleInfo;
import web.service.UserSystemBL.UsersService;
import web.service.stock_presentation.IndustryService;
import web.service.stock_presentation.SingleInfoService;
import web.vo.before.StockGradeVO;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yqq on 2016.5.26.
 */
@Controller

public class IndustryController {

    @Resource
    private IndustryService industryService;
    @Resource
    private SingleInfoService singleInfoService;
    @Resource
    private UsersService usersService;

    @RequestMapping("/industry.do")
    public String showIndustry(HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid!=null){
            UserPo userPo = usersService.getUser(userid);
            model.addAttribute("userInfo", JSON.toJSON(userPo));
        }

        ArrayList<Industry> industries = industryService.getIndustryAnalysis();
        ArrayList<ArrayList<StockGradeVO>> stocks = new ArrayList<>();
        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        for(Industry temp:industries){
            stocks.add(temp.getStockGradeVOs());
        }

        model.addAttribute("industryStocks", JSON.toJSON(stocks));
        model.addAttribute("stockList", JSON.toJSON(stockList));
        model.addAttribute("industries",industries);
        return "industry";
    }

    @RequestMapping("industry_desktop.do")
    public @ResponseBody Map<String, Object>
    getDesktopIndustryData(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        ArrayList<Industry> industries = industryService.getIndustryAnalysis();
        ArrayList<ArrayList<StockGradeVO>> stocks = new ArrayList<>();
        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        for(Industry temp: industries){
            stocks.add(temp.getStockGradeVOs());
        }

        map.put("success", true);
        map.put("industryStocks", JSON.toJSON(stocks));
        map.put("stockList", JSON.toJSON(stockList));
        map.put("industries",industries);

        return map;
    }
}
