package web.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.core.env.SystemEnvironmentPropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import web.Tools.Realtime;
import web.Tools.TotalNews;
import web.pojo.after.UserPo;
import web.pojo.before.Hotspot;
import web.pojo.before.News;
import web.pojo.before.SingleInfo;
import web.pojo.enumPo.LoginState;
import web.service.UserSystemBL.UsersService;
import web.service.stock_presentation.RecommendService;
import web.service.stock_presentation.SingleInfoService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * Created by Hermit on 16/7/20.
 */
@Controller
public class LoginController {

    @Resource
    private UsersService usersService;

    @Resource
    private SingleInfoService singleInfoService;
    @Resource
    private RecommendService recommendService;

    @RequestMapping(value = "login.do", method = RequestMethod.POST)
    public @ResponseBody Map<String, Object>
    login(@RequestParam(value="username") String username, @RequestParam(value="password") String password,
          HttpServletRequest request, HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin", "*");

        LoginState state = usersService.login(username, password);

        Map<String, Object> map = new HashMap<>();

        if(state==LoginState.登陆成功){
            HttpSession session = request.getSession();
            session.setAttribute("userid", username);
            map.put("success", true);
        }else{
            map.put("success", false);
        }
        map.put("state", state);

        System.out.println(username+"  "+password);

        return map;
    }

    @RequestMapping(value = "register.do", method = RequestMethod.POST)
    public @ResponseBody Map<String, Object>
    register(@RequestParam(value="nickname") String nickname, @RequestParam(value="password") String password,
             HttpServletRequest request, HttpServletResponse response) {

        UserPo userPo = new UserPo(nickname, password);

        String userid = usersService.newUser(userPo);

        Map<String, Object> map = new HashMap<>();
        map.put("success", true);
        map.put("userid", userid);

        return map;
    }


    @RequestMapping(value = "logout.do")
    public String logout(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("userid", null);

        ArrayList<SingleInfo> stockList = singleInfoService.getSingleInfo();
        model.addAttribute("stockList", JSON.toJSON(stockList));
        model.addAttribute("intraday", Realtime.getRealTicks("sh000001"));

        List<News> stockNews = TotalNews.getStockNews();
        List<News> financeNews = TotalNews.getFinanceNews();
        List<News> companyNews = TotalNews.getCompanyNews();

        List<Hotspot> hotspots = TotalNews.getHotspot();
        ArrayList<SingleInfo> stop = recommendService.getStopRecommend();

        model.addAttribute("stockNews", JSON.toJSON(stockNews));
        model.addAttribute("financeNews", JSON.toJSON(financeNews));
        model.addAttribute("companyNews", JSON.toJSON(companyNews));
        model.addAttribute("hotspots", JSON.toJSON(hotspots));
        model.addAttribute("stopRecommend", JSON.toJSON(stop));
        model.addAttribute("industryRank", JSON.toJSON(TotalNews.getIndustryUp()));
        model.addAttribute("stockRank", JSON.toJSON(TotalNews.getStockUp()));

        return "index";
    }
}
