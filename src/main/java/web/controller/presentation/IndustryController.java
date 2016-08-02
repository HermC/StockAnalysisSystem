package web.controller.presentation;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import web.pojo.before.Industry;
import web.pojo.before.SingleInfo;
import web.service.stock_presentation.IndustryService;
import web.service.stock_presentation.SingleInfoService;
import web.vo.before.StockGradeVO;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

/**
 * Created by yqq on 2016.5.26.
 */
@Controller

public class IndustryController {

    @Resource
    private IndustryService industryService;
    @Resource
    private SingleInfoService singleInfoService;

    @RequestMapping("/industry.do")
    public String showIndustry(HttpServletRequest request, Model model){
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
}
