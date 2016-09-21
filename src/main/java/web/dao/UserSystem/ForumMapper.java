package web.dao.UserSystem;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import web.pojo.after.ReplyPo;
import web.pojo.after.TopicPo;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/9/11.
 */

@Repository
public interface ForumMapper {

    //1
    public void addtopic(String userid, String title, String content,String strategyid,int reply_count ,int click_count,String release_date);

    public String getIdByInfo(@Param("uid")String userid, @Param("title") String title, @Param("content") String content, @Param("strategyid") String strategyid);

    //2
    public void replytopic(String userid, String topicid, String content ,String release_date);

    //3
    public void replyreply(String userid, String topicid,String replyid, String content,String release_date);

    //4
    public ArrayList<TopicPo> getAllTopic();

    public void updatereplycount(@Param("tid") String tid);

    public void updateclickcount(@Param("tid")String tid);

    //5
    public TopicPo getTopic(String tid);
    //
    public ArrayList<ReplyPo> getTopicReply(String tid);

    //获得被回复人的信息
    public String  getReplyReply(String oid);

    //7
    public  ArrayList<TopicPo> getSearch(String title);

}
