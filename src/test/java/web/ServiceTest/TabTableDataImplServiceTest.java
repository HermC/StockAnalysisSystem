package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.before.TabTablesData;
import web.service.stock_presentation.TabTableDataService;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/3.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class TabTableDataImplServiceTest {

    @Resource
    private TabTableDataService tabTableDataService;

    @Test
    public void testTabTable(){
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(15);
        ArrayList<TabTablesData> tabTablesDatas = tabTableDataService.getTablesInfo("sh600000",start,end);
        for(TabTablesData tabTablesData:tabTablesDatas){
            System.out.println(JSON.toJSON(tabTablesData));
        }
    }
}
