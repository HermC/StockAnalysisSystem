package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.stock_presentation.StockDataMapper;
import web.pojo.after.UserPo;
import web.pojo.before.TabTablesData;
import web.pojo.enumPo.LoginState;
import web.service.UserSystemBL.UsersService;
import web.service.stock_presentation.TabTableInstructionService;
import web.vo.before.TabTableInsVO;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by linyufan on 16/8/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class UsersTest {
    @Resource
    private UsersService usersService;

    @Test
    public void test1(){
        LoginState loginState = usersService.login("1","huangyong");
        System.out.println(loginState);

        }
    @Test
    public void test2(){
        UserPo userPo = new UserPo();
//        userPo.setUserId("2");
//        userPo.setUserName("zcj");
//        userPo.setPassword("zcj");
//        userPo.setSummary("zcj");
////        LoginState loginState = usersService.login("1","huangyong");
//        System.out.println(usersService.newUser(userPo));
    }
    @Test
    public void test3(){
        usersService.updateUserName("2","yzy");
        usersService.updateUserSummary("2","i'm yzy");
        usersService.updateUserPassword("2","zyz");

    }

    @Test
    public void test4(){
//        UserPo userPo = usersService.getUser("1");
//
//        System.out.println(JSON.toJSON(userPo));

        String date = "2016-11-20 12:54:13";
        System.out.println(LocalDate.parse(date));

    }


    @Test
    public void  test5(){
        ArrayList<UserPo> userPos = usersService.getAllUser();
        for(UserPo userPo:userPos){
            System.out.println(JSON.toJSON(userPo));
        }
    }

    @Test
    public void test6(){
//        System.out.println("===========os.name:"+System.getProperties().getProperty("os.name"));
        System.out.println(LocalDate.now());
    }
}




