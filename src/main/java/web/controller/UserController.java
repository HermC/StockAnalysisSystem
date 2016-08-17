package web.controller;

/**
 * Created by yqq on 2016.5.2.
 */
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import web.Tools.ImageCut;
import web.pojo.before.User;
import web.service.UserService;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Controller
public class UserController {

    @RequestMapping(value = "user.do")
    public String user(HttpServletRequest request, Model model) {

        return "userinfo";
    }

    @RequestMapping(value = "user/cutimg.do", method = RequestMethod.POST)
    public @ResponseBody Map<String, Object>
    cutImg(HttpServletRequest request, HttpServletResponse response) {
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
}
