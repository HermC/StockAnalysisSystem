package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.UserSystem.SocialGroupMapper;
import web.pojo.after.SocialgroupPo;
import web.pojo.after.UserPo;
import web.service.UserSystemBL.SocialGroupService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/9/7.
 */

@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class SocialGroupTest {
    @Resource
    SocialGroupService socialGroupService;
    @Resource
    SocialGroupMapper socialGroupMapper;

    @Test
    public void test1(){
        ArrayList<String> userids = new ArrayList<>();
        userids.add("2");
        userids.add("3");

        System.out.println(socialGroupService.createsocialgroup("zhangsidong",userids));

    }

    @Test
    public void test2(){
        ArrayList<SocialgroupPo> socialgroupPos = socialGroupService.getAllsocialgroup();
        for (SocialgroupPo socialgroupPo:socialgroupPos){
            System.out.println(JSON.toJSON(socialgroupPo));
        }

//        ArrayList<UserPo> userPos = socialGroupMapper.getAllUserInGroup("1");
//        for (UserPo userPo:userPos){
//            System.out.println(JSON.toJSON(userPo));
//        }
    }
}
