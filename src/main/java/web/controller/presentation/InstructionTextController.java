package web.controller.presentation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.service.stock_presentation.InstructionTextService;
import web.vo.before.StockInsTextVO;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by linyufan on 16/5/14.
 */
@Controller
@RequestMapping("/instruction/*")
public class InstructionTextController {

    @Resource
    private InstructionTextService instructionTextService;

    @RequestMapping(value = "text.do")
    public @ResponseBody Map<String,Object>
    getData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String,Object> map = new HashMap<>();
        StockInsTextVO stockInsTextVO = instructionTextService.getStockAnalysis(request.getParameter("id"));
        map.put("success","ture");
        map.put("insstructionText",stockInsTextVO);

        return map;
    }
}
