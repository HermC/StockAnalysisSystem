package web.controller;

/**
 * Created by yqq on 2016.5.2.
 */
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import web.pojo.before.User;
import web.service.UserService;


@Controller
@RequestMapping("/user/*")
public class UserController {
    @Resource
    private UserService userService;

    @RequestMapping(value="showUser.do")
    public String toIndex(HttpServletRequest request,Model model){
        System.out.println("get request");
        int userId = Integer.parseInt(request.getParameter("id"));
        User user = this.userService.getUserById(userId);
        model.addAttribute("user", user);
        return "showUser";
    }
}
