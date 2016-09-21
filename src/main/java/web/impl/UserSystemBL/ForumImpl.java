package web.impl.UserSystemBL;

import org.springframework.stereotype.Service;
import web.dao.UserSystem.ForumMapper;
import web.dao.UserSystem.UsersMapper;
import web.pojo.after.ReplyPo;
import web.pojo.after.TopicPo;
import web.pojo.after.UserPo;
import web.pojo.enumPo.AddState;
import web.service.UserSystemBL.ForumService;

import javax.annotation.Resource;
import javax.persistence.SecondaryTable;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/9/11.
 */
@Service("forumService")
public class ForumImpl implements ForumService {

    @Resource
    public ForumMapper forumMapper;

    @Resource
    public UsersMapper usersMapper;


    @Override
    public String addtopic(String userid, String title, String content,String strategyid) {
        forumMapper.addtopic(userid,title,content,strategyid,0,0, LocalDate.now().toString());
        String tid = forumMapper.getIdByInfo(userid,title,content,strategyid);
        return tid;
    }

    @Override
    public AddState replytopic(String userid, String topicid, String content) {
        forumMapper.replytopic(userid,topicid,content, LocalDate.now().toString());
        return AddState.添加成功;
    }

    @Override
    public AddState replyreply(String userid, String topicid,String replyid, String content) {
        forumMapper.replyreply(userid,topicid,replyid,content, LocalDate.now().toString());
        return AddState.添加成功;
    }

    @Override
    public ArrayList<TopicPo> getAllTopic() {
        ArrayList<TopicPo> topicPos = forumMapper.getAllTopic();
        return topicPos ;
    }

    @Override
    public TopicPo getTopic(String tid) {

        TopicPo topicPo = forumMapper.getTopic(tid);
        ArrayList<ReplyPo> replyPos = forumMapper.getTopicReply(tid);
        for (int i=0;i<replyPos.size();i++){
            if(replyPos.get(i).getOrderid()!=null){
                String tempid = forumMapper.getReplyReply(replyPos.get(i).getOrderid());
                UserPo temp = usersMapper.getUserByID(tempid);
                replyPos.get(i).setResponsed_userid(temp.getUserId());
                replyPos.get(i).setResponsed_username(temp.getUserName());
                replyPos.get(i).setResponsed_userportriat(temp.getHead());
            }else {
                replyPos.get(i).setResponsed_userid(topicPo.userid);
                replyPos.get(i).setResponsed_username(topicPo.username);
                replyPos.get(i).setResponsed_userportriat(topicPo.userportriat);
            }
        }
        topicPo.setReplyPos(replyPos);
        return topicPo;
    }

//    public ArrayList<ReplyPo> getReplyReply(String oid){
//        ArrayList<ReplyPo>  replyPos = forumMapper.getReplyReply(oid);
//        for(int i=0;i<replyPos.size();i++){
//            replyPos.get(i).setReplyPos(this.getReplyReply(replyPos.get(i).replyid));
//        }
//        return replyPos;
//    }

    @Override
    public void updatereplycount(String tid) {
        forumMapper.updatereplycount(tid);

    }

    @Override
    public void updateclickcount(String tid) {

        forumMapper.updateclickcount(tid);
    }

    @Override
    public ArrayList<TopicPo> getSearch(String title) {
        String stitle = "%" + title +"%";
        ArrayList<TopicPo> topicPos = forumMapper.getSearch(stitle);
        return topicPos ;
    }
}
