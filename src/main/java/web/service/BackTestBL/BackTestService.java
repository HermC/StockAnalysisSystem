package web.service.BackTestBL;

import web.pojo.after.BackTestResultPo;
import web.pojo.enumPo.AddState;

/**
 * Created by linyufan on 16/7/23.
 */
public interface BackTestService {


//    /**
//     * 获得回测结果
//     * @param resultid
//     * @return
//     */
//    public BackTestResultPo getBackTestResult(String resultid);

//    public AddState addBackTestResult(BackTestResultPo backTestResultPo);
//

    /**
     * 开始回测并返回结果
     * @param strategyid
     * @param userid
     * @param startdate
     * @param enddate
     * @param isJson
     * @return
     */
    public BackTestResultPo runBackTest(String strategyid,String userid,String startdate,String enddate,String isJson);

//    /**
//     * 编译
//     * @param strategyid
//     * @param stockPoolid
//     * @param startdate
//     * @return
//     */
//    public BackTestResultPo runSimulation(String strategyid,String stockPoolid,String startdate);
}
