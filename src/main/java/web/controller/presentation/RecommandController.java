package web.controller.presentation;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.pojo.before.SingleInfo;
import web.service.stock_presentation.GradeService;
import web.service.stock_presentation.RecommendService;
import web.service.stock_presentation.SingleInfoService;
import web.vo.before.StockGradeVO;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yqq on 2016.6.10.
 */
@Controller
public class RecommandController {

    @Resource
    GradeService gradeService;
    @Resource
    RecommendService recommendService;
    @Resource
    private SingleInfoService singleInfoService;

    @RequestMapping(value = "recommand.do")
    public String toRecommand(HttpServletRequest request,Model model){
        ArrayList<StockGradeVO> stockGradeVOs = gradeService.getGradeList();
        ArrayList<SingleInfo> stopRecommand = recommendService.getStopRecommend();
        ArrayList<SingleInfo> kdjRecommand = recommendService.getKDJRecommend();
        ArrayList<SingleInfo> rsiRecommand = recommendService.getRSIRecommend();
        ArrayList<SingleInfo> bollRecommand = recommendService.getBOLLRecommend();

        model.addAttribute("gradeList",stockGradeVOs);
        model.addAttribute("stopList",stopRecommand);
        model.addAttribute("kdjList",kdjRecommand);
        model.addAttribute("rsiList",rsiRecommand);
        model.addAttribute("bollList",bollRecommand);

        model.addAttribute("grade",stockGradeVOs.subList(0,50));
//        model.addAttribute("stop",stopRecommand.subList(0,100));
        model.addAttribute("kdj",kdjRecommand.subList(0,15));
        model.addAttribute("rsi",rsiRecommand.subList(0,15));
        model.addAttribute("boll",bollRecommand.subList(0,15));

        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        model.addAttribute("stockList", JSON.toJSON(stockList));
        return "recommand";
    }

    @RequestMapping(value = "recommand_desktop.do")
    public @ResponseBody Map<String, Object>
    getDesktopRecommandData(HttpServletRequest request, HttpServletResponse response) {
        System.out.println(request.getSession().getId());
        Map<String, Object> map = new HashMap<>();
        map.put("success", true);

        ArrayList<StockGradeVO> stockGradeVOs = gradeService.getGradeList();
        ArrayList<SingleInfo> stopRecommand = recommendService.getStopRecommend();
        ArrayList<SingleInfo> kdjRecommand = recommendService.getKDJRecommend();
        ArrayList<SingleInfo> rsiRecommand = recommendService.getRSIRecommend();
        ArrayList<SingleInfo> bollRecommand = recommendService.getBOLLRecommend();

        map.put("gradeList",stockGradeVOs);
        map.put("stopList",stopRecommand);
        map.put("kdjList",kdjRecommand);
        map.put("rsiList",rsiRecommand);
        map.put("bollList",bollRecommand);

        map.put("grade",stockGradeVOs.subList(0,50));
//        model.addAttribute("stop",stopRecommand.subList(0,100));
        map.put("kdj",kdjRecommand.subList(0,15));
        map.put("rsi",rsiRecommand.subList(0,15));
        map.put("boll",bollRecommand.subList(0,15));

        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        map.put("stockList", JSON.toJSON(stockList));

        return map;
    }

    @RequestMapping(value = "recommandall.do")
    public String toRecommandAll(HttpServletRequest request,Model model){

        ArrayList<SingleInfo> kdjRecommand = recommendService.getKDJRecommend();
        ArrayList<SingleInfo> rsiRecommand = recommendService.getRSIRecommend();
        ArrayList<SingleInfo> bollRecommand = recommendService.getBOLLRecommend();

        model.addAttribute("kdj",kdjRecommand);
        model.addAttribute("rsi",rsiRecommand);
        model.addAttribute("boll",bollRecommand);

        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        model.addAttribute("stockList", JSON.toJSON(stockList));
        return "recommandall";
    }

    @RequestMapping(value = "recommandall_desktop.do")
    public @ResponseBody Map<String, Object>
    getDesktopRecommanallData(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();
        map.put("success", true);

        ArrayList<SingleInfo> kdjRecommand = recommendService.getKDJRecommend();
        ArrayList<SingleInfo> rsiRecommand = recommendService.getRSIRecommend();
        ArrayList<SingleInfo> bollRecommand = recommendService.getBOLLRecommend();

        map.put("kdj",kdjRecommand);
        map.put("rsi",rsiRecommand);
        map.put("boll",bollRecommand);

        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        map.put("stockList", JSON.toJSON(stockList));

        return map;
    }
}
