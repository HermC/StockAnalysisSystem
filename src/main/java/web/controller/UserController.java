package web.controller;

/**
 * Created by yqq on 2016.5.2.
 */
import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;
import org.apache.commons.collections.iterators.ObjectArrayIterator;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.fileupload.FileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import web.Tools.ImageCut;
import web.pojo.after.SocialgroupPo;
import web.pojo.after.UserPo;
import web.pojo.before.SingleInfo;
import web.pojo.before.User;
import web.pojo.enumPo.LoginState;
import web.pojo.enumPo.UpdateState;
import web.service.UserService;
import web.service.UserSystemBL.SocialGroupService;
import web.service.UserSystemBL.UsersService;
import web.service.stock_presentation.SingleInfoService;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


@Controller
public class UserController {

    @Resource
    private UsersService usersService;
    @Resource
    private SocialGroupService socialGroupService;
    @Resource
    private SingleInfoService singleInfoService;

    @RequestMapping(value = "user.do")
    public String user(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        userid = "2";

        if(userid==null){
            return "welcome";
        }

        UserPo userPo = usersService.getUser(userid);
        ArrayList<UserPo> userPos = usersService.getAllUser();
        ArrayList<SocialgroupPo> socialgroupPos = socialGroupService.getAllsocialgroup();
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("userList", JSON.toJSON(userPos));
        model.addAttribute("associationList", JSON.toJSON(socialgroupPos));
        model.addAttribute("stockList", JSON.toJSON(singleInfos));
//        System.out.println(JSON.toJSON(userPos));

        return "userinfo";
    }

    @RequestMapping(value = "user/changepassword.do", method = RequestMethod.POST)
    public @ResponseBody Map<String, Object>
    changePassword(@RequestParam(value = "old_password") String old_password,
                   @RequestParam(value = "new_password") String new_password,
                   HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        LoginState state = usersService.login(userid, old_password);

        if(state==LoginState.用户名或密码错误){
            map.put("success", false);
            map.put("state", "密码错误");
        }else if(state==LoginState.登陆成功){
            UpdateState updateState = usersService.updateUserPassword(userid, new_password);
            if(updateState==UpdateState.修改成功){
                map.put("success", true);
                map.put("state", "修改成功");
            }else{
                map.put("success", false);
                map.put("state", "修改失败,请稍后再试");
            }
        }

        return map;
    }

    @RequestMapping(value = "user/cutimg.do", method = RequestMethod.POST)
    public @ResponseBody Map<String, Object>
    cutImg(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        response.addHeader("Access-Control-Allow-Origin", "*");

        int x = Integer.parseInt(request.getParameter("x"));
        int y = Integer.parseInt(request.getParameter("y"));
        int w = Integer.parseInt(request.getParameter("w"));
        int h = Integer.parseInt(request.getParameter("h"));
        int realW = Integer.parseInt(request.getParameter("realW"));
        int realH = Integer.parseInt(request.getParameter("realH"));

        String fileName = "default.jpg";

        try {

            MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
            CommonsMultipartFile commonsMultipartFile = (CommonsMultipartFile) multipartHttpServletRequest.getFile("img_file");
            String realFileName = commonsMultipartFile.getOriginalFilename();

            System.out.println(realFileName);

            String basePath = request.getSession().getServletContext().getRealPath("/resources/img/user/");

            File dirPath = new File(basePath);
            if(!dirPath.exists()) {
                dirPath.mkdir();
            }

//            System.out.println(dirPath.getCanonicalPath());
            realFileName = userid+".jpg";
            File uploadFile = new File(dirPath, realFileName);
            System.out.println(uploadFile.getCanonicalPath());
            if(!uploadFile.exists()){
                uploadFile.createNewFile();
            }
            FileCopyUtils.copy(commonsMultipartFile.getBytes(), uploadFile);

            new ImageCut().cutImage(uploadFile.getCanonicalPath(), x, y, w, h, realW, realH);

            fileName = realFileName;
        } catch (IOException e) {
//            e.printStackTrace();
            fileName = "default.jpg";
        }

        String url = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
                + request.getContextPath() + "/resources/img/user/" + fileName;

        Map<String, Object> map = new HashMap<>();

        map.put("url", url);

        return map;
    }

    @RequestMapping(value = "user/changeimg.do")
    public @ResponseBody Map<String, Object>
    changeImg(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String url = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
                + request.getContextPath() + "/resources/img/user/" + userid + ".jpg";

        UpdateState state = usersService.updateUserHead(userid, url);

        if(state==UpdateState.修改失败){
            map.put("success", false);
        }else{
            map.put("success", true);
            map.put("url", url);
        }

        return map;
    }

    @RequestMapping(value = "user/nav.do")
    public @ResponseBody Map<String, Object>
    getAllStocks(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();

        map.put("stockList", JSON.toJSON(singleInfos));

        return map;
    }

    @RequestMapping(value = "user_desktop.do")
    public @ResponseBody Map<String, Object>
    getDesktopUser(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

//        Cookie[] cookies = request.getCookies();
//        if(cookies==null){
//            map.put("success", false);
//            return map;
//        }
//
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        userid = "2";
//        for(int i=0;i<cookies.length;i++){
//            if(cookies[i].getName().equals("userid")){
//                userid = cookies[i].getValue();
//                break;
//            }
//        }
//
//        if(userid==null){
//            map.put("success", false);
//            return map;
//        }

        UserPo userPo = usersService.getUser(userid);

        map.put("success", true);
        map.put("userInfo", JSON.toJSON(userPo));

        return map;
    }
}
