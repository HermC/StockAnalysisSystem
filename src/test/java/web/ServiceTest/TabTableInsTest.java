package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.stock_presentation.StockDataMapper;
import web.pojo.before.TabTablesData;
import web.service.stock_presentation.TabTableInstructionService;
import web.vo.before.TabTableInsVO;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/3.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class TabTableInsTest {

    @Resource
    private TabTableInstructionService tabTableInstructionService;

    @Resource
    private StockDataMapper stockDataMapper;

    @Test
    public void test(){
        LocalDate end = LocalDate.now();

        LocalDate start = end.minusDays(30);
        ArrayList<TabTablesData> tabTablesDatas = stockDataMapper.getTabTablesData("sh600000",start.toString(),end.toString());
        ArrayList<TabTableInsVO> tabTableInsVOArrayList = tabTableInstructionService.getTablesInfo(tabTablesDatas);
        for(TabTableInsVO tabTableInsVO:tabTableInsVOArrayList){
            System.out.println(JSON.toJSON(tabTableInsVO));
        }
    }
}
