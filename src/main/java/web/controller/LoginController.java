package web.controller;

import org.springframework.core.env.SystemEnvironmentPropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Created by Hermit on 16/7/20.
 */
@Controller
public class LoginController {

    @RequestMapping(value = "loginTest.do")
    public String test(HttpServletRequest request, Model model) {
        return "loginTest";
    }

    @RequestMapping(value = "login.do")
    public @ResponseBody Map<String, Object>
    login(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> map = new HashMap<>();

        System.out.println("Login");

        String id = request.getParameter("a");

        HttpSession session = request.getSession();

        String userid = (String) session.getAttribute("userid");
        if(userid==null){

            System.out.println("First login");

            session.setAttribute("userid", id);
        }else{

            System.out.println("userid: "+userid);
        }

        return null;
    }

    @RequestMapping(value = "afterlogin.do")
    public @ResponseBody Map<String, Object>
    getUser(HttpServletRequest request, HttpServletResponse response) {

        HttpSession session = request.getSession();
        Map<String, Object> map = new HashMap<>();

        if(session.getAttribute("userid")==null){
            System.out.println("First login");
        }else{
            String id = (String) session.getAttribute("userid");
            System.out.println("userid:"+id);
            map.put("userid", id);
        }

        return map;
    }
}
