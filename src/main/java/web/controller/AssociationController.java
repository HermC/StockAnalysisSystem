package web.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.pojo.after.SocialgroupPo;
import web.pojo.after.UserPo;
import web.pojo.before.SingleInfo;
import web.pojo.enumPo.AddState;
import web.service.UserSystemBL.SocialGroupService;
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
 * Created by Hermit on 16/9/4.
 */
@Controller
public class AssociationController {

    @Resource
    private SocialGroupService socialGroupService;
    @Resource
    private SingleInfoService singleInfoService;
    @Resource
    private UsersService usersService;

    @RequestMapping(value = "user/association.do")
    public String toAssociation(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");


        if(userid==null){
            userid = "2";
//            return "welcome";
        }

        UserPo userPo = usersService.getUser(userid);
        ArrayList<SocialgroupPo> socialgroupPos = socialGroupService.getAllsocialgroup();
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();
        ArrayList<UserPo> userPos = usersService.getAllUser();

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("associationList", JSON.toJSON(socialgroupPos));
        model.addAttribute("stockList", JSON.toJSON(singleInfos));
        model.addAttribute("userList", JSON.toJSON(userPos));

        return "association-list";
    }

    @RequestMapping(value = "user/association_desktop.do")
    public @ResponseBody Map<String, Object>
    toAssociationDesktop(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        ArrayList<SocialgroupPo> socialgroupPos = socialGroupService.getAllsocialgroup();
        ArrayList<UserPo> userPos = usersService.getAllUser();

        map.put("associationList", JSON.toJSON(socialgroupPos));
        map.put("userList", JSON.toJSON(userPos));

        return map;
    }

    @RequestMapping(value = "user/add-association.do")
    public @ResponseBody Map<String, Object>
    addAssociation(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        userid = "2";

        String name = request.getParameter("name");
        String users = request.getParameter("members");

        ArrayList<String> usersList = new ArrayList<>();

        if(users==null){
            usersList.add(userid);

        }else{
            usersList.add(userid);

            String[] splits = users.split(",");
            for(int i=0;i<splits.length;i++){
                if(!splits[i].equals(userid)){
                    usersList.add(splits[i]);
                }
            }
        }

        String associationid = socialGroupService.createsocialgroup(name, usersList);

        if(associationid!=null){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }
}
