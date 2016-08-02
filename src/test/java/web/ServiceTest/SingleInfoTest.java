package web.ServiceTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.SingleInfoMapper;
import web.service.stock_presentation.SingleInfoService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/27.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class SingleInfoTest {

    @Resource
    private SingleInfoService singleInfoService;

    @Resource
    private SingleInfoMapper singleInfoMapper;

    @Test
    public void test(){
//        ArrayList<SingleInfo> singleInfoArrayList =  singleInfoService.getSingleInfo();
//        for(SingleInfo singleInfo :singleInfoArrayList){
//            System.out.print(singleInfo.id);
//            System.out.println(singleInfo.name);
//        }

        ArrayList<String> strings = singleInfoMapper.getList();
        for (int i = 0;i<strings.size();i++)
        System.out.println(strings.get(i));
    }
}
