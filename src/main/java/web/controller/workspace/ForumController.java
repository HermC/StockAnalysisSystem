package web.controller.workspace;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.pojo.after.TopicPo;
import web.pojo.after.UserPo;
import web.pojo.before.SingleInfo;
import web.pojo.enumPo.AddState;
import web.pojo.enumPo.UpdateState;
import web.service.UserSystemBL.ForumService;
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
 * Created by Hermit on 16/9/11.
 */
@Controller
public class ForumController {

    @Resource
    private UsersService usersService;
    @Resource
    private SingleInfoService singleInfoService;
    @Resource
    private ForumService forumService;

    @RequestMapping(value = "user/forum-list.do")
    public String toForumList(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");


        if(userid==null){
            userid = "2";
//            return "welcome";
        }

        UserPo userPo = usersService.getUser(userid);
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("stockList", JSON.toJSON(singleInfos));

        return "forum";
    }

    @RequestMapping(value = "user/forum-editor.do")
    public String toForumEditor(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");


        if(userid==null){
            userid = "2";
//            return "welcome";
        }

        UserPo userPo = usersService.getUser(userid);
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("stockList", JSON.toJSON(singleInfos));

        return "forum-editor";
    }

    @RequestMapping(value = "user/forum-card.do")
    public String toForumCard(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");


        if(userid==null){
            userid = "2";
//            return "welcome";
        }

        UserPo userPo = usersService.getUser(userid);
        ArrayList<SingleInfo> singleInfos = singleInfoService.getSingleInfo();

        String topic_id = request.getParameter("topic_id");
        System.out.println(topic_id);
        TopicPo topicPo = forumService.getTopic(topic_id);

        model.addAttribute("userInfo", JSON.toJSON(userPo));
        model.addAttribute("stockList", JSON.toJSON(singleInfos));
        model.addAttribute("topicInfo", JSON.toJSON(topicPo));

        return "forum-card";
    }

    @RequestMapping(value = "user/forum/search.do")
    public String search(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");


        if(userid==null){
            userid = "2";
//            return "welcome";
        }

        String keyword = request.getParameter("keyword");

        ArrayList<TopicPo> topicPos = null;
        if(keyword==null){
            topicPos = forumService.getAllTopic();
        }else{
            topicPos = forumService.getSearch(keyword);
        }

        System.out.println(JSON.toJSON(topicPos));
        model.addAttribute("topicList", JSON.toJSON(topicPos));

        return "forum-list";
    }

    @RequestMapping(value = "user/forum/update-click.do")
    public @ResponseBody Map<String, Object>
    updateClick(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        String topic_id = request.getParameter("topic_id");

        forumService.updateclickcount(topic_id);

        return map;
    }

    @RequestMapping(value = "user/forum/update-card.do")
    public @ResponseBody Map<String, Object>
    updateCard(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String title = request.getParameter("title");
        String card_content = request.getParameter("content");

        String id = forumService.addtopic(userid, title, card_content, null);

        if(id==null){
            map.put("success", false);
        }else{
            map.put("success", true);
            map.put("topicid", id);
        }

        return map;
    }

    @RequestMapping(value = "user/forum/update-reply.do")
    public @ResponseBody Map<String, Object>
    updateReply(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        String userid = (String) session.getAttribute("userid");

        if(userid==null){
            userid = "2";
        }

        String isTopic = request.getParameter("isTopic");
        String reply_content = request.getParameter("content");

        AddState addState;
        if(isTopic.equals("true")){
            String topic_id = request.getParameter("topic_id");
            addState = forumService.replytopic(userid, topic_id, reply_content);
            if(addState==AddState.添加成功){
                forumService.updatereplycount(topic_id);
            }
        }else{
            String topic_id = request.getParameter("topic_id");
            String reply_id = request.getParameter("reply_id");
            addState = forumService.replyreply(userid, topic_id, reply_id, reply_content);
        }

        if(addState==AddState.添加成功){
            map.put("success", true);
        }else{
            map.put("success", false);
        }

        return map;
    }

}
