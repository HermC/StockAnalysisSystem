package web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.service.UserSystemBL.UsersService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Hermit on 16/9/4.
 */
@Controller
public class AssociationController {

    @RequestMapping(value = "user/add-association.do")
    public @ResponseBody Map<String, Object>
    addAssociation(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        return map;
    }
}
