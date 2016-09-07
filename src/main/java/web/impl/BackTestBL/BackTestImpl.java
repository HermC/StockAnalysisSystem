package web.impl.BackTestBL;

import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import web.Tools.backtesting.BackTesting;
import web.Tools.strategy_module.RookieModule;
import web.dao.BackTestBL.BackTestMapper;
import web.pojo.after.BackTestResultPo;
import web.service.BackTestBL.BackTestService;

import javax.annotation.Resource;
import java.time.LocalDate;

/**
 * Created by linyufan on 16/9/7.
 */

@Service("backTestImpl")
public class BackTestImpl implements BackTestService{

    @Resource
    public BackTestMapper backTestMapper;

    @Override
    public BackTestResultPo runBackTest(String strategyid, String userid, String startdate, String enddate, String isJson) {
        if (isJson == "1"){
            String json = backTestMapper.getJson(userid, strategyid);
            RookieModule rookieModule = new RookieModule(json, null);
            String python = rookieModule.getCode();
            backTestMapper.setPython(userid,strategyid,python);
        }
        BackTesting backTesting = new BackTesting(Integer.valueOf(strategyid),Integer.valueOf(userid));
        backTesting.runBacktesting();

        String resultid = backTestMapper.getResultid(userid,strategyid);
        BackTestResultPo backTestResultPo = new BackTestResultPo(startdate,enddate, LocalDate.now().toString(),userid,strategyid,resultid);
        String listname = "result_" + resultid;
        backTestResultPo.resultdatas = backTestMapper.getResult(listname);

        return backTestResultPo;
    }
}
