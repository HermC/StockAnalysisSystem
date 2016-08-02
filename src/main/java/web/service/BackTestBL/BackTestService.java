package web.service.BackTestBL;

import web.pojo.after.BackTestResultPo;
import web.pojo.enumPo.AddState;

/**
 * Created by linyufan on 16/7/23.
 */
public interface BackTestService {

    public BackTestResultPo getBackTestResult(String resultid);

    public AddState addBackTestResult(BackTestResultPo backTestResultPo);

    public BackTestResultPo runBackTest(String strategyid,String stockPoolid,String startdate,String enddate);

    public BackTestResultPo runSimulation(String strategyid,String stockPoolid,String startdate);
}
