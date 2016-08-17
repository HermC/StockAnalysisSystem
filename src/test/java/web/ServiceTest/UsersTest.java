package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.stock_presentation.StockDataMapper;
import web.pojo.before.TabTablesData;
import web.pojo.enumPo.LoginState;
import web.service.UserSystemBL.UsersService;
import web.service.stock_presentation.TabTableInstructionService;
import web.vo.before.TabTableInsVO;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/8/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class UsersTest {
    @Resource
    private UsersService usersService;

    @Test
    public void test(){
        LoginState loginState = usersService.login("1","huangyong");
        System.out.println(loginState);
        }
    }

